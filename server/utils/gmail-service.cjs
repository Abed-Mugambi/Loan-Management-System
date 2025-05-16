const { google } = require('googleapis');
require('dotenv').config();

// Load credentials from environment variables
const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Set the refresh token
oAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

// Function to send an email
const sendEmail = async (to, subject, message) => {
  try {
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

    // Create the email in RFC 2822 format
    const email = [
      `To: ${to}`,
      'Content-Type: text/plain; charset="UTF-8"',
      'MIME-Version: 1.0',
      `Subject: ${subject}`,
      '',
      message,
    ].join('\n');

    // Encode the email to base64
    const encodedEmail = Buffer.from(email)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    // Send the email
    const response = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedEmail,
      },
    });

    console.log('Email sent successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending email:', JSON.stringify(error, null, 2));
    throw error;
  }
};

module.exports = { sendEmail };