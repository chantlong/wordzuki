const path = require('path');
const nodemailer = require('nodemailer');
const resetPasswordMail = require('./Mail').resetPasswordMail;

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

    // // setup email data with unicode symbols
    const mailOptions = {
      from: '"Alex 😀" <wordzukijp@gmail.com>', // sender address
      to: req.body.user, // list of receivers
      subject: 'wordzukiにようこそ', // Subject line
      html: '<div class="flex-container" style="display: table;text-align: center;width: 100%;height: 100%;border-radius: 5px;color: #4b4b4b;font-family: avenir, sans-serif;font-size: 0.9375rem;justify-content: center;align-items: center;background-color: #ED3C73;box-sizing: border-box;margin: 0;"> <div class="header" style="display: table-row;height: 30px;"></div><div class="sidebar" style="display: table-cell;width: 5%;"></div><div class="innerbg" style="display: table-cell;vertical-align: middle;text-align: center;border-radius: 5px;background-color: #F4F4F4;padding: 30px;"> <section class="section" style="padding: 1% 3%;line-height: 30px;text-align: left;"> <h3 class="h3" style="font-weight: 500;margin-bottom: 20px;">言葉が好きなあなたへ</h3> <p><a class="link" href="www.wordzuki.xyz" rel="noopener" target="_blank" style="text-decoration: none;color: #ED3C73;"><span class="title" style="letter-spacing: 1px;font-weight: 500;">wordzuki</span></a>をご登録いただきありがとうございます！ <span class="emoji" style="font-size: 1.125rem;">🙂</span> </p><p> <a class="link" rel="noopener" href="https://chrome.google.com/webstore/detail/wordzuki/phojefkgbhhckcnippdmfogldbjdmbla" target="_blank" style="text-decoration: none;color: #ED3C73;"><span class="title" style="letter-spacing: 1px;font-weight: 500;">Google Chrome</span>拡張機能</a>を使って新しい英単語を学びましょう！単語追加や編集も自由にできます。Kindleの単語帳もアプリに導入ができますよ！</p><p>ぜひともご利用ください。</p><div style="display: table-row;width:100%;"><div style="display: table-cell; text-align:left;width:100%;vertical-align: middle;"><span class="title" style="letter-spacing: 1px;font-weight: 500;">Alex<span></span></span></div><div style="display:table-cell;text-align:right;vertical-align: middle;"><img src="cid:logo" style="width:1.5rem;height:1.5rem;float:right"></div></div> </section> </div><div class="sidebar" style="display: table-cell;width: 5%;"></div><div class="header" style="display: table-row;height: 30px;"></div></div>', // html body
      attachments: [{
        filename: 'wordzuki-logo128.png',
        path: path.resolve(__dirname, '../../client/assets/images/wordzuki-logo128.png'),
        cid: 'logo', //same cid value as in the html img src
      }],
    };

    // // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        process.stdout.write(error);
        return res.status(401).json({ sent: 'FAIL' });
      }
      process.stdout.write('Message %s sent: %s', info.messageId, info.response);
      return res.status(200).json({ sent: 'SUCCESS' });
    });
  },
  resetPasswordMail: (rInfo) => new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.WZ_EMAIL,
        pass: process.env.WZ_PASS,
      },
    });
    // // setup email data with unicode symbols
    const mailOptions = {
      from: '"wordzuki" <wordzukijp@gmail.com>', // sender address
      to: rInfo.user, // list of receivers
      subject: 'パスワードのリセット', // Subject line
      html: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + rInfo.hostname + '/reset/' + rInfo.token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n', // html body
      attachments: [{
        filename: 'wordzuki-logo128.png',
        path: path.resolve(__dirname, '../../client/assets/images/wordzuki-logo128.png'),
        cid: 'logo', //same cid value as in the html img src
      }],
    };

    // // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      console.log('that info', info);
      if (error) {
        process.stdout.write(error);
        reject({ sent: 'FAIL' });
      }
      process.stdout.write('Message %s sent: %s', info.messageId, info.response);
      resolve({ sent: 'SUCCESS' });
    });
  }),
};
