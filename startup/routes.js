const express = require('express');
const rects = require('../routes/rects');
const bodyParser = require('body-parser');

module.exports = function(app) {
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use('/', rects);
}