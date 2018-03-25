
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var multer = require('multer');
var Path = require('path');
var Update = require('./../models/sra/update');
var User = require('./../models/sra/user');
var SSAReport = require('./../models/ssa/report');
var SraImage = require('./../models/images/sraPhoto.js');

var parseUrlencoded = bodyParser.urlencoded({extended: false});

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null,'F:/vayufinal/imagesSra');
    },
    filename: function(req, file, callback) {
        callback(null, Date.now()+Path.extname(file.originalname)); //required
    }
});

//router.route('/')
//router.route('/works')

var upload = multer({storage: storage});

router.route('/works/newUpdate') //for sra to send updates
    .all(bodyParser.json())
    .post(parseUrlencoded, upload.array('Images', 3), function(req, res) {
        //description properties
        var description = req.body.description;

        //image properties
        console.log(req.files);
        var created = new Date();
        var filesPath = [];
        req.files.forEach(function(image) {
            filesPath.push(image.path);
        });


        var update = new Update({
            description: description
        });

        Update.createUpdate(update, function(err, update) {
            if(err) throw err;
            console.log(update);
        });

        //image model
        var sraImage = new SraImage({
            referenceId : update._id,
            created : created,
            filesPath: filesPath
        });

        //written in images/sraPhoto.js
        SraImage.addImage(sraImage, function(err, image) {
            if(err) throw err;
            console.log(image);
        });


    });

router.route('/user') //for sra to register
    .all(bodyParser.json())
    .post(parseUrlencoded, function(req, res) {

        var sraName = req.body.sraName;
        var sraId = req.body.sraId;
        var pincode = req.body.pincode;

        var user = new User({
            sraName: sraName,
            sraId: sraId,
            pincode: pincode
        });

        User.addSRAusr(user, function(err, user) {
            if(err) throw err;
            console.log(user);
        })
    });

//receiving works from sma
router.route('/work')
    .get(function(req, res) {
        //written in ssa/report.js
        SSAReport.getReport(req.query.mobileno, function(err, report) {
            if(err) return handleError(err)
            setTimeout(function(){
                return res.status(200).send(report);
            },5000);
        });
    })

module.exports = router;