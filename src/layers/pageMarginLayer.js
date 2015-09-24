
"use strict";

var amplify = require("amplify").amplify;
var TOPICS = require("../topics.js");

var PageMarginLayer = function(options) {

    var _stage;
    var _canvas;
    var _bottomMargin;
    var _marginsVisible = false;

    function init() {

        _canvas = document.getElementById(options.target);
        _stage = new createjs.Stage(_canvas);
        resizeCanvas();

        _bottomMargin = new createjs.Shape();
        _stage.addChild(_bottomMargin);

        amplify.subscribe(TOPICS.PRELOAD_BACKGROUND, showMargins);

        createjs.Ticker.on("tick", timerTickHandler);

        window.addEventListener("resize", resize, false);

        resize();
        removeCanvasPointerEvents();
    }

    function timerTickHandler(event) {

        _stage.update(event);
    }

    function showMargins() {

        _bottomMargin.y = _canvas.height;

        _marginsVisible = true;

        resize();

        createjs.Tween
            .get(_bottomMargin)
            .to({y: _canvas.height - _bottomMargin.height}, 1000, createjs.Ease.circInOut);
    }

    function calculateMarginHeights() {

        _bottomMargin.height = 50;
    }

    function resizeCanvas() {

        _canvas.width = window.innerWidth;
        _canvas.height = window.innerHeight;
    }

    function resize() {

        resizeCanvas();
        calculateMarginHeights();

        if(_marginsVisible) {

            resizeBottomMargin();
            _stage.update();
        }
    }

    function resizeBottomMargin() {

        var colors = ["#444444", "#555555"];
        var ratios = [0, 1];
        var marginHeight = _bottomMargin.height;
        var marginWidth = _canvas.width;

        _bottomMargin.graphics.clear();
        _bottomMargin.graphics.beginLinearGradientFill(colors, ratios, 0, 0, 0, marginHeight);
        _bottomMargin.graphics.drawRect(0, 0, marginWidth, marginHeight);
        _bottomMargin.height = marginHeight;
    }

    function removeCanvasPointerEvents() {

        _canvas.style["pointer-events"] = "none";
    }

    init();
};

module.exports = PageMarginLayer;
