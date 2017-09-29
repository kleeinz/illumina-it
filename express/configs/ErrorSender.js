/* Error Handle function */
const Responser = require('./Responser');

/**
* This method is thrown out as an emisor to the front end with the objetive to inform any error occurred
* in any operation with whatever controller in the Rest API. Practically the function sends an json object
* with help to Responser and this object contains information about error.
* @param err is the error to return at front end
* @param res is the response to send at front end
* @param status is the operation status
* @param data any information to send
*/
function sendError(err, res, status = 500, data = []) {
    let message = typeof err == 'object' ? err.message : err;
    res.status(status).json(new Responser(data, status, message));
}

/* Exporting the sendError function to use in others files */
module.exports = sendError;
