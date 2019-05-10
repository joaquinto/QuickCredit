import sgMail from '@sendgrid/mail';

const emailNotification = (emailFrom, emailTo, emailSubject, emailText) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const message = {
    to: emailTo,
    from: emailFrom,
    subject: emailSubject,
    text: emailText,
  };
  sgMail.send(message);
};

export default emailNotification;
