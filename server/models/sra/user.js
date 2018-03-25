
var mongoose = require('mongoose');

var SRASchema = new mongoose.Schema({
    sraName: {
        type: String,
        required: true
    },
    sraId: {
        type: Number,
        minlength: 10,
        maxlength: 10,
        required: true
    },
    pincode: {
        type: Number,
        minlength: 6,
        maxlength: 6,
        required: true
    }
});
var SRAusr = module.exports = mongoose.model('SRAusr', SRASchema);

//for adding new sra into sraurs collection 
module.exports.addSRAusr = function(newSRAusr,callback){
    newSRAusr.save(callback); 
};

//for displaying 


