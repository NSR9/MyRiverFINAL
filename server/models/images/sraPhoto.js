var mongoose = require('mongoose');
var path = require('path');
var ImageSchema = new mongoose.Schema({
    referenceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'update',
        required: true
    },

    created: {
        type: Date,
    },
    
    filesPath: [{
        type: String
    }]
});

var SraImage = module.exports = mongoose.model('SraImage', ImageSchema);

//for adding photos
module.exports.addImage = function(image, callback) {
    image.save(callback);
};

//for receiving files for sra
module.exports.getFiles = function(referenceID, callback) {
    SraImage.findOne({referenceId: referenceID}, callback);
};