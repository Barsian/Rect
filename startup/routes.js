const express = require('express');
const rects = require('../routes/rects');

module.exports = function(app) {
    app.use(express.json());
    app.use('/', rects);
}