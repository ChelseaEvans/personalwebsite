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
var fs = require('fs');
var Handlebars = require('handlebars');
if (ENV === 'production') {
    var newRelic = require('newrelic');
}

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
app.get('/', getFile('views/home.html'));

app.get('/project-runkeeper', getFile('views/project-runkeeper.html'));

app.get('/project-webmd', getFile('views/project-webmd.html'));

app.get('/project-truespirit', getFile('views/project-truespirit.html'));

app.get('/project-timetogo', getFile('views/project-timetogo.html'));

app.get('/ping', function(req, res, next) {
    return res.json(200, {
        status: 'ok'
    });
});

/* =========================================================================
 *
 *   Templating
 *
 * ========================================================================= */
var fileCache = {};
var LAYOUT_FILE_NAME = 'views/layout.html';

function getFile(fileName) {
    return function(req, res, next) {
        var file = fileCache[fileName];

        if (file && ENV === 'production') {
            console.log('using cached ' + fileName);
            return sendFile(file, res);
        } else {
            fs.readFile(fileName, 'utf8', function(err, data) {
                if (err) return fileNotFound(res);
                if (!data) return fileNotFound(res);

                var layout = fileCache[LAYOUT_FILE_NAME];

                if (!layout || ENV !== 'production') {
                    loadLayoutFile(function(err, layoutFile) {
                        if (err) return fileNotFound(res);
                        compile(data, fileName, layoutFile, function(err, compiledFile) {
                            return sendFile(compiledFile, res);
                        });
                    });
                } else {
                    compile(data, fileName, layout, function(err, compiledFile) {
                        return sendFile(compiledFile, res);
                    });
                }
            });
        }
    };
}

function loadLayoutFile(next) {
    fs.readFile(LAYOUT_FILE_NAME, 'utf8', function(err, data) {
        fileCache[LAYOUT_FILE_NAME] = data;
        next(null, data);
    });
}

function fileNotFound(res) {
    res.status(404);
    res.end();
}

function compile(fileData, fileName, layout, next) {
    var template = null;

    try {
        template = Handlebars.compile(layout);
    } catch (err) {
        return next(err);
    }

    var file = fileCache[fileName] = template({
        file: fileData
    });
    return next(null, file);
}

function sendFile(file, res) {
    res.writeHead(200, {
        "Content-Type": "text/html"
    });
    res.write(file);
    res.end();
}

//start server
http.createServer(app).listen(PORT, function() {
    console.log('express server listening on port ' + PORT);
});
