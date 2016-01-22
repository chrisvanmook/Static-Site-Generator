'use strict';

var gulp = require('gulp'),
plugins = require('gulp-load-plugins')();


if (!plugins.util.env.production) {
    var browserSync = require('browser-sync').get('dev-server');
}

module.exports = function (config) {
    /**
     * Concat js files
     */
    gulp.task('scripts:components', function () {
        return gulp.src(config.scripts.componentsFiles)
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.concat(config.scripts.combinedOutputName, {
                newLine:'\n;' // the newline is needed in case the file ends with a line comment, the semi-colon is needed if the last statement wasn't terminated
            }))
            .pipe(plugins.uglify({
                loadMaps: false
            }))
            .pipe(plugins.rename(config.scripts.combinedOutputName))
            .pipe(plugins.sourcemaps.write('./'))
            .pipe(gulp.dest(config.scripts.jsOutputDir));
    });

    gulp.task('scripts:modernizr', function () {
        return gulp.src(config.scripts.modernizrInput)
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.concat(config.scripts.combinedOutputName, {
                newLine:'\n;' // the newline is needed in case the file ends with a line comment, the semi-colon is needed if the last statement wasn't terminated
            }))
            .pipe(plugins.uglify())
            .pipe(plugins.rename(config.scripts.modernizrOutputName))
            .pipe(plugins.sourcemaps.write('./'))
            .pipe(gulp.dest(config.scripts.jsOutputDir));
    });

    gulp.task('scripts', ['scripts:components', 'scripts:modernizr'])
};


