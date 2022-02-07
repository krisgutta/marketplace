"use strict";
require('dotenv').config();

const express = require('express');
const IncomingSMS = require('./incoming-sms');
const app = express();

function log(message, ...args) {
  console.log(new Date(), message, ...args);
} 

app.get('/incoming-sms', function(req, res) {
  log('Received request from Twilio Marketplace');

  //TODO Add signature validation

  // output the headers
  log(req.headers);

  //log query parameters
  log(req.query);

  const service = new IncomingSMS();
  res.status(200).json(service.fetchInfo(req.query['phone']));
});


app.listen(8080);