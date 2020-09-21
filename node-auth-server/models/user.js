import  mongoose  from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
const Schema = mongoose.Schema;


//define model

const userSchema = new Schema({
    email: {type: String, unique: true, lowercase: true},
    password: String
});

//on save hook, encrypt password

userSchema.pre('save', function(next) {
    // get access to the user model
    const user = this;

    //generate a salt and run callback
    bcrypt.genSalt(10, (err, salt) => {
        if(err) { return next(err); }

        //hash (encrypt) our password using the salt
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if(err) { return next(err); }

            //override plain text password with encrypted password
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword =  function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) { return callback(err); }
        callback(null, isMatch)
    });
}

//create the model class
const ModelClass = mongoose.model('user', userSchema);
export default ModelClass;