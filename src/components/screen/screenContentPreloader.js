
"use strict";

var BasicContainer = require("../../components/basicContainer.js");
var SpinnerWithShadow = require("../../components/preloader/spinnerWithShadow.js");

var ScreenContentPreloader = function(width, height) {

    var me = this;

    var _spinner;

    me.onTick = function() {

        _spinner.update();
    };

    me.show = function() {

        _spinner = new SpinnerWithShadow();

        _spinner.x = width / 2;
        _spinner.y = height / 2;

        me.addChild(_spinner);

        me.addOnTick();

        _spinner.show();
    };

    me.remove = function() {

        _spinner.remove();
    };

    me.BasicContainer_constructor();
};

var proto  = createjs.extend(ScreenContentPreloader, BasicContainer);

module.exports = createjs.promote(ScreenContentPreloader, "BasicContainer");