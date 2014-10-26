'use strict';

var gulp = require('gulp');

var sync = require('browser-sync');

gulp.task('reload', function() {
    sync.reload();
});
