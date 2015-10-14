
"use strict";

var BasicLayer = require("../layers/basicLayer.js");
var Background = require("../components/background/background.js");
var Phone = require("../components/phone/phone.js");
var Footer = require("../components/footer.js");

function ApplicationLayer(options) {

    var me = this;

    // var _background;
    var _phone;
    var _footer;

    me.initialize = function() {

        // _background = new Background();
        _footer = new Footer();
        _phone = new Phone();
    };

    me.onTick = function(event) {

        me.stage.update(event);
    };

    me.onApplicationStart = function() {

        // me.stage.addChild(_background);
        me.stage.addChild(_phone);
        // me.stage.addChild(_footer);
    };

    me.BasicLayer_constructor(options);
}

createjs.extend(ApplicationLayer, BasicLayer);

module.exports = createjs.promote(ApplicationLayer, "BasicLayer");