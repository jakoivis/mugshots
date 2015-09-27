"use strict";

var ScreenFlash = function(width, height) {

    var me = this;

    function init() {

        me.alpha = 0;

        me.graphics.setStrokeStyle(1);
        me.graphics.beginFill("white");
        me.graphics.drawRect(0, 0, width, height);
    }

    me.flash = function() {

        me.alpha = 1;

        var easing = createjs.Ease.sineOut;
        var duration = 250;

        createjs.Tween
            .get(me, {override:true})
            .to({alpha: 0}, duration, easing);
    };

    me.Shape_constructor();

    init();
};

createjs.extend(ScreenFlash, createjs.Shape);

module.exports = createjs.promote(ScreenFlash, "Shape");
