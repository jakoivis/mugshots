
"use strict";

var BasicLayer = require("./basicLayer.js");
var amplify = require("amplify").amplify;
var Face = require("../components/face/face.js");
var Phone = require("../components/phone.js");
var TOPICS = require("../topics.js");

function FaceLayer(options) {

    var me = this;
    var face;
    var phone;

    var resources = {
        phone: null
    };

    me.initialize = function() {

        face = new Face();

        initTopics();

    }

    me.tick = function(event) {

        me.stage.update(event);
    };

    function initTopics() {

        amplify.subscribe(TOPICS.PRELOAD_ITEM_COMPLETE, onFileComplete);
        amplify.subscribe(TOPICS.PRELOAD_BACKGROUND, switchToBackgroundMode);

        amplify.subscribe(TOPICS.NEXT_BACKGROUND, function() {

            face.stacks.background.next();
            update();
        });

        amplify.subscribe(TOPICS.NEXT_NOSE, function() {

            face.stacks.nose.next();
            update();
        });

        amplify.subscribe(TOPICS.NEXT_LEFT_EYE, function() {

            face.stacks.lefteye.next();
            update();
        });

        amplify.subscribe(TOPICS.NEXT_RIGHT_EYE, function() {

            face.stacks.righteye.next();
            update();
        });

        amplify.subscribe(TOPICS.NEXT_MOUTH, function() {

            face.stacks.mouth.next();
            update();
        });
    }

    function onFileComplete(item) {

        if(!item.isFailed()) {

            if(item.name === "phone") {

                resources.phone = item;

            } else {

                face.createFacePart(item);
            }
        }
    }

    function switchToBackgroundMode() {

        phone = new Phone({
            face:face,
            loaderItemPhone: resources.phone
        });

        me.stage.addChild(phone);

        update();

        addLayerClickHandler();
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

createjs.extend(FaceLayer, BasicLayer);

module.exports = createjs.promote(FaceLayer, "BasicLayer");