(function () {
    /* global require, console */
    'use strict';

    var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();

    /**
     * Put all your configurations here!
     */
    var basedir = '../basedir/';
    var config = {
        baseDir: basedir,

        style: {
            css: {
                watchdir01: basedir + 'style/css/*.css',
                finalcss: basedir + 'style/style.css',
                minified: basedir + 'style/style.min.css',
                map: basedir + 'style/style.min.css.map'
            },

            scss: {
                scssinput: basedir + 'style/scss/main.scss',
                watchdir01: basedir + 'style/scss/**/*.scss',
                watchdir02: basedir + 'style/scss/*.scss'
            },

            svg: {
                watch: basedir + 'img/*.svg',
                files: 'img/*.svg',
                generated: basedir + 'style/svg.css',
                cwd: basedir,
                outfile: basedir + 'style/svg.css/icons.data.svg.css'
            }
        },

        scripts: {

            componentsFiles: [

                basedir + 'js/main.js',
                basedir + 'js/jquery.js',
            ],
            combinedOutputName: 'scripts.min.js',

            modernizrInput: [basedir + 'js/feature-detect/modernizr2.js', basedir + 'js/feature-detect/knl-init.js'],
            modernizrOutputName: 'feature-detect.min.js',

            jsOutputDir: basedir + 'js/',

            combinedminifiedoutput: basedir + 'js/scripts.min.js',

            watchdir01: basedir + 'js/*/*.js',
        }
    };

    require('./gulp/server')(config);
    require('./gulp/sass')(config);
    require('./gulp/scripts')(config);
    require('./gulp/static')(config);
    require('./gulp/watch')(config);

})();
