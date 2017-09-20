const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientsSchema = new Schema({
	name: { type: String, required: true, unique: true, lowercase:true },
	phone: { type: String },
	married: { type: Boolean },
	gender: { type: String },
  age: { type: Number },
  profession: { type: String }
});

const Client = mongoose.model('Clients', clientsSchema);
module.exports = Client;
