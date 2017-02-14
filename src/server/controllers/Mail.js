const nodemailer = require('nodemailer');

module.exports = {
  welcomeMail: (req, res) => {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.WZ_EMAIL,
        pass: process.env.WZ_PASS,
      },
    });

    // setup email data with unicode symbols
    const mailOptions = {
      from: '"Alex 👻" <wordzukijp@gmail.com>', // sender address
      to: 'chantlong@gmail.com', // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world ?', // plain text body
      html: '<img src="cid:unique@nodemailer.com" /><p>Hello</p>', // html body
      attachments: [{
        filename: 'wordzuki-logo128.png',
        path: 'src/client/assets/images',
        cid: 'unique@nodemailer.com', //same cid value as in the html img src
      }],
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return process.stdout.write(error);
      }
      return process.stdout.write('Message %s sent: %s', info.messageId, info.response);
    });
  },
};


{/*<style>
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    font-family: sans-serif;
    font-size: 14px;
  }

  .bg {
    background-color: #FF3870;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 30px;
    padding-bottom: 30px;
    width:100%;
  }
  .innerbg {
    background-color: #F4F4F4;
    padding: 30px;
    border-radius: 5px;
    max-width: 500px;
  }
  
</style>
<div class="bg">
  <div class="innerbg">
    <p>こんにちは</p>
    <p>wordzukiをご利用いただきありがとうございます。</p>
  </div>
</div>*/}