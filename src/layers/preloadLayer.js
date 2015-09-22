
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

    // var _canvas;
    var _stage;
    var _spinner;
    var _tableShadow;

    function init() {

        var canvas = document.getElementById(options.target);
        _stage = new createjs.Stage(canvas);
        resizeCanvas();

        _spinner = new SpinnerWithShadow();
        _stage.addChild(_spinner);
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

        var canvas = _stage.canvas;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function resizeTableShadowPosition() {

        var canvas = _stage.canvas;
        var colors = ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.03)", "rgba(0, 0, 0, 0)"];
        var ratios = [0, 0.03, 1];
        var shadowHeight = 75;
        var shadowWidth = canvas.width;

        _tableShadow.graphics.clear();
        _tableShadow.graphics.beginLinearGradientFill(colors, ratios, 0, 0, 0, shadowHeight);
        _tableShadow.graphics.drawRect(0, 0, shadowWidth, shadowHeight);

        _tableShadow.y = canvas.height / 2;
    }

    function timerTickHandler(event) {

        if(_stage) {

            _spinner.update();
            _stage.update(event);
        }
    }

    function removeCanvasPointerEvents() {

        _stage.canvas.style["pointer-events"] = "none";
    }

    function preloadComplete() {

        _spinner.remove(function(){

            window.removeEventListener("resize", resize, false);

            createjs.Ticker.removeEventListener("tick", timerTickHandler);

            var canvas = _stage.canvas;

            _stage.removeAllEventListeners();
            _stage.clear();
            canvas.parentNode.removeChild(canvas);

            amplify.unsubscribe(TOPICS.PRELOAD_BACKGROUND, preloadBackground);
            amplify.unsubscribe(TOPICS.PRELOAD_COMPLETE, preloadComplete);
        });

    }

    function preloadBackground() {

        createjs.Tween
            .get(_tableShadow)
            .to({alpha: 0}, 1500, createjs.Ease.circOut);

        _spinner.setToBackgroundMode();
    }

    init();

    return this;
}
