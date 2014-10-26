'use strict';

var rAF = require('./polyfill/requestAnimationFrame');

function onLoad(/*event*/) {

    var main = document.getElementById('main');
    var canvas = document.getElementById('canvas');
    // var ctx = canvas.getContext('2d');

    console.log(main);
    console.log(canvas.width, canvas.height);

    var last = 0;
    rAF(function loop(time) {
        last = time;
        rAF(loop);
    });
}

window.addEventListener('load', onLoad);
