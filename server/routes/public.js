
var express = require('express');
//var Promise = require('promise');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var multer = require('multer');
var Path = require('path');
var Complaint = require('./../models/public/complaint');
var User = require('./../models/public/user');
var PublicImage = require('./../models/images/publicPhoto.js');

var parseUrlencoded = bodyParser.urlencoded({ extended: false });
// router.route('/')
// router.route('/complaints')

//for uploading images
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './imagesPublic');
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + Path.extname(file.originalname)); //required
    }
});

var upload = multer({ storage: storage });


router.route('/complaints/newComplaint')
    .all(bodyParser.json())
    .post(parseUrlencoded, upload.any(), function (req, res) {

        // user properties
        var userName = req.body.userName;
        var userId = req.body.userId;

        // complaint properties
        var area = req.body.area;
        var pincode = req.body.pincode;
        var geometry = req.body.geometry;
        var complaintId = req.body.complaintId;
        var description = req.body.description;
        var severity = req.body.severity;
        var status = req.body.status;

        //image properties
        console.log(req.files);
        var created = new Date();
        var filesPath = [];
        req.files.forEach(function (image) {
            filesPath.push(image.path);
        })

        // User model
        var user = new User({
            userId: userId,
            userName: userName
        });

        User.addUser(user, function (err, user) {
            if (err) throw err;
            console.log(user);
        });

        // Complaint model
        var complaint = new Complaint({
            userId: user._id,
            complaintId: complaintId,
            description: description,
            severity: severity,
            status: status,
            area: area,
            pincode: pincode,
            geometry: geometry,
        });

        Complaint.createComplaint(complaint, function (err, complaint) {
            if (err) throw err;
            console.log(complaint);
        });

        //image model
        var publicImage = new PublicImage({
            referenceId: complaint._id,
            created: created,
            filesPath: filesPath
        });

        //written in images/publicPhoto.js
        PublicImage.addImage(publicImage, function (err, image) {
            if (err) throw err;
            console.log(image);
        });
    });

router.route('/complaints/history')
    .get(function (req, res) {
        User.findUserInstances(req.query.mobileno, function (err, userInstances) {
            if (err) return handleErr(err)
            console.log(userInstances);

            //function get() {
            //return new Promise(function(resolve, reject) {
            //console.log(userInstances);
            var complaintsArray = [];

            //for(user in userInstances) {

            //console.log(user);
            //finding complaintId of user complaints
            userInstances.forEach(function (user) {
                Complaint.getComplaint(user._id, function (err, complaint) {
                    if (err) return handleError(err);
                    console.log(complaint);
                    complaintsArray.push(complaint);
                });
                //}

            });
            //});
            //}

            //var promise = get();
            //promise.then(function(complaintsArray) {
            console.log('success');
            setTimeout(function () {
                console.log(complaintsArray);
                return res.status(200).send(complaintsArray);
            }, 5000); //in millisecond
            //console.log(complaintsArray);
            //return res.status(200).send(complaintsArray);
            //}).catch(function(err) {
            //console.log(err);
            //});
        });
    });

module.exports = router;