"use strict";
require('dotenv').config();

const fs = require('fs');

const express = require('express');
const app = express();

const formidable = require('formidable')

const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: true })

const axios = require('axios');
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Get twilio-node from twilio.com/docs/libraries/node
const client = require('twilio');

const RecordingAnalysis = require('./recording-analysis');

const username = process.env.ACCOUNT_SID;
const password = process.env.AUTH_TOKEN;

function log(message, ...args) {
  console.log(new Date(), message, ...args);
}

//End point to receive async request from Twilio add-on
app.post('/transcription', async (req, res) => {
  log('Received Request from Twilio Marketplace');

  // output the headers
  log(`headers: ${req.headers}`);

  const form = formidable({uploadDir: './recordings/'})

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error', err);
      throw err;
    }

    // https://www.twilio.com/blog/how-to-secure-twilio-webhook-urls-in-nodejs
    const params = req.body;

    log(`fields : ${JSON.stringify(fields)}`);
    log(`params : ${params}`);

    const isTest = req.headers['x-test-request'] && req.headers['x-test-request'] == 'yes';

    validateSignature(req.headers['x-twilio-signature'], params);

    // Request is accepted
    res.status(202).send();
    res.end();

    // TODO: This pattern of doing stuff after the response is returned always makes me queasy.
    // Would you want the user to know this failed?
    log(`Reading recording: ${files['audio-data'].path}`);
    let bytes = fs.readFileSync(files['audio-data'].path).toString('base64');

    const service = new RecordingAnalysis();
    service.on('results', (data) => {
		  log(`Recording Analysis Data : ${JSON.stringify(data)}`);
		  if (!isTest) {
			 postResults(params.callback, JSON.stringify(data));
		  }
    });

    log(`kicking off recording analysis`);
    // Analyze is an asynchronous method
    await service.analyze(bytes);

    log(`Removing recording: ${files['audio-data'].path}`);
    fs.unlink(files['audio-data'].path, (err) => {
      if (err) {
        console.error(err)
        return
      }
    });
  });
});

//Validate request signature
function validateSignature(twilioSignature, params) {

  log(`x-twilio-signature: ${twilioSignature}`);

  // Your Auth Token from twilio.com/console
  const authToken = process.env.AUTH_TOKEN;

  // The Twilio request URL
  // TODO: Store this in the environment or pass it in?
  const url = 'https://streams.ngrok.io/transcription';

  log(client.validateRequest(authToken, twilioSignature, url, params));
}

//Post results to the Marketplace callback Url
async function postResults(url, transcription) {
	if (url === undefined || url.length === 0) {
		log(`Skipping posting results to Twilio Marketplace, callback url is empty`);
		return;
	}

	log(`Posting results to callback url: ${url}`);

	let instance = axios.create({
		baseURL: url,
		method: 'post',
		auth: {
	  	username: username,
	  	password: password
	},
		headers: {'Content-Type': 'application/json'}
	});

	try {
		const response = await instance.post(url,transcription);
		console.log('Status:' + response.status);
		console.log('statusText:' + response.statusText)
		console.log(response.data);
	} catch(error) {
		console.error(error);
	}
}

//START: The following code is not required for add-on creator
//The following is to accept requests from Marketplace as a 
//customer that installed the add-on. 
//Delete the following code in your actual add-on implementation

//The following end point is to receive results from Marketplace.
app.post('/transcription-results', urlencodedParser, (req, res) => {
  console.log('Received Transcription results from Twilio Marketplace');
  console.log(req.headers);

  let data = JSON.parse(req.body.AddOns);

  log(data);

  if (data.status == 'successful') {
    console.log(data.results.google_transcriptions.payload); 
    downloadTranscription(data.results.google_transcriptions.payload[0].url);
  }
}).on('error', (err) => {
  console.log('Error:' + err.message);
});

//This is here as an example to demonstrate how a customer could download the results from marketplace.
//The add-on implementation itself does not require code.
async function downloadTranscription(url) {
  console.log('Downloading transcriptions from Twilio Marketplace');
  let instance = axios.create({
    baseURL: url,
    method: 'get',
    auth: {
      username: username,
      password: password
    },
    headers: {'Content-Type': 'application/json'},
    responseType: 'json'
  });

  try {
    let response = await instance.get();
    console.log(response.status);
    console.log(response.statusText);
    console.log(JSON.stringify(response.data));
  } catch (error) {
    console.error(error);
  }
}

//END: End of the code that is not required for creating the add-on

app.listen(8080);