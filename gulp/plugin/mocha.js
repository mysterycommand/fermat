'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('mocha', function() {
    console.log('mocha');
    return gulp.src('./test/**/*.js', { read: false })
        .pipe(mocha({
            globals: ['window'],
            ignoreLeaks: true,
            reporter: 'spec'
        }));
});
