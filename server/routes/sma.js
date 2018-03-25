
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Complaint = require('./../models/public/complaint');
var SRAusr = require('./../models/sra/user');
var SSAReport = require('./../models/ssa/report');
var SRAUpdate = require('./../models/sra/update');
var PublicImage = require('./../models/images/publicPhoto');
var SraImage = require('./../models/images/sraPhoto');
var SsaImage = require('./../models/images/ssaPhoto');

var parseUrlencoded = bodyParser.urlencoded({extended: false});

//to get reported complaints
router.route('/')
    .get(function(req, res) {
        //pin from url
        //written in public/complaint.js
        Complaint.getComplaintByPin(req.query.pin, function(err, complaints) {
            if(err) return handleError(err);
            var images = [];
            complaints.forEach(function(complaint) {
                //written in images/publicPhoto.js
                PublicImage.getFiles(complaint._id, function(err, imageDoc) {
                    if(err) return handleError(err);
                    console.log(imageDoc);
                    images.push(imageDoc);
                });
            });
            setTimeout(function() {
                console.log(images);
                return res.status(200).send(complaints+ images);
            },5000);
            }); 
    });

//assigning work to ssa
router.route('/complaint/ssa')
    .all(bodyParser.json())
    .put(parseUrlencoded, function(req, res) {
        var ssaId = 8897555381; //already known to sma
        var complaintId = mongoose.Types.ObjectId("5aafb3dd5bc908314432c250"); //change as data base changes
        //written in public/complaint.js
         Complaint.assignToSSA(ssaId, complaintId, function(err, complaintSSA) {
            if(err) return handleError(err)
            setTimeout(function(){
                console.log(complaintSSA);
            },5000);
         });
    });

//receiving report from ssa
router.route('/report/ssa')
    .get(function(req, res) {
        //written in ssa/report.js
        SSAReport.getReports(function(err, reports) {
            if(err) return handleError(err);
            console.log(reports);
            var images = [];
            reports.forEach(function(report) {
                //written in images/ssaPhoto.js
                SsaImage.getFiles(report._id, function(err, imageDoc) {
                    if(err) return handleError(err);
                    console.log(imageDoc);
                    images.push(imageDoc);
                });
            });
            setTimeout(function(){
                console.log(images);
                return res.status(200).send(reports+ images);
            },5000);
        });
    });

//assigning work to sra
router.route('/complaint/sra')
    .all(bodyParser.json())
    .put(parseUrlencoded, function(req, res) {
        var sraId = 9100427531; //should be taken from list
        var reportId = mongoose.Types.ObjectId("5aafc1745647e52bd4d7da4d"); //change as data base changes
        //written in ssa/report.js
         SSAReport.assignToSRA(sraId, reportId, function(err, workSRA) {
            if(err) return handleError(err)
            setTimeout(function(){
                console.log(workSRA);
            },5000);
         });
    });

//receiving updates from sra
router.route('/works/updates')
    .get(function(req, res) {
        //written in sra/update.js
        SRAUpdate.getUpdates(function(err, updates) {
            if(err) return handleError(err);
            var images = [];
            updates.forEach(function(update) {
                SraImage.getFiles(update._id, function(err, imageDoc) {
                    if(err) return handleError(err);
                    console.log(imageDoc);
                    images.push(imageDoc);
                });
            });
            setTimeout(function(){
                console.log(images);
                return res.status(200).send(updates+ images);
            },5000);
        });
    });
module.exports = router;
