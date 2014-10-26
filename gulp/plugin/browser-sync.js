'use strict';

var gulp = require('gulp');

var sync = require('browser-sync');

gulp.task('browser-sync', function() {
    sync({
        open: false,
        server: {
            baseDir: [
                './static',
                './build'
            ]
        }
    });
});
