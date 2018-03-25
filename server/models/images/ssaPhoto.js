var mongoose = require('mongoose');
var path = require('path');
var ImageSchema = new mongoose.Schema({
    referenceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'report',
        required: true
    },

    created: {
        type: Date,
    },
    
    filesPath: [{
        type: String
    }]
});

var SsaImage = module.exports = mongoose.model('SsaImage', ImageSchema);

//for adding photos
module.exports.addImage = function(image, callback) {
    image.save(callback);
};

//for receiving images for ssa
module.exports.getFiles = function(referenceID, callback) {
    SsaImage.findOne({referenceId: referenceID}, callback);
};