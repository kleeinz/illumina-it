/* Custom Response to send data, messages and status about operations executed. */
class Responser {
	constructor (data = [], status = 200, message = null) {
		this.data = data;
		this.status = status;
		this.message = message;
	}
}
module.exports = Responser;
