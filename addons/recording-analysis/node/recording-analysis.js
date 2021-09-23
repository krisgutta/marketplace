const EventEmitter = require('events');

const response = {'transcription': 'This is a test analysis', 'intent' : 'test'};

class RecordingAnalysis extends EventEmitter {
	constructor() {
		super();
	}

	//Function to analyze the recording and produce results
	async analyze(bytes) {
		//Replace the following with your code that actually does something
		await new Promise(resolve => setTimeout(resolve, 5000));
		this.emit('results', response);
	}
}

module.exports = RecordingAnalysis;