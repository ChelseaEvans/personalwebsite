"use strict";

/* =========================================================================
 *
 *   Constants
 *
 * ========================================================================= */
var ENV = process.env.NODE_ENV || 'development';
var PORT = process.env.PORT || 4000;

/* =========================================================================
 *
 *   Dependencies
 *
 * ========================================================================= */
var express = require('express');
var http = require('http');
var app = module.exports = express();
var path = require('path');
var newRelic = require('newrelic');

// Global Variables
global.Website = {};

//app settings
app.set('strict routing', true);

app.use(express.static(path.join(__dirname, '/public')));

/* =========================================================================
 *
 *   Routes
 *
 * ========================================================================= */
app.get('/', function(req, res) {
    res.sendfile('views/home.html');
});

app.get('/project-runkeeper', function(req, res) {
    res.sendfile('views/project-runkeeper.html');
});

app.get('/project-webmd', function(req, res) {
    res.sendfile('views/project-webmd.html');
});

app.get('/project-truespirit', function(req, res) {
    res.sendfile('views/project-truespirit.html');
});

app.get('/project-timetogo', function(req, res) {
    res.sendfile('views/project-timetogo.html');
});

app.get('/ping', function(req, res, next) {
    return res.json(200, {
        status: 'ok'
    });
});

// var projectController = require('./api/controllers/project');
// app.get('/projects', projectController.get);

//start server
http.createServer(app).listen(PORT, function() {
    console.log('express server listening on port ' + PORT);
});
