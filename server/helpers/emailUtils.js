import mailGun from 'mailgun-js';

export default class EmailUtility {
  static emailUtility(emailFrom, emailTo, emailSubject, emailText) {
    const sendMail = mailGun(
      {
        apiKey: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN,
      },
    );
    const message = {
      to: emailTo,
      from: emailFrom,
      subject: emailSubject,
      text: emailText,
    };
    sendMail.messages().send(message);
  }
}
