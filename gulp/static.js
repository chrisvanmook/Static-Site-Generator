'use strict';

var gulp = require('gulp'),
dataFile = require('../static/data.json'),
extend = require('extend'),
es = require('event-stream'),
$ = require('gulp-load-plugins')();

var commands = dataFile.links.map(function (obj) {
  return 'wget "' + obj.url + '" -O ./static/raw/' + obj.filename + '.html';
});

var routes = {};
dataFile.links.map(function (obj) {
  routes[obj.route] = "static/dist/" + obj.filename + ".html";
});

var mainRoutes = {
  "/public": "../src/public",
};

extend(routes, mainRoutes);

module.exports = function (config) {

  /**
   * Fetch the static html and put them in the static/raw folder
   */
  gulp.task('static:get-static-files', $.shell.task(commands));

  /**
   * Perform a replace to link everything locally or to do other stuff to make loading times minimal
   */
  gulp.task('static:replace', function () {
    gulp.src(['./static/raw/*.html'])
      .pipe($.replace(/\/style.min.css/g, '../public/style/style.css'))
      .pipe(gulp.dest('./static/dist'));
  });

  /**
   * Indent and make the html beautiful again
   */
  gulp.task('static:prettify', function () {
    gulp.src('./static/dist/*.html')
      .pipe($.prettify({indent_size: 4}))
      .pipe(gulp.dest('./static/dist/'))
  });

  /**
   * Start a local web server with browsersync
   */
  gulp.task('serve-static', ['watch-static'], function () {
    var browserSyncStatic = require('browser-sync').create('static-server');
    browserSyncStatic.init({
      xip: true,
      open: true,
      port: 4000,
      notify: true,
      server: {
        baseDir: './static/dist/',
        routes: routes
      }
    });
  });

  gulp.task('init-static', $.sequence('static:get-static-files', 'static:replace', 'static:prettify'));
  gulp.task('start-static', ['serve-static']);
};
