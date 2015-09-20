
"use strict";

var amplify = require("amplify").amplify;
var TOPICS = require("../topics.js");

var PageMarginLayer = function(options) {

    var _stage;
    var _canvas;
    var _topMargin;
    var _bottomMargin;

    function init() {

        _canvas = document.getElementById(options.target);
        _stage = new createjs.Stage(_canvas);
        resizeCanvas();

        _topMargin = new createjs.Shape();
        _stage.addChild(_topMargin);

        _bottomMargin = new createjs.Shape();
        _stage.addChild(_bottomMargin);

        window.addEventListener("resize", resize, false);

        resize();
    }

    function resizeCanvas() {

        _canvas.width = window.innerWidth;
        _canvas.height = window.innerHeight;
    }

    function resize() {

        resizeCanvas();
        resizeTopMargin();
        resizeBottomMargin();

        _stage.update();
    }

    function resizeTopMargin() {

        var colors = ["#444444", "#555555"];
        var ratios = [0, 1];
        var marginHeight = 50;
        var marginWidth = _canvas.width;

        _topMargin.graphics.clear();
        _topMargin.graphics.beginLinearGradientFill(colors, ratios, 0, 0, 0, marginHeight);
        _topMargin.graphics.drawRect(0, 0, marginWidth, marginHeight);
    }

    function resizeBottomMargin() {

        var colors = ["#444444", "#555555"];
        var ratios = [0, 1];
        var marginHeight = 50;
        var marginWidth = _canvas.width;

        _bottomMargin.graphics.clear();
        _bottomMargin.graphics.beginLinearGradientFill(colors, ratios, 0, 0, 0, marginHeight);
        _bottomMargin.graphics.drawRect(0, 0, marginWidth, marginHeight);

        _bottomMargin.y = _canvas.height - marginHeight;
    }

    init();
};

module.exports = PageMarginLayer;
