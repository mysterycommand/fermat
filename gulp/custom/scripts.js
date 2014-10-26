'use strict';

var gulp = require('gulp');

var sync = require('browser-sync');
var browserify = require('browserify');
var stream = require('vinyl-source-stream');

gulp.task('scripts', function() {
    return browserify({
            entries: [ './source/scripts/main' ]
        })
        .bundle()
        .pipe(stream('main.js'))
        .pipe(gulp.dest('./build/js'))
        .pipe(sync.reload({ stream: true }));
});
