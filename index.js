const nodemailer = requier('nodemailer');

/**
 * send an HTML email using  Nodemailer
 * @param {Object} options -Configuration options for sending email
 * @param {string} [options.MAIL_USER] -sender email address (or set via preocess.env.MAIL_USER)
 * @param {string} [options.MAIL_PASSWORD] -sender email app password (or set via process.env.MAIL_PASSWORD)
 * @param {string|string[]} options.to -Recipient email ID(s)
 * @param {string}  options.subject -email subject line
 * @param {string} options.htmlContent -HTML body content of the email
 * @param {string} [options.service="gmail"] - EMaIL service provider(defult: 'gmail')
 * @param {string} [options.fromName] - optional diplay name for the sender
 * @returns {Promise<Object>} Nodemailer response info
 */

async function sendHtmlEmail(options = {}) {
  const {
    MAIL_USER = process.env.MAIL_USER,
    MAIL_PASSWORD = process.env.MAIL_PASSWORD,
    to,
    subject = 'No subject',
    htmlContent,
    service = "gmail",
    fromName = ''
  } = options;

  if (!MAIL_USER || !MAIL_PASSWORD) {
    throw new Error("Missing Credentials: Please Provide 'MAIL_USER' and 'MAIL_PASSWORD' in options or environment variables.");
  }

  if (!to) {
    throw new Error("Missing Recipient: Please provide a recipient email ID ('to')");
  }

  if (!htmlContent) {
    throw new Error("Missing Content: Please provide 'htmlContent' for the email body.");
  }

  const transporter = nodemailer.createTransport({
    service: service,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: fromName ? `"${fromName}" <${MAIL_USER}>` : MAIL_USER,
    to: Array.isArray(to) ? to.join(', ') : to,
    subject: subject,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return {
      success: true,
      messageId: info.messageId,
      response: info.response,
    };
  } catch (error) {
    throw new Error(`Failed to send email: ${error.message}`);
  }
}

module.exports = { sendHtmlEmail, };