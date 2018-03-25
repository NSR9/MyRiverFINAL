
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    userId: {
        type: Number,
        index: true,
        minlength: 10,
        maxlength: 10,
        //required: true,
        //unique: true
    },
    userName: {
        type: String,
        //required: true
    }
});

var User = module.exports = mongoose.model('User', userSchema);

//for adding users into user collection
module.exports.addUser = function(newUser, callback){
    newUser.save(callback);
};


//for finding complaints postedby users
module.exports.findUserInstances = function(userId, callback) {
    User.find({userId: userId}, callback);
};

