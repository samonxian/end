'use strict';

/**
 * Module dependencies.
 */

var creator = require('./controllers/creator');

module.exports = function routes(app) {
    app.post('/creator', creator);
};
