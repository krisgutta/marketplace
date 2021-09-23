var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
var data = new FormData();
data.append('callback', '');
data.append('channels', '2');
data.append('duration', '4');
data.append('audio-data', fs.createReadStream('./test.wav'));
data.append('format', 'audio/x-wav');
data.append('test', 'yes');

var config = {
  method: 'post',
  url: 'http://localhost:8080/transcription',
  headers: { 
    'x-twilio-addonsid': 'XB090778263e29a971bc619cb70f2e2305', 
    'x-twilio-addonversionsid': 'XCc0af24bc3cd41b49b4b1dec95b998710', 
    'x-twilio-vendoraccountsid': 'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 
    'x-twilio-requestsid': 'XR3e3fe4231e0821a5436c6217d31ca0ae', 
    'x-twilio-addoninstallsid': 'XDd5c990bf18471d2aed999ec16dc07deb', 
    'x-twilio-signature': 'FmjGtQSFzFYXtmA9', 
    ...data.getHeaders()
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
