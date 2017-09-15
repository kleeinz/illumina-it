const RESPONSER = require('./Responser');

function sendError(err, res, status, data[]) {
    let message = typeof err == 'object' ? err.message : err;
    res.status(status).json(new Responser(data, status, message));
}

module.exports = sendError;