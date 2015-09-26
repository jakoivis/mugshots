
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

    var resources = {
        phone: null
    };

    me.initialize = function() {

        face = new Face();

        initTopics();
    };

    me.onTick = function(event) {

        me.stage.update(event);
    };

    me.onFileLoadComplete = function(item) {

        if(!item.isFailed()) {

            if(item.name === "phone") {

                resources.phone = item;
            }
        }
    };

    me.onApplicationStart = function() {

        phone = new Phone({
            face:face,
            loaderItemPhone: resources.phone
        });

        me.stage.addChild(phone);

        _footer = new Footer();
        me.stage.addChild(_footer);

        update();

        addLayerClickHandler();
    };

    function initTopics() {

        amplify.subscribe(Topics.NEXT_BACKGROUND, function() {

            face.stacks.background.next();
            update();
        });

        amplify.subscribe(Topics.NEXT_NOSE, function() {

            face.stacks.nose.next();
            update();
        });

        amplify.subscribe(Topics.NEXT_LEFT_EYE, function() {

            face.stacks.lefteye.next();
            update();
        });

        amplify.subscribe(Topics.NEXT_RIGHT_EYE, function() {

            face.stacks.righteye.next();
            update();
        });

        amplify.subscribe(Topics.NEXT_MOUTH, function() {

            face.stacks.mouth.next();
            update();
        });
    }

    function randomize() {

        face.setRandomFaceParts();
        face.setRandomPositions();

        update();
    }

    function update() {

        phone.update();
        me.stage.update();
    }

    function addLayerClickHandler() {

        me.canvas.style.cursor = "pointer";
        me.canvas.addEventListener("click", randomize);
    }

    me.BasicLayer_constructor(options);
}

createjs.extend(ApplicationLayer, BasicLayer);

module.exports = createjs.promote(ApplicationLayer, "BasicLayer");