const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const usersSchema = new Schema({
	username: { type: String, required: true, unique: true, lowercase:true },
	name: { type: String, required: true, lowercase:true},
	password: { type: String, required: true },
	userType: { type: String, required: true, lowercase:true }
});

usersSchema.pre('save', function (next) {
    bcrypt.genSalt((err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(this.password, salt, (err, encrypted) => {
            if (err) {
                return next(err);
            }
            this.password = encrypted;
            next();
        });
    });
});

// usersSchema.methods.comparePassword = function(candidatePassword, callBack) {
// 	bcrypt.compare(candidatePassword, .password, function(err, isMatch) {
// 		console.log("password: ", this.password);
// 		if (err) return callBack(err);
// 		callBack(null, isMatch);
// 	});	
// };

const User = mongoose.model('Users', usersSchema);
module.exports = User;
