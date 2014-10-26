'use strict';

var rAF = require('./polyfill/requestAnimationFrame');
var hex = require('./util/randomHex');

function onLoad(/*event*/) {

    var main = document.getElementById('main');
    var canvas = document.getElementById('canvas');
    var div = document.getElementById('div');
    var ctx = canvas.getContext('2d');

    var w = canvas.width = main.offsetWidth;
    var h = canvas.height = main.offsetHeight;

    var hw = w / 2;
    var hh = h / 2;

    var p = 10;
    var pp = p * 2;

    var sqrt5 = Math.sqrt(5);
    var phi = (1 + sqrt5) / 2;
    var π = Math.pi;
    var ππ = π * 2;

    var last = 0;
    var dt;

    function diamond(hw, x, y) {
        var hh = hw * 2;
        var h = hh * 2;

        ctx.save();

        ctx.translate(x, y);

        ctx.lineWidth = 5;
        ctx.strokeStyle = hex();
        ctx.fillStyle = hex();

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-hw, -hh);
        ctx.lineTo(0, -h);
        ctx.lineTo(hw, -hh);
        ctx.lineTo(0, 0);
        ctx.closePath();

        ctx.stroke();
        ctx.fill();

        ctx.restore();
    }

    function init() {
        ctx.fillStyle = hex();
        ctx.fillRect(p, p, canvas.width - pp, canvas.height - pp);

        diamond(12, hw, hh);

        console.log(canvas.width, canvas.height);
        console.log(ctx);
    }

    function loop(time) {
        /* jshint bitwise: false */
        dt = time - last;
        div.innerText = dt|0;
        last = time;
        rAF(loop);
    }

    init();
    rAF(loop);
}

window.addEventListener('load', onLoad);
