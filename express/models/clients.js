/* Client Schema */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Client Schema Definition */
const clientsSchema = new Schema({
	name: { type: String, required: true, unique: true, lowercase:true },
	phone: { type: String },
	married: { type: Boolean },
	gender: { type: String },
    age: { type: Number },
    profession: { type: String }
});

/* Exporting the ClientSchema to use in other files */
const Client = mongoose.model('Clients', clientsSchema);
module.exports = Client;
