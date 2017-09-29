/* Custom Response to send data, messages and status about operations executed. */
class Responser {
	/** The constructor receives three parameters
	 * @param data information to send at front end.
	 * @status http code in the response, default is 200. 
	 * @message information about the status operation. For example: the user has been deleted.
	 */
	constructor (data = [], status = 200, message = null) {
		this.data = data;
		this.status = status;
		this.message = message;
	}
}
/* Exporting the Responser to use in the project */
module.exports = Responser;
