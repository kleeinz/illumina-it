const Responser = require('./Responser');

function sendError(err, res, status = 500, data = []) {
    let message = typeof err == 'object' ? err.message : err;
    res.status(status).json(new Responser(data, status, message));
}

module.exports = sendError;
