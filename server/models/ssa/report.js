
var mongoose = require('mongoose');

var ReportSchema = new mongoose.Schema({
    //technical solution
    technicalReq: String,

    //Estimated time 
    estimatedTime: Number,

    //Technical description
    description: {
        type: String,
        //required: true
    },
    sraId: {
        type: Number,
        minlength: 10,
        maxlength: 10,
    }
});

var Report = module.exports = mongoose.model('Report', ReportSchema);

//for adding new report to reports collection
module.exports.addReport = function(newReport,callback) {
    newReport.save(callback);
};

//for sending reports to sma
module.exports.getReports = function(callback) {
    Report.find(callback);
};

//assinging work to sra
module.exports.assignToSRA = function(sraId, id, callback) {
    Report.findByIdAndUpdate( id,{$set: {sraId: sraId}}, {new: true}, callback);
};

//sra receives work
module.exports.getReport = function(sraId, callback) {
    Report.findOne({sraId: sraId}, callback);
};

