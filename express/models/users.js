/* User Schema */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/* Library to encrypt password and comparate a password encrypted */
const bcrypt = require('bcrypt');

/* User Schema definition */
const usersSchema = new Schema({
	username: { type: String, required: true, unique: true, lowercase:true, trim:true },
	name: { type: String, required: true, lowercase:true},
	password: { type: String, required: true },
	userType: { type: String, required: true, lowercase:true },
	image: { type: String }
});

/* HOOK Mongoose Save is used to encrypt the user password before to save the user. 
   Also the hook detects that the password to modify any user is modified or not.
   If the user password is modified then the bcrypt library generate a new encrypted password and
   store it at database. But if the user password is not modified then omit generate a new password.
*/
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
/* Exporting the User Schema, this will be used in other files */
module.exports = User;
