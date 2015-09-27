
"use strict";

var BasicLayer = require("./basicLayer.js");
var amplify = require("amplify").amplify;
var Face = require("../components/face/face.js");
var Phone = require("../components/phone.js");
var Topics = require("../topics.js");
var Footer = require("../components/footer.js");

function ApplicationLayer(options) {

    var me = this;
    var face;
    var phone;

    var _footer;

    me.initialize = function() {

        console.log("ApplicationLayer::initialize");
        _footer = new Footer();
        phone = new Phone();

        // initTopics();
    };

    me.onTick = function(event) {

        me.stage.update(event);
    };

    me.onApplicationStart = function() {

        console.log("ApplicationLayer::onApplicationStart");
        me.stage.addChild(phone);
        me.stage.addChild(_footer);
    };

    // function initTopics() {

    //     amplify.subscribe(Topics.NEXT_BACKGROUND, function() {

    //         face.stacks.background.next();
    //         update();
    //     });

    //     amplify.subscribe(Topics.NEXT_NOSE, function() {

    //         face.stacks.nose.next();
    //         update();
    //     });

    //     amplify.subscribe(Topics.NEXT_LEFT_EYE, function() {

    //         face.stacks.lefteye.next();
    //         update();
    //     });

    //     amplify.subscribe(Topics.NEXT_RIGHT_EYE, function() {

    //         face.stacks.righteye.next();
    //         update();
    //     });

    //     amplify.subscribe(Topics.NEXT_MOUTH, function() {

    //         face.stacks.mouth.next();
    //         update();
    //     });
    // }

    me.BasicLayer_constructor(options);
}

createjs.extend(ApplicationLayer, BasicLayer);

module.exports = createjs.promote(ApplicationLayer, "BasicLayer");