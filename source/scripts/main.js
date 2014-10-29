'use strict';

require('./polyfill/Function.prototype.name');
require('./polyfill/window.requestAnimationFrame');
require('./polyfill/window.cancelAnimationFrame');

var rgba = require('./util/random').rgba;
var toRad = require('./util/toRadians');

function onLoad(/*event*/) {

    var main = document.getElementById('main');
    var canvas = document.getElementById('canvas');

    var ctx = canvas.getContext('2d');

    var w = canvas.width = main.offsetWidth; // 1920; //
    var h = canvas.height = main.offsetHeight; // 1080; //

    var hw = w / 2;
    var hh = h / 2;
    var d = Math.sqrt((hw * hw) + (hh * hh));

    var p = 0;
    var pp = p * 2;

    var sqrt5 = Math.sqrt(5);
    var phi = (1 + sqrt5) / 2;
    var ƒ = 1 / (phi * phi);
    var π = Math.PI;
    var ππ = π * 2;
    var g = ππ * ƒ;

    // var count = 0;
    // var deg = count;
    // var time = 0;
    // var dt;

    // var compositeOperations = [
    //     'source-over',
    //     'source-in',
    //     'source-out',
    //     'source-atop',
    //     'destination-over',
    //     'destination-in',
    //     'destination-out',
    //     'destination-atop',
    //     'lighter',
    //     'copy',
    //     'xor',
    //     'multiply',
    //     'screen',
    //     'overlay',
    //     'darken',
    //     'lighten',
    //     'color-dodge',
    //     'color-burn',
    //     'hard-light',
    //     'soft-light',
    //     'difference',
    //     'exclusion',
    //     'hue',
    //     'saturation',
    //     'color',
    //     'luminosity'
    // ];

    // function randomOp() {
    //     /* jshint bitwise: false */
    //     var i = (Math.random() * compositeOperations.length)|0;
    //     return compositeOperations[i];
    // }

    function grad(cx, cy) {
        var gr = Math.sqrt((hw * hw) + (hh * hh));
        var gradient = ctx.createRadialGradient(cx, cy, gr, cx, cy, 0);
        gradient.addColorStop(0, rgba());
        gradient.addColorStop(1, rgba());
        return gradient;
    }

    function diamond(cx, cy, hw) {
        var hh = hw * 2;

        ctx.save();
        ctx.translate(cx, cy);

        ctx.lineWidth = hw / 2;
        // ctx.strokeStyle = hex();
        // ctx.fillStyle = rgba();

        ctx.beginPath();
        ctx.moveTo(0, hh);
        ctx.lineTo(-hw, 0);
        ctx.lineTo(0, -hh);
        ctx.lineTo(hw, 0);
        ctx.lineTo(0, hh);
        ctx.closePath();

        // ctx.stroke();
        // ctx.fill();

        ctx.restore();
    }

    function spiral(cx, cy, angle, scale, numFlorets, maxR) {
        var hs = scale / 2;
        // var op = randomOp();

        var r = 0;
        var theta;
        var sqrtI;
        var dhw;

        var i = 0;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.fillStyle = grad(0, 0);
        // ctx.globalCompositeOperation = op;

        while (i < numFlorets && r < maxR) {
            sqrtI = Math.sqrt(i);
            r = scale * sqrtI;
            theta = angle + i * g;

            ctx.save();
            ctx.rotate(theta);
            ctx.translate(0, r);

            dhw = hs - ((hs / sqrtI) * 0.25); // Math.min((i / 5) * 6, 6);
            diamond(0, -(dhw * 0.25), dhw);

            ++i;

            ctx.restore();
            ctx.fill();
        }

        ctx.restore();
    }

    function draw(deg) {
        ctx.fillStyle = grad(hw, hh);
        ctx.fillRect(p, p, canvas.width - pp, canvas.height - pp);

        ctx.save();
        ctx.translate(hw, hh);

        spiral(0, 0, (toRad(deg) * 1), 125, Infinity, d);
        spiral(0, 0, (toRad(deg) * 5), 50, Infinity, d);
        spiral(0, 0, (toRad(deg) * 10), 25, Infinity, d);
        spiral(0, 0, (toRad(deg) * 25), 5, Infinity, d);

        ctx.restore();

        // var data = canvas.toDataURL().toString();
        // button.href = data.replace('image/png;', [
        //     'application/octet-stream;',
        //     'headers=Content-Disposition%3A%20attachment%3B%20spiral.png;'
        // ].join(''));
    }

    function onClickMain(event) {
        /* jshint bitwise: false */
        event.preventDefault();
        draw((Math.random() * 360)|0);
    }

    function init() {
        main.addEventListener('click', onClickMain);
    }

    // function loop(now) {
    //     /* jshint bitwise: false, expr: true */
    //     dt = now - (time || now);
    //     time = now;

    //     console.log(1000 / dt);

    //     count = (++count % 360);
    //     deg = count;
    //     draw(deg);
    //     rAF(loop);
    // }

    init();
    // rAF(loop);
}

window.addEventListener('load', onLoad);
