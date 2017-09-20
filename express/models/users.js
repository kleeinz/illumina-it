const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const usersSchema = new Schema({
	username: { type: String, required: true, unique: true, lowercase:true },
	name: { type: String, required: true, lowercase:true},
	password: { type: String, required: true },
	userType: { type: String, required: true, lowercase:true }
});

// usersSchema.pre('save', function (next) {
//     bcrypt.genSalt((err, salt) => {
// 				console.log("Esto no tiene valor: ", this.isModified);
// 				if(!this.isModified('password')) {
// 					console.log("No se ha modificado la password");
// 					return next();
// 				}
//
// 				if (err) {
//             return next(err);
//         }
//         bcrypt.hash(this.password, salt, (err, encrypted) => {
//             if (err) {
//                 return next(err);
//             }
//             this.password = encrypted;
//             next();
//         });
//     });
// });

usersSchema.pre('save', function(next) {
    if(bcrypt){
        var user = this;

        // only hash the password if it has been modified (or is new)
        if (!user.isModified('password')) {
					console.log("No se modifico", user.isModified('password'));
					return next();
				} else {
					console.log("Se modifico, volviendo a generar", user.isModified('password'));
				}
        // generate a salt
        bcrypt.genSalt(10, function(err, salt) {
            if (err) return next(err);

            // hash the password using our new salt
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);

                // override the cleartext password with the hashed one
                user.password = hash;
                next();
            });
        });
    }else{
        next();
    }
});

usersSchema.methods.hidePassword = function() {
    this.password = "[obscured]";
    delete this.password;
};

const User = mongoose.model('Users', usersSchema);
module.exports = User;
