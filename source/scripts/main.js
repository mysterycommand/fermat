'use strict';

var now = require('./polyfill/Date.now');
var rAF = require('./polyfill/requestAnimationFrame');

function onLoad(event) {
    console.log(event, now(), rAF);
}

window.addEventListener('load', onLoad);
