const corealg = require('./scheduling-engine/core-algorithm');

const express = require('express');  // call express
const sgMail = require('@sendgrid/mail');
const app = express(); // create a server
const cors = require('cors')
const bodyParser = require('body-parser');


sgMail.setApiKey('');

const port = process.env.PORT || 8000;  // set our port

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
  from: 'jnguyen@u.northwestern.edu',
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

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});