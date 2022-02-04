
const response = {'caller_name' : 'Hello World', 'caller_type': 'PERSONAL'};

class IncomingCall {

    //Function to fetch data available for the phone number
    fetchInfo(phoneNumber) {
        //Replace the following with your own code.
        //Lookup data attached to the phone number in your database and return the data response.
        return {'phone_number' : phoneNumber, results : response, error_code: null};
    }
}

module.exports = IncomingCall;