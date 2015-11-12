
"use strict";

var BasicLayer = require("../layers/basicLayer.js");
var Background = require("../components/background.js");
var Phone = require("../components/phone.js");
var Footer = require("../components/footer.js");
var ScreenIntro = require("../components/screen/screenIntro.js");

function ApplicationLayer(options) {

    var me = this;

    var _phone;
    var _footer;

    me.initialize = function() {

        _phone = new Phone();
        // _footer = new Footer();
    };

    me.onTick = function(event) {

        me.stage.update(event);
    };

    me.onRequiredFilesComplete = function() {

        var screenIntro = new ScreenIntro();
        me.stage.addChild(screenIntro);
        screenIntro.show();
        // me.stage.addChild(_phone);
        // me.stage.addChild(_footer);
    };

    me.onApplicationStart = function() {

        // _phone.start();
    };

    me.BasicLayer_constructor(options);
}

createjs.extend(ApplicationLayer, BasicLayer);

module.exports = createjs.promote(ApplicationLayer, "BasicLayer");