'use strict';

var fs = require('fs');
var path = require('path');
var util = require('util');

var gulp = require('gulp');

(function(dirs) {
    if (! util.isArray(dirs)) { dirs = [dirs]; }

    dirs.forEach(function(dir) {
        fs.readdirSync(dir).forEach(function(file) {
            var f = path.resolve(dir, file);
            if (! fs.statSync(f).isFile()) { return; }
            require(f);
        });
    });
}([
    './gulp/plugin',
    './gulp/custom'
]));

gulp.task('test', ['jshint', 'mocha']);
gulp.task('build', ['clean', 'test', 'ruby-sass', 'scripts']);
gulp.task('serve', ['build', 'browser-sync'], function() {
    gulp.watch('./source/styles/**/*.scss', ['ruby-sass']);
    gulp.watch('./source/scripts/**/*.js', ['scripts']);
    gulp.watch('./static/index.html', ['reload']);
});

gulp.task('default', ['serve']);
