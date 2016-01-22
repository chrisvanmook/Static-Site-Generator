'use strict';

var gulp = require('gulp'),
plugins = require('gulp-load-plugins')();


if (!plugins.util.env.production) {
    var browserSync = require('browser-sync').get('dev-server');
}

module.exports = function (config) {
    /**
     * Generate css file from SASS, apply autoprefixer and create sourcemaps
     */
    gulp.task('sass', function () {
        return gulp.src([config.baseDir + 'style/scss/*.scss'])
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.sass({
                errLogToConsole: true
            }))
            .pipe(plugins.autoprefixer(
                'last 2 version', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'
            ))
            .pipe(plugins.combineMq())
            .pipe(plugins.minifyCss())
            .pipe(plugins.rename("style.min.css"))
            .pipe(plugins.sourcemaps.write('./'))
            .pipe(gulp.dest(config.baseDir + 'style/'))
            .pipe(!plugins.util.env.production ? browserSync.stream({match: '**/*.css'}) : plugins.util.noop());
    });

    gulp.task('sass:dev', function () {
        var browserSyncStatic = require('browser-sync').get('static-server');
        return gulp.src([config.baseDir + 'style/scss/*.scss'])
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.sass({
                errLogToConsole: true
            }))
            .pipe(plugins.autoprefixer(
                'last 2 version', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'
            ))
            .pipe(plugins.rename("style.css"))
            .pipe(plugins.sourcemaps.write('./'))
            .pipe(gulp.dest(config.baseDir + 'style/'))
            .pipe(browserSyncStatic.stream({match: '**/*.css'}));
    });
};
