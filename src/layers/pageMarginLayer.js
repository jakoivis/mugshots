
"use strict";

var amplify = require("amplify").amplify;
var TOPICS = require("../topics.js");

var PageMarginLayer = function(options) {

    var _stage;
    var _canvas;
    var _topMargin;
    var _bottomMargin;
    var _marginsVisible = false;

    function init() {

        _canvas = document.getElementById(options.target);
        _stage = new createjs.Stage(_canvas);
        resizeCanvas();

        _topMargin = new createjs.Shape();
        _stage.addChild(_topMargin);

        _bottomMargin = new createjs.Shape();
        _stage.addChild(_bottomMargin);

        amplify.subscribe(TOPICS.PRELOAD_BACKGROUND, showMargins);

        window.addEventListener("resize", resize, false);

        resize();
    }

    function showMargins() {

        _marginsVisible = true;

        resize();

        _topMargin.y = -_topMargin.height;
        _bottomMargin.y = _canvas.height;

        createjs.Tween
            .get(_topMargin)
            .to({y: 0}, 1000, createjs.Ease.circInOut);

        createjs.Tween
            .get(_bottomMargin)
            .to({y: _canvas.height + _bottomMargin.height}, 1000, createjs.Ease.circInOut);
    }

    function resizeCanvas() {

        _canvas.width = window.innerWidth;
        _canvas.height = window.innerHeight;
    }

    function resize() {

        resizeCanvas();

        if(_marginsVisible) {

            resizeTopMargin();
            resizeBottomMargin();
            _stage.update();
        }
    }

    function resizeTopMargin() {

        var colors = ["#444444", "#555555"];
        var ratios = [0, 1];
        var marginHeight = 50;
        var marginWidth = _canvas.width;

        _topMargin.graphics.clear();
        _topMargin.graphics.beginLinearGradientFill(colors, ratios, 0, 0, 0, marginHeight);
        _topMargin.graphics.drawRect(0, 0, marginWidth, marginHeight);
        _topMargin.height = marginHeight;
    }

    function resizeBottomMargin() {

        var colors = ["#444444", "#555555"];
        var ratios = [0, 1];
        var marginHeight = 50;
        var marginWidth = _canvas.width;

        _bottomMargin.graphics.clear();
        _bottomMargin.graphics.beginLinearGradientFill(colors, ratios, 0, 0, 0, marginHeight);
        _bottomMargin.graphics.drawRect(0, 0, marginWidth, marginHeight);
        _bottomMargin.height = marginHeight;
    }

    init();
};

module.exports = PageMarginLayer;
