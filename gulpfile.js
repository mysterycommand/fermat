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

gulp.task('default', ['jshint']);
