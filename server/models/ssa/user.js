
var mongoose = require('mongoose');

var SSASchema = new mongoose.Schema({
    ssaName: {
        type: String,
        //required: true
    },
    ssaId: {
        type: Number,
        minlength: 10,
        maxlength: 10,
        //required: true
    },
});
var SSAusr = module.exports = mongoose.model('SSAusr', SSASchema);

//for adding new ssa into ssaurs collection 
module.exports.addSSAusr = function(newSSAusr,callback){
    newSSAusr.save(callback); 
};


