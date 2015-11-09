
"use strict";

var BasicLayer = require("../layers/basicLayer.js");
var Background = require("../components/background.js");
var Phone = require("../components/phone.js");
var Footer = require("../components/footer.js");

function ApplicationLayer(options) {

    var me = this;

    var _background;

    me.initialize = function() {

        _background = new Background();
    };

    me.onTick = function(event) {

        me.stage.update(event);
    };

    me.onRequiredFilesComplete = function() {

        me.stage.addChild(_background);
    };

    me.onApplicationStart = function() {

    };

    me.BasicLayer_constructor(options);
}

createjs.extend(ApplicationLayer, BasicLayer);

module.exports = createjs.promote(ApplicationLayer, "BasicLayer");