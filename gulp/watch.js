'use strict';

var gulp = require('gulp');

module.exports = function (config) {

  var browserSync = require('browser-sync').get('dev-server');
  gulp.task('bs-reload', function () {
    browserSync.reload();
  });

  /**
   * Watch files
   */
  gulp.task('watch-static', ['sass'], function () {
    gulp.watch([config.baseDir + "style/scss/**/*.scss"], ['sass:dev']);
    gulp.watch(["../static/dist/**/*.html"], ['bs-reload']);
    gulp.watch([config.baseDir + "js/**/*.js", "!" + config.baseDir + "/js/scripts.min.js"], ['scripts:components']);
  });
};
