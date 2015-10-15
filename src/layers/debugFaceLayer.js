
"use strict";

var BasicLayer = require("../layers/basicLayer.js");
var Face = require("../components/Face.js");

var amplify = require("amplify").amplify;
var Topics = require("../topics.js");

function ApplicationLayer(options) {

    var me = this;

    var face;

    me.initialize = function() {

        face = new Face();

        initTopics();
    };

    me.onTick = function(event) {

        me.stage.update(event);
    };

    me.onApplicationStart = function() {

        addClickHandler();

        face.x = me.stageWidth/2;
        face.y = me.stageHeight/2;

        face.update();

        me.stage.addChild(face);
    };

    function addClickHandler() {
        face.on("click", function() {
            face.setRandomFaceParts();
            face.setRandomPositions();
            face.update();
        });
    }

    function initTopics() {

        amplify.subscribe(Topics.NEXT_BACKGROUND, function() {

            face.stacks.background.next();
            face.setRandomPositions();
            face.update();
        });

        amplify.subscribe(Topics.NEXT_NOSE, function() {

            face.stacks.nose.next();
            face.setRandomPositions();
            face.update();
        });

        amplify.subscribe(Topics.NEXT_LEFT_EYE, function() {

            face.stacks.lefteye.next();
            face.setRandomPositions();
            face.update();
        });

        amplify.subscribe(Topics.NEXT_RIGHT_EYE, function() {

            face.stacks.righteye.next();
            face.setRandomPositions();
            face.update();
        });

        amplify.subscribe(Topics.NEXT_MOUTH, function() {

            face.stacks.mouth.next();
            face.setRandomPositions();
            face.update();
        });

        amplify.subscribe(Topics.RANDOM_POSITIONS, function() {

            face.setRandomPositions();
            face.update();
        });
    }

    me.BasicLayer_constructor(options);
}

createjs.extend(ApplicationLayer, BasicLayer);

module.exports = createjs.promote(ApplicationLayer, "BasicLayer");