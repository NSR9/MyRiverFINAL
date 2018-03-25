
var mongoose = require('mongoose');
var GeoJSON = require('mongoose-geojson-schema'); // for geo cordinates

// create complaint schema
var complaintSchema = new mongoose.Schema({

    // userId
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

    // complaint
    //include photo
    complaintId: {
        type: Number,
        minlength: 5,
        maxlength: 5,
        //required: true,
        //unique: true
    },
    description: {
        type: String,
    },
    severity: {
        type: String,
        enum: ['high', 'medium', 'low'],
        //required: true
    },
    status: {
        type: Number,
        maxlength: 1,
        //required: true
    },
    area: {
        type: String,
    },
    pincode: {
        type: Number,
        minlength: 6,
        maxlength: 6,
        //required: true
    },
    geometry: {
        type: mongoose.Schema.Types.Point,
        //required: true
    },
    ssaId: {
        type: Number,
        minlength: 10,
        maxlength: 10,
    }
});
var Complaint = module.exports = mongoose.model('Complaint', complaintSchema);

//for adding complaints into complaints collection
module.exports.createComplaint = function (newComplaint, callback) {
    newComplaint.save(callback);
};

//retrieves complaint for sma based on pin
module.exports.getComplaintByPin = function (pin_sma, callback) {
    Complaint.find({ pincode: pin_sma }, callback);
};

//retieves complaints by using users collections documents _id 
module.exports.getComplaint = function (userId, callback) {
    Complaint.findOne({ userId: userId }, callback);
};

//for assigning comlaint to ssa
module.exports.assignToSSA = function (ssaId, id, callback) {
    Complaint.findByIdAndUpdate(id, { $set: { ssaId: ssaId } }, { new: true }, callback);
};

//for displaying complaints assigned to a particular user
module.exports.findComplaintsBySSAId = function (ssaId, callback) {
    Complaint.find({ ssaId: ssaId }, callback);
}
