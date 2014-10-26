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
    var ƒ = 1 / (phi * phi);
    var π = Math.PI;
    var ππ = π * 2;
    var g = ππ * ƒ;

    var last = 0;
    var dt;

    function diamond(cx, cy, hw) {
        var hh = hw * 2;

        ctx.save();
        ctx.translate(cx, cy);

        ctx.lineWidth = hw / 2;
        ctx.strokeStyle = hex();
        ctx.fillStyle = hex();

        ctx.beginPath();
        ctx.moveTo(0, hh);
        ctx.lineTo(-hw, 0);
        ctx.lineTo(0, -hh);
        ctx.lineTo(hw, 0);
        ctx.lineTo(0, hh);
        ctx.closePath();

        ctx.stroke();
        ctx.fill();

        ctx.restore();
    }

    function spiral(cx, cy, scale, numFlorets) {
        var hs = scale / 2;

        var r;
        var theta;
        var sqrtI;
        var dhw;

        ctx.save();
        ctx.translate(cx, cy);

        for (var i = 1; i < numFlorets; ++i) {
            sqrtI = Math.sqrt(i);
            r = scale * sqrtI;
            theta = i * g;

            ctx.save();
            ctx.rotate(theta);
            ctx.translate(0, r);

            dhw = hs - (hs / sqrtI); // Math.min((i / 5) * 6, 6);
            diamond(0, -dhw, dhw);
            ctx.restore();
        }

        ctx.restore();
    }

    function init() {
        ctx.fillStyle = hex();
        ctx.fillRect(p, p, canvas.width - pp, canvas.height - pp);

        ctx.save();
        ctx.translate(hw, hh);

        spiral(0, 0, 10, 1500);

        ctx.restore();

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
