
var mongoose = require('mongoose');
var path = require('path');
var ImageSchema = new mongoose.Schema({
    referenceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'complaint',
        required: true
    },

    created: {
        type: Date,
    },
    
    filesPath: [{
        type: String
    }]
});

var PublicImage = module.exports = mongoose.model('PublicImage', ImageSchema);

//for adding photos
module.exports.addImage = function(image, callback) {
    image.save(callback);
};

//for receiving images for sma
module.exports.getFiles = function(referenceId1, callback) {
    PublicImage.findOne({referenceId: referenceId1}, callback);
};