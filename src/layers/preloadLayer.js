
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

    var _canvas;
    var _stage;
    var _spinner;
    var _tableShadow;

    function init() {

        _canvas = document.getElementById(options.target);
        _stage = new createjs.Stage(_canvas);
        resizeCanvas();

        _spinner = new SpinnerWithShadow();
        _stage.addChild(_spinner.container);
        _spinner.show();

        _tableShadow = new createjs.Shape();
        _stage.addChild(_tableShadow);

        createjs.Ticker.addEventListener("tick", timerTickHandler);

        window.addEventListener("resize", resize, false);

        amplify.subscribe(TOPICS.PRELOAD_BACKGROUND, preloadBackground);
        amplify.subscribe(TOPICS.PRELOAD_COMPLETE, preloadComplete);

        resize();
        removeCanvasPointerEvents();
    }

    function resize() {

        resizeCanvas();
        resizeTableShadowPosition();
    }

    function resizeCanvas() {

        _canvas.width = window.innerWidth;
        _canvas.height = window.innerHeight;
    }

    function resizeTableShadowPosition() {

        var colors = ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.03)", "rgba(0, 0, 0, 0)"];
        var ratios = [0, 0.03, 1];
        var shadowHeight = 75;
        var shadowWidth = _canvas.width;

        _tableShadow.graphics.clear();
        _tableShadow.graphics.beginLinearGradientFill(colors, ratios, 0, 0, 0, shadowHeight);
        _tableShadow.graphics.drawRect(0, 0, shadowWidth, shadowHeight);

        _tableShadow.y = _canvas.height / 2;
    }

    function timerTickHandler(event) {

        _spinner.update();
        _stage.update(event);
    }

    function removeCanvasPointerEvents() {

        _canvas.style["pointer-events"] = "none";
    }

    function preloadComplete() {

        _spinner.remove(function(){

            window.removeEventListener("resize", resize, false);

            createjs.Ticker.removeEventListener("tick", timerTickHandler);

            _stage.removeAllEventListeners();

            _stage.clear();

            amplify.unsubscribe(TOPICS.PRELOAD_BACKGROUND, preloadBackground);
            amplify.unsubscribe(TOPICS.PRELOAD_COMPLETE, preloadComplete);
        });

    }

    function preloadBackground() {

        _spinner.setToBackgroundMode();
    }

    init();

    return this;
}
