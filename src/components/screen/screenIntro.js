
"use strict";

var BasicContainer = require("../../components/basicContainer.js");
var TweenUtil = require("../../utils/tweenUtil.js");

var ScreenIntro = function() {

    var me = this;
    var text1;
    var text21;
    var text22;
    var text31;
    var text32;

    me.onTick = function() {

        // text1.updateCache();
    };

    me.show = function() {

        me.addOnTick();

        var black = "#333333";

        var container = new createjs.Container();
        container.scaleX = container.scaleY = 0.5;
        var container2 = new createjs.Container();
        var container3 = new createjs.Container();
        var f = 1;

        text1 = createText(50*f, black, "MUGSHOTS");
        text21 = createText(240*f, black, "TAB");
        text22 = createText(120*f, black, "SCREEN");
        text31 = createText(295*f, black, "TO TAKE A");
        text32 = createText(365*f, black, "PICTURE");

        container2.rotation = 90;
        container2.x = 355*f;
        container2.y = 60*f;
        text22.y = 220*f;
        container3.x = 260*f;
        container3.y = -102*f;
        text32.y = 190*f;

        me.addChild(container);
        container.addChild(text1);
        container.addChild(container2);
        container.addChild(container3);
        container2.addChild(text21);
        container2.addChild(text22);
        container3.addChild(text31);
        container3.addChild(text32);

        text1.alpha = 0;
        text21.alpha = 0;
        text22.alpha = 0;
        text31.alpha = 0;
        text32.alpha = 0;

        container.y = 300;
        container.x = 300;
        container.scaleX = 2;
        container.scaleY = 2;
        container.rotation = 90;

        text21.rotation = 45;
        text22.rotation = 45;
        text31.rotation = -45;
        text32.rotation = -45;

        var duration = 1000;
        var wait = 500;
        // var easing = createjs.Ease.sineInOut;
        var easing = createjs.Ease.backInOut;

        TweenUtil.tween(text1, {alpha:1}, duration, easing);

        return TweenUtil.tween(container, {y:100}, duration, easing)

            .then(function() {

                TweenUtil.tween(container, {rotation:0, x: 75, scaleY: 1, scaleX: 1}, duration, easing, wait);
                TweenUtil.tween(text21, {alpha:1, rotation: 0}, duration, easing, wait);
                return TweenUtil.tween(text22, {alpha:1, rotation: 0}, duration, easing, wait+200);
            })

            .then(function() {

                TweenUtil.tween(container, {rotation: 90, x: 300, y: 20, scaleY: 0.41, scaleX: 0.41}, duration, easing, wait);
                TweenUtil.tween(text31, {alpha:1, rotation: 0}, duration, easing, wait);
                return TweenUtil.tween(text32, {alpha:1, rotation: 0}, duration, easing, wait+200);
            })

            .then(function() {

                // TweenUtil.tween(container, {rotation: 20}, duration*2, easing);
                TweenUtil.tween(text32, {alpha:0, rotation: 20}, duration, easing, wait);
                TweenUtil.tween(text31, {alpha:0, rotation: 20}, duration, easing, wait+100);
                TweenUtil.tween(text22, {alpha:0, rotation: 20}, duration, easing, wait+200);
                TweenUtil.tween(text21, {alpha:0, rotation: 20}, duration, easing, wait+300);
                return TweenUtil.tween(text1, {alpha:0, rotation: 20}, duration, easing, wait+300);
            });


        // var blurFilter = new createjs.BlurFilter(0, 0, 1);
        // text.filters = [blurFilter];

        // text.cache(-50, -50, text.getMeasuredWidth()+50, text.getMeasuredHeight()+50);



        // createjs.Tween
        //     .get(text)
        //     .to({y:300}, 500, createjs.Ease.sineInOut);

        // createjs.Tween
        //     .get(blurFilter)
        //     .to({blurY:50, scaleY:3}, 250, createjs.Ease.sineInOut)
        //     .to({blurY:0, scaleY: 3}, 250, createjs.Ease.sineInOut);

        // createjs.Tween
        //     .get(text)
        //     .to({rotation: -90}, 1000, createjs.Ease.sineInOut);

        // createjs.Tween
        //     .get(text)
        //     .to({y: text.getMeasuredWidth()}, 500, createjs.Ease.sineInOut);
    };

    function createText(fontSize, color, value) {

        var text = new createjs.Text();
        text.scaleX = 0.8;
        text.font = fontSize + "px Archivo Black";
        text.color = color;
        text.text = value;

        return text;
    }

    me.BasicContainer_constructor();
};

var proto  = createjs.extend(ScreenIntro, BasicContainer);

module.exports = createjs.promote(ScreenIntro, "BasicContainer");