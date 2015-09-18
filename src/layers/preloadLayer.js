
"use strict";

var amplify = require("amplify").amplify;
var TOPICS = require("../topics.js");
var SpinnerWithShadow = require("../components/preloader/spinnerWithShadow.js");

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
    var spinner;
    var tableShadow;

    function init() {

        initOptions();

        stage = new createjs.Stage(canvas);

        spinner = new SpinnerWithShadow();
        var container = spinner.container;
        container.x = 100;
        container.y = 100;

        tableShadow = createTableShadow();
        tableShadow.y = 144;

        stage.addChild(container);
        stage.addChild(tableShadow);

        spinner.show();

        amplify.subscribe(TOPICS.PRELOAD_COMPLETE, spinner.remove);

        createjs.Ticker.setFPS(30);
        createjs.Ticker.on("tick", timerTickHandler);
    }

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

        spinner.update();
        stage.update(event);
    }

    function createTableShadow() {

        var shadow = new createjs.Shape();
        var graphics = shadow.graphics;
        var colors = ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.03)", "rgba(0, 0, 0, 0)"];
        var ratios = [0, 0.03, 1];
        var shadowHeight = 75;
        var shadowWidth = 500;

        graphics.beginLinearGradientFill(colors, ratios, 0, 0, 0, shadowHeight);
        graphics.drawRect(0, 0, shadowWidth, shadowHeight);

        return shadow;
    }

    init();

    return this;
}