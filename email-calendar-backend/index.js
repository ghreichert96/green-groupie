const corealg = require('./scheduling-engine/core-algorithm');

const express = require('express');  // call express
const sgMail = require('@sendgrid/mail');
const app = express(); // create a server
const cors = require('cors')
const bodyParser = require('body-parser');
const {google} = require('googleapis');
const firebaseAdmin = require('firebase-admin');
const request = require('request-promise-native');

sgMail.setApiKey(process.env.SG_API_KEY);

const port = process.env.PORT || 8000;  // set our port

const G_CLIENT_ID = process.env.G_CLIENT_ID;
const G_CLIENT_SECRET = process.env.G_CLIENT_SECRET;
const REDIR_HOSTNAME = process.env.REDIR_HOSTNAME;
const APP_HOSTNAME = process.env.APP_HOSTNAME


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors())

app.get('/', (req, res) => {
  res.send('index');
});


app.post('/email', function (req, res) {
  console.log('lolol ', req.body)
  const msg = {
  to: req.body.emails,
  from: req.body.hostemail,
  subject: req.body.subject,
  text: "You're invited to share your meeting times with Groupie!!",
  html: req.body.message + '<a href="https://green-groupie.firebaseapp.com/profile/">'+
        ' Click Here </a>'+ ' to begin importing your calendar',
};

  sgMail.send(msg).then(res => console.log('succccc',res)).catch(err => console.log('errrrrr',err))
  res.send('test')
});


app.post('/find-common-slots', (req, res)=>{
    const userDefs = {
      daily_str : req.body.startTime,
      daily_end : req.body.endTime,
      str: req.body.startDate + "T" + req.body.startTime + "-" + "05:00",
      end: req.body.endDate + "T" + req.body.endTime + "-" + "05:00",
      duration: req.body.length 
    }


    const result = corealg.divideChunks(userDefs)
    res.send(result)
    
});

app.post('/match-meeting-time', async (req,res)=>{
  //const meetingID = req

  const db = firebaseAdmin.firestore();

  const meetingID = '0xy1EdTXYZJR2mrCr0vt'
  
  let meeting = await db.collection('meeting-proposals').doc(meetingID).get();
  let emails = meeting.get('participants')

  console.log(emails);

  let uids = {};
  for (let email of emails) {
    const user = await firebaseAdmin.auth().getUserByEmail(email);
    uids[email] = user.uid;
  }
  console.log(uids);

  let tokens = {};
  let all_events = [];
  for (const uid of Object.values(uids)) {
    const snap = await db.collection('profile-data').doc(uid).collection('integrations').get();
    snap.forEach(integration => {
      tokens[uid] = integration.get('token');
    });
  }

  const oauth2Client = new google.auth.OAuth2(
    G_CLIENT_ID,
    G_CLIENT_SECRET,
    'http://' + REDIR_HOSTNAME + '/oauthcallback'
  );

  for (const token of Object.values(tokens)){
    oauth2Client.setCredentials(token);
    console.log('token is', token)
    const calendar = google.calendar({version: 'v3', oauth2Client});
    calendar.events.list({
      calendarId: 'primary',
      singleEvents:true,
    },(err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const events = res.data.items;
      if (events.length) {
        console.log('events:');
        all_events.push(events)
        events.map((event, i) => {
          const start = event.start.dateTime || event.start.date;
          console.log(`${start} - ${event.summary}`);
        });
      } else {
        console.log('No upcoming events found.');
      }
    }
    )
  }
  
 
  
  console.log(tokens);
  res.end();
});

app.get('/add', (req, res) => {
  const {uid} = req.query;
  const oauth2Client = new google.auth.OAuth2(
    G_CLIENT_ID,
    G_CLIENT_SECRET,
    'http://' + REDIR_HOSTNAME + '/oauthcallback'
  );

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar.readonly', 'openid', 'profile', 'email'],
    state: uid
  });

  res.send(url);
});

app.get('/oauthcallback', async (req, res) => {
  const db = firebaseAdmin.firestore();

  const {code, state} = req.query;

  const oauth2Client = new google.auth.OAuth2(
    G_CLIENT_ID,
    G_CLIENT_SECRET,
    'http://' + REDIR_HOSTNAME + '/oauthcallback'
  );

  let tokens;
  try {
    tokens = (await oauth2Client.getToken(code)).tokens;
  } catch (e) {
    console.log(e);
  }

  const oauth_info = await request("https://www.googleapis.com/oauth2/v1/userinfo?fields=email&oauth_token=" + tokens.access_token);
  const {email: userEmail} = JSON.parse(oauth_info);

  db.collection("integrations").add({
    type: "Google",
    display: userEmail,
    uid: state
  });

  res.writeHead(302, {
    "Location": "http://" + APP_HOSTNAME + "/profile/"
  });
  res.end();
});

app.listen(port, async function () {
  console.log(`Example app listening on port ${port}!`);
  console.log(`G_CLIENT_ID: ${G_CLIENT_ID}`);
  console.log(`G_CLIENT_SECRET: ${G_CLIENT_SECRET}`);

  await firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(JSON.parse(process.env.G_SV_ACCT))
  });
});
