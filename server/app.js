
var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost:27017/fmsDB');
var db = mongoose.connection;

app.use('/', express.static('./../'));

var public = require('./routes/public');
app.use('/public', public);

var sra = require('./routes/sra');
app.use('/sra', sra);

var sma = require('./routes/sma');
app.use('/sma', sma);

var ssa = require('./routes/ssa');
app.use('/ssa', ssa);

module.exports = app;