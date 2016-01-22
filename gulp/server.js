'use strict';

var gulp = require('gulp'),
plugins = require('gulp-load-plugins')();

module.exports = function (config) {

    if (!plugins.util.env.production) {
        var browserSync = require('browser-sync').create('dev-server');
    }


    /**
     * Start the develop environment
     * Run the server on your slow webserver
     */
    gulp.task('serve', ['watch-basic'], function () {

        browserSync.init({
            xip: true,
            open: true,
            notify: true,
            proxy: "http://my-slow-server.com"
        });
    });

};
