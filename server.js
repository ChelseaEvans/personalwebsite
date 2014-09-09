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
app.get('/about', function(req, res) {
  res.sendfile('views/about.html');
});

//start server
http.createServer(app).listen(PORT, function() {
    console.log('express server listening on port ' + PORT);
});
