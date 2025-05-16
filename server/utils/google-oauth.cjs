const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Load credentials from the downloaded credentials.json file
const credentials = require('../credentials.json'); // Ensure this file is in the same directory
const { client_secret, client_id, redirect_uris } = credentials.web; // Changed from credentials.installed to credentials.web

const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

const scopes = ['https://www.googleapis.com/auth/gmail.send'];

const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
});

console.log('Authorize this app by visiting this url:', authUrl);

const getToken = (code) => {
  oAuth2Client.getToken(code, (err, token) => {
    if (err) return console.error('Error retrieving token:', err);
    console.log('Token:', token);
    fs.writeFileSync('token.json', JSON.stringify(token));
    console.log('Refresh token saved to token.json');
  });
};

module.exports = { getToken, oAuth2Client };

getToken('4%2F0AUJR-x6vSNp8Rp-ISeAscjvjthuaPjRJtv4cAi08w751GhyieVrbUpOznMsQlOjd3jQV_A'); // Replace with your actual code