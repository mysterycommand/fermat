'use strict';

var now = require('./polyfill/Date.now');
var rAF = require('./polyfill/requestAnimationFrame')(window);

function onLoad(event) {
    console.log(now(), event);

    var last = 0;

    rAF(function loop(time) {
        // console.log(time - last);
        last = time;
        rAF(loop);
    });
}

window.addEventListener('load', onLoad);
