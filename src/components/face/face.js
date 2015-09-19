
"use strict";

var FacePartStack = require("./facePartStack.js");
var FacePart = require("./facePart.js");
var FacePartPositioningUtil = require("./facePartPositioningUtil.js");

module.exports = Face;

function Face() {

    var me = this;
    var _container = new createjs.Container();
    var debugDrawImageBounds = false;
    var debugLogImageNames = false;

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

    Object.defineProperty(this, "container", {

        get: function() { return _container; }
    });

    me.update = function() {

        _container.removeAllChildren();

        _container.addChild(stacks.background.current().bitmap);
        _container.addChild(stacks.mouth.current().bitmap);
        _container.addChild(stacks.nose.current().bitmap);
        _container.addChild(stacks.lefteye.current().bitmap);
        _container.addChild(stacks.righteye.current().bitmap);

        if(debugDrawImageBounds) {

            _container.addChild(stacks.background.current().getDebugBounds());
            _container.addChild(stacks.mouth.current().getDebugBounds());
            _container.addChild(stacks.nose.current().getDebugBounds());
            _container.addChild(stacks.lefteye.current().getDebugBounds());
            _container.addChild(stacks.righteye.current().getDebugBounds());
        }

        if(debugLogImageNames) {

            console.log("bg: " + stacks.background.current().name + ", " +
                        "mouth: " + stacks.mouth.current().name +  ", " +
                        "nose: " + stacks.nose.current().name + ", " +
                        "lefteye: " + stacks.lefteye.current().name + ", " +
                        "righteye: " + stacks.righteye.current().name);
        }
    };

    me.createFacePart = function(imageSettings) {

        var facePart = new FacePart(imageSettings);

        stacks[imageSettings.groupName].push(facePart);
    };

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
}
