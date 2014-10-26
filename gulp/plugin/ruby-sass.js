'use strict';

var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var filter = require('gulp-filter');

var sync = require('browser-sync');

gulp.task('ruby-sass', function() {
    return gulp.src('./source/styles/main.scss')
        .pipe(sass({
            style: 'expanded',
            precision: 9
        }))
        .pipe(gulp.dest('./build/css'))
        .pipe(filter('**/*.css'))
        .pipe(sync.reload({ stream: true }));
});
