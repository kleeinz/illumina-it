/* User Schema */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/* Library to encrypt password and comparate a password encrypted */
const bcrypt = require('bcrypt');

/* Schema definition */
const usersSchema = new Schema({
	username: { type: String, required: true, unique: true, lowercase:true, trim:true },
	name: { type: String, required: true, lowercase:true},
	password: { type: String, required: true },
	userType: { type: String, required: true, lowercase:true },
	image: { type: String }
});

/* HOOK Mongoose Save is used to encrypt the user password before to save the user */
usersSchema.pre('save', function(next) {
    if(bcrypt){
        var user = this;
        if (!user.isModified('password')) {
					return next();
				}
        bcrypt.genSalt(10, function(err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    }else{
        next();
    }
});

const User = mongoose.model('Users', usersSchema);
module.exports = User;
