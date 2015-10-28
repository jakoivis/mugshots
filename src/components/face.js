
"use strict";

var BasicContainer = require("../components/basicContainer.js");
var FacePartStack = require("../components/face/facePartStack.js");
var FacePart = require("../components/face/facePart.js");
var FacePartPositioningUtil = require("../components/face/facePartPositioningUtil.js");
var FacePartSettings = require("../components/face/facePartSettings.js");

function Face() {

    var me = this;

    var stacks = {
        various: new FacePartStack(),
        background: new FacePartStack(),
        lefteye: new FacePartStack(),
        righteye: new FacePartStack(),
        nose: new FacePartStack(),
        mouth: new FacePartStack(),
        chin: new FacePartStack()
    };

    Object.defineProperty(this, "stacks", {

        get: function() { return stacks; }
    });

    Object.defineProperty(this, "width", {

        get: function() {
            return stacks.background.current().bitmap.image.width; }
    });

    Object.defineProperty(this, "height", {

        get: function() { return stacks.background.current().bitmap.image.height; }
    });

    me.onFileLoadComplete = function(imageLoaderItem) {

        createFacePart(imageLoaderItem);
    };

    me.getAcceptedResources = function() {

        return {
            groupName: ["background", "chin", "nose", "lefteye", "righteye", "mouth"]
        };
    };

    me.initialize = function() {

        me.setDefaultFaceParts();
    };

    me.onApplicationStart = function() {

        me.regX = me.width / 2;
        me.regY = me.height / 2;
    };

    me.onMouseMove = function() {

        // var mouseX = me.stage.mouseX;
        // var width = me.stageWidth;
        // var originX = width / 2;
        // var distanceX = originX - mouseX;
        // var rotation = distanceX * 0.01;
        // var offset = rotation * 10;
        // var inversedRotation = rotation *-1;
        // var inversedOffset = offset *-1;

        // _scaleContainer.rotation = rotation;
        // _scaleContainer.x = offset;

        // _screen.face.rotation = inversedRotation;
        // // _screen.face.x = inversedOffset;
        // _reflection.glow.rotation = inversedRotation;
    };

    me.update = function() {

        if(!me.isAddedToStage) {
            return;
        }

        me.removeAllChildren();

        me.addChild(stacks.background.current().bitmap);
        me.addChild(stacks.mouth.current().bitmap);
        me.addChild(stacks.nose.current().bitmap);
        me.addChild(stacks.lefteye.current().bitmap);
        me.addChild(stacks.righteye.current().bitmap);

        if(FacePartSettings.DEBUG_SHOW_BOUNDS) {

            me.addChild(stacks.background.current().getDebugBounds());
            me.addChild(stacks.mouth.current().getDebugBounds());
            me.addChild(stacks.nose.current().getDebugBounds());
            me.addChild(stacks.lefteye.current().getDebugBounds());
            me.addChild(stacks.righteye.current().getDebugBounds());
        }

        if(FacePartSettings.DEBUG_SHOW_NAMES) {

            console.log("bg: " + stacks.background.current().name + ", " +
                        "mouth: " + stacks.mouth.current().name +  ", " +
                        "nose: " + stacks.nose.current().name + ", " +
                        "lefteye: " + stacks.lefteye.current().name + ", " +
                        "righteye: " + stacks.righteye.current().name);
        }
    };

    function createFacePart(imageLoaderItem) {

        var facePart = new FacePart(imageLoaderItem);

        stacks[imageLoaderItem.groupName].push(facePart);
    }

    me.setDefaultFaceParts = function() {

        stacks.chin.position = 0;
        stacks.nose.position = 0;
        stacks.mouth.position = 0;
        stacks.lefteye.position = 0;
        stacks.righteye.position = 0;
    };

    // me.setDefaultPositions = function() {
    //
    //     stacks.chin.current().resetPosition();
    //     stacks.nose.current().resetPosition();
    //     stacks.mouth.current().resetPosition();
    //     stacks.lefteye.current().resetPosition();
    //     stacks.righteye.current().resetPosition();
    // };

    me.setRandomFaceParts = function() {

        stacks.background.random();
        stacks.chin.random();
        stacks.nose.random();
        stacks.mouth.random();
        stacks.lefteye.random();
        stacks.righteye.random();
    };

    me.setRandomPositions = function() {

        FacePartPositioningUtil.setRandomNosePosition(stacks);
        FacePartPositioningUtil.setRandomMouthPosition(stacks);
        FacePartPositioningUtil.setRandomEyePosition(stacks);
        // setRandomEyePosition();
    };

    me.BasicContainer_constructor();
}

createjs.extend(Face, BasicContainer);

module.exports = createjs.promote(Face, "BasicContainer");