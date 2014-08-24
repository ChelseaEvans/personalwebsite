"use strict";

/* =========================================================================
 *
 *   Constants
 *
 * ========================================================================= */
var ENV = process.env.NODE_ENV || 'development';

/* =========================================================================
 *
 *   Dependencies
 *
 * ========================================================================= */
var express = require('express');
var http = require('http');
var app = module.exports = express();
var path = require('path');

// Global Variables
global.Website = {};

//app settings
app.set('strict routing', true);

app.use(express.static(path.join(__dirname, '/bower_components')));

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
http.createServer(app).listen(4000, function() {
    console.log('express server listening on port ' + 4000);
});
