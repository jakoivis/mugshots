
"use strict";

var amplify = require("amplify").amplify;
var TOPICS = require("../topics.js");
var SpinnerWithShadow = require("../components/preloader/spinnerWithShadow.js");

module.exports = PreloadLayer;

/**
 * @param {string}  options.target          Canvas id
 *
 * @listens TOPICS.PRELOAD_COMPLETE
 */
function PreloadLayer(options) {

    var canvas;
    var stage;
    var spinner;
    var tableShadow;

    function init() {

        canvas = document.getElementById(options.target);
        stage = new createjs.Stage(canvas);

        spinner = new SpinnerWithShadow();
        stage.addChild(spinner.container);
        spinner.show();

        tableShadow = new createjs.Shape();
        stage.addChild(tableShadow);

        createjs.Ticker.setFPS(30);
        createjs.Ticker.on("tick", timerTickHandler);
        window.addEventListener("resize", resize, false);
        amplify.subscribe(TOPICS.PRELOAD_COMPLETE, spinner.remove);

        resize();
        removeCanvasPointerEvents();
    }

    function resize() {

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        resizeSpinnerPosition();
        resizeTableShadowPosition();
    }

    function resizeSpinnerPosition() {

        spinner.container.x = canvas.width / 2;
        spinner.container.y = canvas.height / 2;
    }

    function resizeTableShadowPosition() {

        var colors = ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.03)", "rgba(0, 0, 0, 0)"];
        var ratios = [0, 0.03, 1];
        var shadowHeight = 75;
        var shadowWidth = canvas.width;

        tableShadow.graphics.clear();
        tableShadow.graphics.beginLinearGradientFill(colors, ratios, 0, 0, 0, shadowHeight);
        tableShadow.graphics.drawRect(0, 0, shadowWidth, shadowHeight);

        tableShadow.y = canvas.height / 2;
    }

    function timerTickHandler(event) {

        spinner.update();
        stage.update(event);
    }


    function removeCanvasPointerEvents() {

        canvas.style["pointer-events"] = "none";
    }

    init();

    return this;
}