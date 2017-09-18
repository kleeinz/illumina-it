const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const usersSchema = new Schema({
	username: { type: String, required: true, unique: true, lowercase:true },
	name: { type: String, required: true, lowercase:true},
	password: { type: String, required: true },
	userType: { type: String, required: true, lowercase:true }
});

// the schema is useless so far
// we need to create a model using it
const User = mongoose.model('Users', usersSchema);

// make this available to our users in our Node applications
module.exports = User;
