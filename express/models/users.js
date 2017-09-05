const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const usersSchema = new Schema({
	//username: { type: String, required: true, unique: true },
	name: String
	//password: { type: String, required: true },
	//admin: Boolean,
	//created_date: Date,
	//updated_date: Date
});

// the schema is useless so far
// we need to create a model using it
const User = mongoose.model('Users', usersSchema);

// make this available to our users in our Node applications
module.exports = User;