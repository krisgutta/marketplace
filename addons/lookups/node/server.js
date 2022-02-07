"use strict";
require('dotenv').config();

const express = require('express');
const Lookups = require('./lookups');
const app = express();

function log(message, ...args) {
  console.log(new Date(), message, ...args);
} 

app.get('/lookups', function(req, res) {
  log('Received request from Twilio Marketplace');

  //TODO Add signature validation

  // output the headers
  log(req.headers);

  //log query parameters
  log(req.query);

  const service = new Lookups();
  res.status(200).json(service.fetchInfo(req.query['phone']));
});


app.listen(8080);