
const response = {'customer_name' : 'Hello World', 'customer_type': 'PERSONAL'};

class Lookups {

    //Function to fetch data available for the phone number
    fetchInfo(phoneNumber) {
        //Replace the following with your own code.
        //Lookup data attached to the phone number in your database and return the data response.
        return {'phone_number' : phoneNumber, results : response, error_code: null};
    }
}

module.exports = Lookups;