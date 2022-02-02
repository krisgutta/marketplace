"use strict";
require('dotenv').config();

const express = require('express');
const app = express();

// Get twilio-node from twilio.com/docs/libraries/node
const client = require('twilio');

const username = process.env.ACCOUNT_SID;
const password = process.env.AUTH_TOKEN;

function log(message, ...args) {
  console.log(new Date(), message, ...args);
}

app.get('/incoming-call', function(req, res) {
  log('Received request from Twilio Marketplace');

  // output the headers
  //log(`headers: ${JSON.stringify(req.headers)}`);
  log(req.headers);

  //log query parameters
  log(req.query);

   res.end();
});

app.listen(8080);