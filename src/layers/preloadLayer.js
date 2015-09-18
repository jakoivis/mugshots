
"use strict";

var amplify = require("amplify").amplify;
// var Spinner = require("../components/spinner.js");
var SpinnerWithShadow = require("../components/spinnerWithShadow.js");
var TOPICS = require("../topics.js");

module.exports = PreloadLayer;

/**
 * @param           options
 * @param {string}  options.target          Canvas id
 * @param {number}  [options.width]         Canvas width
 * @param {number}  [options.height]        Canvas height
 * @param {boolean} [options.pointerEvents] Canvas pointer events
 *
 * @listens TOPICS.PRELOAD_COMPLETE
 */
function PreloadLayer(options) {

    var canvas;
    var stage;
    // var spinner;
    // var spinnerShadow;
    // var spinnerShadowMask;
    // var spinnerSettings;
    var spinner;

    function init() {

        initOptions();
        // spinnerSettings = createSpinnerSettings();

        stage = new createjs.Stage(canvas);

        amplify.subscribe(TOPICS.PRELOAD_COMPLETE, removeSpinner);

        createjs.Ticker.setFPS(30);
        createjs.Ticker.on("tick", timerTickHandler);

        spinner = new SpinnerWithShadow();

        stage.addChild(spinner.spinnerGlow);
        stage.addChild(spinner.spinner.container);
        stage.addChild(spinner.spinnerShadow.container);

        spinner.show();
        // showSpinner();
        // showSpinnerShadow();
    }

    // function createSpinnerSettings() {

    //     var x = 200;
    //     var y = 200;
    //     var diameter = 44;
    //     var radius = diameter / 2;
    //     var shadowOffsetY = diameter + 4;

    //     return {
    //         x: x,
    //         y: y,
    //         radius: radius,
    //         diameter: diameter,
    //         shadowX: x,
    //         shadowY: y + shadowOffsetY,

    //         fadeInStart: {
    //             numberOfTicks: 16,
    //             alpha: 0,
    //             outerRadius: 60,
    //             innerRadius: 40,
    //             rotationSpeed: 0.1,
    //             tickWidth: 8,
    //             tickColor: 0xEEEEEE,
    //             tickHighLightColor: 0x444444,
    //             x: radius,
    //             y: radius
    //         },

    //         fadeInEnd: {
    //             alpha: 0.5,
    //             outerRadius: 20,
    //             innerRadius: 15,
    //             rotationSpeed: 0.03,
    //             tickWidth: 4
    //         },

    //         fadeOutEnd: {
    //             alpha: 0,
    //             outerRadius: 60,
    //             innerRadius: 40,
    //             rotationSpeed: 0.1,
    //             tickWidth: 8
    //         }
    //     };
    // }

    function initOptions() {

        canvas = document.getElementById(options.target);

        if(typeof options.pointerEvents !== "undefined" &&
            Boolean(options.pointerEvents) === false) {

            canvas.style["pointer-events"] = "none";
        }

        if(options.width) {

            canvas.width = options.width;

            // spinnerSettings.fadeInStart.x = options.width >> 1;
        }

        if(options.height) {

            canvas.height = options.height;
        }
    }


    function timerTickHandler(event) {

        // spinner.update();
        // spinnerShadow.update();
        // spinnerShadowMask.updateCache();
        // spinnerShadow.container.updateCache();
        spinner.update();
        stage.update(event);
    }

    // function showSpinner() {

    //     spinner = new Spinner(spinnerSettings.fadeInStart);

    //     stage.addChild(spinner.container);
    //     spinner.container.x = spinnerSettings.x;
    //     spinner.container.y = spinnerSettings.y;

    //     createjs.Tween
    //         .get(spinner)
    //         .to(spinnerSettings.fadeInEnd, 1000,
    //             createjs.Ease.bounceOut);
    // }

    // function showSpinnerShadow() {

    //     createGlow();

    //     spinnerShadow = createShadow();
    //     spinnerShadowMask = createShadowMask();

    //     spinnerShadow.container.filters = [new createjs.AlphaMaskFilter(spinnerShadowMask.cacheCanvas)];
    //     spinnerShadow.container.cache(0, 0, spinnerSettings.diameter, spinnerSettings.diameter);

    //     stage.addChild(spinnerShadow.container);


    //     function createGlow() {

    //         var glow = new createjs.Shape();
    //         var r = spinnerSettings.radius;
    //         var x = spinnerSettings.x + r;
    //         var y = spinnerSettings.y + r;
    //         var glowRadius = r + 10;

    //         glow.graphics.beginRadialGradientFill(
    //                 ["rgba(255, 255, 255, 0.5)", "rgba(255, 255, 255, 0)"],
    //                 [0, 1], x, y, 0, x, y, glowRadius)
    //             .drawCircle(x, y, glowRadius);

    //         stage.addChild(glow);
    //     }

    //     function createShadow() {

    //         var spinner = new Spinner(spinnerSettings.fadeInStart);

    //         var container = spinner.container;
    //         container.regY = spinnerSettings.diameter;
    //         container.scaleY = -1;
    //         container.x = spinnerSettings.shadowX;
    //         container.y = spinnerSettings.shadowY;

    //         createjs.Tween
    //             .get(spinner)
    //             .to(spinnerSettings.fadeInEnd, 1000, createjs.Ease.bounceOut);

    //         return spinner;
    //     }

    //     function createShadowMask() {

    //         var mask = new createjs.Shape();
    //         var d = spinnerSettings.diameter;

    //         mask.graphics.beginLinearGradientFill(
    //                 ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.4)"],
    //                 [0, 1], 0, 0, 0, d);

    //         mask.graphics.drawRect(0, 0, d, d);

    //         mask.cache(0, 0, d, d);

    //         stage.addChild(mask);

    //         return mask;
    //     }

    //     // glow.graphics.beginLinearGradientFill(
    //             // ["rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0)"],
    //             // [0, 1], x, y, x, y+d-10);
    //     // glow.graphics.drawRect(x, y, 46, 46);
    // }

    function removeSpinner() {

        // createjs.Tween
        //     .get(spinner)
        //     .to(spinnerSettings.fadeOutEnd, 1000,
        //         createjs.Ease.bounceOut);
    }

    init();

    return this;
}