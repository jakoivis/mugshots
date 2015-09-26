
"use strict";

var BasicContainer = require("./basicContainer.js");

var Footer = function(options) {

    var me = this;

    var _background;

    var tempFooterBGHeight = 50;

    me.addedToStage = function() {

        _background = new createjs.Shape();

        me.addChild(_background);
    };

    me.onResize = function() {

        resizeBackground();

        _background.y = me.stageHeight - tempFooterBGHeight;
    };

    function resizeBackground() {

        var colors = ["#444444", "#555555"];
        var ratios = [0, 1];
        var graphics = _background.graphics;
        var height = tempFooterBGHeight;

        graphics.clear();
        graphics.beginLinearGradientFill(colors, ratios, 0, 0, 0, height);
        graphics.drawRect(0, 0, me.stageWidth, height);
    }

    me.BasicContainer_constructor();
};

createjs.extend(Footer, BasicContainer);

module.exports = createjs.promote(Footer, "BasicContainer");