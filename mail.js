var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  host:"smtp.gmail.com",
  auth: {
    user: 'hammamiwissem21@gmail.com',
    pass: 'fqmpninnfvwxysiu'
  }
});

 
  var mailOptions = {
    from: 'Your Password Manager <password-manager@ovhcloud.com>',
    to: 'me@wissem-hammami.ovh',
    subject: 'Confirmation de votre compte',
    text: "hello" 
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });