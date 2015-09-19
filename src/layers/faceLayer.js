
"use strict";

var amplify = require("amplify").amplify;
var Face = require("../components/face/face.js");
var TOPICS = require("../topics.js");

module.exports = FaceLayer;

function FaceLayer(options) {

    var face;
    var canvas;
    var stage;

    function init() {

        canvas = document.getElementById(options.target);

        stage = new createjs.Stage(canvas);

        face = new Face();
        // face.container.scaleX = 0.5;
        // face.container.scaleY = 0.5;
        // stage.addChild(face.container);

        window.addEventListener("resize", resize, false);

        initTopics();
    }

    function resize() {

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        updateGraphics();
    }

    function resizeFacePosition() {

    }

    function initTopics() {

        amplify.subscribe(TOPICS.PRELOAD_ITEM_COMPLETE, onFileComplete);
        amplify.subscribe(TOPICS.PRELOAD_BACKGROUND, switchToBackgroundMode);

        amplify.subscribe(TOPICS.NEXT_BACKGROUND, function() {

            face.stacks.background.next();
            updateGraphics();
        });

        amplify.subscribe(TOPICS.NEXT_NOSE, function() {

            face.stacks.nose.next();
            updateGraphics();
        });

        amplify.subscribe(TOPICS.NEXT_LEFT_EYE, function() {

            face.stacks.lefteye.next();
            updateGraphics();
        });

        amplify.subscribe(TOPICS.NEXT_RIGHT_EYE, function() {

            face.stacks.righteye.next();
            updateGraphics();
        });

        amplify.subscribe(TOPICS.NEXT_MOUTH, function() {

            face.stacks.mouth.next();
            updateGraphics();
        });
    }

    function onFileComplete(item) {

        if(!item.isFailed()) {

            face.createFacePart(item);
        }
    }

    function switchToBackgroundMode() {

        face.setDefaultFaceParts();
        // face.setDefaultPositions();

        resize();

        addLayerClickHandler();
    }

    function randomize() {

        face.setRandomFaceParts();
        face.setRandomPositions();

        updateGraphics();
    }

    function updateGraphics() {

        // stage.removeAllChildren();

        // var stacks = face.stacks;

        // stage.addChild(stacks.background.current().bitmap);
        // stage.addChild(stacks.mouth.current().bitmap);
        // stage.addChild(stacks.nose.current().bitmap);
        // stage.addChild(stacks.lefteye.current().bitmap);
        // stage.addChild(stacks.righteye.current().bitmap);

        // if(debugDrawImageBounds) {

        //     stage.addChild(stacks.background.current().getDebugBounds());
        //     stage.addChild(stacks.mouth.current().getDebugBounds());
        //     stage.addChild(stacks.nose.current().getDebugBounds());
        //     stage.addChild(stacks.lefteye.current().getDebugBounds());
        //     stage.addChild(stacks.righteye.current().getDebugBounds());
        // }

        // if(debugLogImageNames) {

        //     console.log("bg: " + stacks.background.current().name + ", " +
        //                 "mouth: " + stacks.mouth.current().name +  ", " +
        //                 "nose: " + stacks.nose.current().name + ", " +
        //                 "lefteye: " + stacks.lefteye.current().name + ", " +
        //                 "righteye: " + stacks.righteye.current().name);
        // }

        face.update();

        stage.update();
    }

    function addLayerClickHandler() {

        canvas.style.cursor = "pointer";
        canvas.addEventListener("click", randomize);
    }

    init();
}
