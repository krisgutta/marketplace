const EventEmitter = require('events');

const response = {'transcription': 'This is a test analysis', 'intent' : 'test'};

class RecordingAnalysis extends EventEmitter {
	
	//Function to analyze the recording and produce results
	async analyze(bytes) {
		//Replace the following with your code that actually does something
		// TODO: make a new method that people should implement performAnalysis or something?
		await new Promise((resolve, reject) => setTimeout(resolve, 5000));
		this.emit('results', response);
	}
}

module.exports = RecordingAnalysis;