const express = require('express');  // call express
const sgMail = require('@sendgrid/mail');
const app = express(); // create a server
const cors = require('cors')
const bodyParser = require('body-parser');


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
  html: req.body.message,
};

  sgMail.send(msg).then(res => console.log('succccc',res)).catch(err => console.log('errrrrr',err))
  res.send('test')
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
