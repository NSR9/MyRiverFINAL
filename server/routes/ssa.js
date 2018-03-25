
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var multer = require('multer');
var Path = require('path');
var SSAusr = require('./../models/ssa/user');
var Report = require('./../models/ssa/report');
var Complaint = require('./../models/public/complaint');
var SsaImage = require('./../models/images/ssaPhoto.js');

var parseUrlencoded = bodyParser.urlencoded({extended: false});

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null,'F:/vayufinal/imagesSsa');
    },
    filename: function(req, file, callback) {
        callback(null, Date.now()+Path.extname(file.originalname)); //required
    }
});

var upload = multer({storage: storage});

router.route('/ssareports/newReport')
    .all(bodyParser.json())
    .post(parseUrlencoded, upload.array('Images', 3), function(req, res) {
 
        //SSA details
        var ssaName = req.body.ssaName;
        var ssaId = req.body.ssaId;

        //Additional info given by SSA
        var technicalReq = req.body.technicalReq;
        var estimatedTime = req.body.estimatedTime;
        var description = req.body.description; 

        //image properties
        console.log(req.files);
        var created = new Date();
        var filesPath = [];
        req.files.forEach(function(image) {
            filesPath.push(image.path);
        });

        //SSA user model 
        var ssa = new SSAusr({
            ssaName: ssaName,
            ssaId: ssaId,
        });

        SSAusr.addSSAusr(ssa, function(err,ssa) {
            if(err) throw err;
            console.log(ssa);
        });

        //technical report model
        var report = new Report({
            technicalReq: technicalReq,
            estimatedTime: estimatedTime,
            description: description
        });

        Report.addReport(report, function(err,report) {
            if (err) throw err;
            console.log(report);
        });

        //image model
        var ssaImage = new SsaImage({
            referenceId : report._id,
            created : created,
            filesPath: filesPath
        });

        //written in images/sraPhoto.js
        SsaImage.addImage(ssaImage, function(err, image) {
            if(err) throw err;
            console.log(image);
        });

    });

//receiving complaints from sma
router.route('/complaints')
    .get(function(req, res) {
        //written in public/complaint.js
        Complaint.findComplaintsBySSAId(req.query.mobileno, function(err, complaints) {
            if(err) return handleErr(err)
            setTimeout(function(){
                return res.status(200).send(complaints);
            },5000);
        });
    });

module.exports = router;

