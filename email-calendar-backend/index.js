const express = require('express');  // call express
const sgMail = require('@sendgrid/mail'); 
const app = express(); // create a server
 
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
 
const port = process.env.PORT || 8000;  // set our port
 
 
app.get('/', (req, res) => {
  res.send('index');
});

 
app.get('/email', function (req, res) {
  const msg = {
  to: ['johntnguyen9@gmail.com', 'johnnguyen2021@u.northwestern.edu'],
  from: 'jnguyen@u.northwestern.edu',
  subject: 'MEETING INVITATION by Groupie',
  text: "You're invited to share your meeting times with Groupie!!",
  html: '<p>You\'re invited to share your meeting times with Groupie!</p>',
};
  console.log('ayyyyyyyyy')
  sgMail.send(msg).then(res => console.log('succccc',res)).catch(err => console.log('errrrrr',err))
  res.send('test')
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});