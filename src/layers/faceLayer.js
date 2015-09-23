
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
    }

    function resize() {

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        updateGraphics();
    }

    function initTopics() {

        amplify.subscribe(TOPICS.PRELOAD_ITEM_COMPLETE, onFileComplete);
        amplify.subscribe(TOPICS.PRELOAD_BACKGROUND, switchToBackgroundMode);

        amplify.subscribe(TOPICS.NEXT_BACKGROUND, function() {

            face.stacks.background.next();
            updateFace();
        });

        amplify.subscribe(TOPICS.NEXT_NOSE, function() {

            face.stacks.nose.next();
            updateFace();
        });

        amplify.subscribe(TOPICS.NEXT_LEFT_EYE, function() {

            face.stacks.lefteye.next();
            updateFace();
        });

        amplify.subscribe(TOPICS.NEXT_RIGHT_EYE, function() {

            face.stacks.righteye.next();
            updateFace();
        });

        amplify.subscribe(TOPICS.NEXT_MOUTH, function() {

            face.stacks.mouth.next();
            updateFace();
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

        face.setDefaultFaceParts();
        // face.scaleX = 0.9;
        // face.scaleY = 0.9;
        face.update();

        phone = new Phone({
            face:face,
            loaderItemPhone: resources.phone
        });

        stage.addChild(phone);

        updateFace();

        addLayerClickHandler();
    }

    function randomize() {

        face.setRandomFaceParts();
        face.setRandomPositions();

        updateFace();
    }

    function updateGraphics() {

        stage.update();
    }

    function updateFace() {

        face.update();
        face.updateCache();
        stage.update();
    }

    function addLayerClickHandler() {

        canvas.style.cursor = "pointer";
        canvas.addEventListener("click", randomize);
    }

    init();
}
