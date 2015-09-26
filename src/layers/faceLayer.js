
"use strict";

var amplify = require("amplify").amplify;
var Face = require("../components/face/face.js");
var Phone = require("../components/phone.js");
var TOPICS = require("../topics.js");

module.exports = FaceLayer;

function FaceLayer(options) {

    var face;
    var phone;
    var canvas;
    var stage;

    var resources = {
        phone: null
    };

    function init() {

        canvas = document.getElementById(options.target);

        stage = new createjs.Stage(canvas);

        face = new Face();

        window.addEventListener("resize", resize, false);

        initTopics();

        createjs.Ticker.on("tick", tick);
    }

    function tick(event) {
        stage.update(event);
    }

    function resize() {

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        stage.update();
    }

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

        resize();

        phone = new Phone({
            face:face,
            loaderItemPhone: resources.phone
        });

        stage.addChild(phone);

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
        stage.update();
    }

    function addLayerClickHandler() {

        canvas.style.cursor = "pointer";
        canvas.addEventListener("click", randomize);
    }

    init();
}
