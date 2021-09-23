#Recording Analysis Example

This example demonstrates creating a Twilio Marketplace add-on for recording analysis integration point. 

The Recording Analysis Integration point allows developers to receive voice recordings once the recording is available for the purposes of transcribing, extracting intent, sentiment analysis or PCI redaction. While installing a recording analysis add-on, customers have the option to select one of the following integration points:


|Integration Point Name|Integration Key|Description|
|---|---|---|
|Record Verb Recordings|RECORDING_VERB|Recording created using [TwiML <Record> Verb](https://www.twilio.com/docs/voice/twiml/record)|
|Outgoing Call (API) Recordings|RECORDING_API|Recording for an outbound call created using [REST API](https://www.twilio.com/docs/voice/api/call-resource#create-a-call-resource)|
|Conference Recordings|RECORDING_CONFERENCE|Recording created using [TwiML <Conference> Noun](https://www.twilio.com/docs/voice/twiml/conference#record) or [Conference REST API](https://www.twilio.com/docs/voice/api/conference-participant-resource#create-a-participant)|
|Dial Verb Recordings|RECORDING_DIAL|Recording created using [TwiML <Dial> Verb](https://www.twilio.com/docs/voice/twiml/dial#record)|

