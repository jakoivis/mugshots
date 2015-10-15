"use strict";

var ScreenBackground = function(width, height) {

    var me = this;

    function init() {

        me.graphics.beginFill("#e9ecf1");
        me.graphics.drawRect(0, 0, width, height);
    }

    me.Shape_constructor();

    init();
};

createjs.extend(ScreenBackground, createjs.Shape);

module.exports = createjs.promote(ScreenBackground, "Shape");