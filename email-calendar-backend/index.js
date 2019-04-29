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

app.post('/match-meeting-time', (req,res)=>{
  //const meetingID = req

  const db = firebaseAdmin.firestore();
  // let meetingProp = db.collection('meeting-proposals')
  // let meetings = meetingProp.where('scheduled_meeting_id', '==', req)
  // let emails
  // for (let i=0; i < meetings.length; i++){
  //   for (let j = 0; j< meetings[i]('participants').length; j++){
  //     emails.push(meetings('participants')[j])
  //   }
  // }

  const meetingID = 'B5LfjOglWh3JxFA75vh9'
  
  let meeting = db.collection('meeting-proposals').doc(meetingID)
  let data
  let emails
  meeting.get().then(function(doc){

      if (doc.exists){
        data = doc.data()
        return data['participants']
      }
      else{
        console.log('no document')
      }
    })
    .then((email_list) => {
      emails=email_list
      let uids = []
      emails.map(async email=>{
                    await db.collection('integrations').where('display', '==', email).get()
                      .then(snapshot => {
                        snapshot.forEach(doc => {
                          console.log('doc', doc['_fieldsProto'].uid.stringValue)
                          uids.push(doc['_fieldsProto'].uid.stringValue)
                        })
                      }) 
                })
      console.log('uids', uids)
      res.send(uids)
    })
    .catch((error) => {
      console.log('error is', error)
    })



  //console.log(emails)
  

  
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
