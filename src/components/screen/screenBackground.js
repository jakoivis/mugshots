"use strict";

var ColorUtil = require("../../utils/colorUtil.js");

var ScreenBackground = function(width, height) {

    var me = this;

    var black = 0x111111;
    var white = 0xe9ecf1;

    function init() {

        me.graphics.beginFill(black);
        me.graphics.drawRect(0, 0, width, height);
    }

    me.fadeIn = function() {

        me.alpha = 0;

        return new Promise(function(resolve) {

            var easing = createjs.Ease.sineInOut;
            var duration = 2000;

            createjs.Tween
                .get(me)
                .to({alpha:1}, duration, easing)
                .call(resolve);
        });
    };

    me.fadeToWhite = function() {

        return new Promise(function(resolve) {

            var transition = {position: 0};
            var easing = createjs.Ease.sineInOut;
            var duration = 700;

            createjs.Tween
                .get(transition)
                .to({position:100}, duration, easing)
                .call(resolve)
                .on("change", function() {

                    var color = ColorUtil.getRGBFromGradient(black, white, transition.position);

                    me.graphics.clear();
                    me.graphics.beginFill(color);
                    me.graphics.drawRect(0, 0, width, height);
                });
        });
    };

    me.Shape_constructor();

    init();
};

createjs.extend(ScreenBackground, createjs.Shape);

module.exports = createjs.promote(ScreenBackground, "Shape");