var bcrypt = require("bcryptjs");
var mongoose = require("mongoose");
const SALT_FACTOR = 10;

var userSchema = mongoose.Schema({
    username:{type:String, required:true},
    email:{type:String, require:true, unique:true},
    password:{type: String, required:false},
    createdAt:{type:Date, default:Date.now}

})


// We will run this before saving - add salt and hash password
userSchema.pre("save", function(done){
    var user = this;

    // If not modified we do not need to rehash
    if (!user.isModified("password")){
        return done();
    }

    // Generate salt and hash password
    bcrypt.genSalt(SALT_FACTOR, function(err, salt){
        if (err){
            return done(err);
        }

        bcrypt.hash(user.password, salt, function(err, hashedPassword){
            if (err){
                return done(err);
            }
        user.password = hashedPassword;
        done();
        });
    });
});


// Create method to check passwords match
userSchema.methods.checkPassword = function(guess, done){
    if (this.password != null){
        bcrypt.compare(guess, this.password, function(err, isMatch){
            done(err, isMatch);
        });
    }
}

var user = mongoose.model("User", userSchema);
module.exports = user;
