
var mongoose = require('mongoose');

//creating updates schema
//include photo
var updateSchema = new  mongoose.Schema({
    description: {
        type: String,
        require: true
    }
});
var Update = module.exports = mongoose.model('Update', updateSchema);

//for adding updates to updates collection
module.exports.createUpdate = function(newUpdate, callback) {
    newUpdate.save(callback);
};

//for submitting updates to sma
module.exports.getUpdates = function(callback) {
    Update.find(callback);
};