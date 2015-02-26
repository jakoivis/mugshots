
"use strict";

var FacePart = require("./facePart.js");
var FacePartStack = require("./facePartStack.js");
var Shape = require("Shape");

module.exports = Face;

function Face()
{
    var me = this;

    var stacks = {
        various: new FacePartStack(),
        lefteye: new FacePartStack(),
        righteye: new FacePartStack(),
        nose: new FacePartStack(),
        mouth: new FacePartStack(),
        chin: new FacePartStack()
    };

    Object.defineProperty(this, "stacks", {
        get: function() { return stacks; }
    });

    me.addGraphic = function(groupName, graphic, bounds)
    {
        var facePart = new FacePart(groupName, graphic);

        facePart.bounds.bottom = bounds.bottom;
        facePart.bounds.top = bounds.top;
        facePart.bounds.left = bounds.left;
        facePart.bounds.right = bounds.right;

        stacks[groupName].push(facePart);
    };

    me.getBackgroundImage = function()
    {
        return stacks.various.current().getImage();
    };

    me.getChinImage = function()
    {
        return stacks.chin.current().getImage();
    };

    me.getMouthImage = function()
    {
        return stacks.mouth.current().getImage();
    };

    me.getNoseImage = function()
    {
        return stacks.nose.current().getImage();
    };

    me.getLefteyeImage = function()
    {
        return stacks.lefteye.current().getImage();
    };

    me.getRighteyeImage = function()
    {
        return stacks.righteye.current().getImage();
    };

    me.setDefaultFaceParts = function()
    {
        stacks.chin.setPosition(0);
        stacks.nose.setPosition(0);
        stacks.mouth.setPosition(0);
        stacks.lefteye.setPosition(0);
        stacks.righteye.setPosition(0);
    };

    me.setDefaultPositions = function()
    {
        stacks.chin.current().reset();
        stacks.nose.current().reset();
        stacks.mouth.current().reset();
        stacks.lefteye.current().reset();
        stacks.righteye.current().reset();
    };

    me.setRandomFaceParts = function()
    {
        stacks.chin.random();
        stacks.nose.random();
        stacks.mouth.random();
        stacks.lefteye.random();
        stacks.righteye.random();
    };

    me.getTotalNumberOfItems = function()
    {
        return stacks.chin.length +
            stacks.nose.length +
            stacks.mouth.length +
            stacks.lefteye.length +
            stacks.righteye.length;
    };

    me.setRandomPositions = function()
    {
        setRandomNosePosition();
        setRandomMouthPosition();
        setRandomEyePosition();
    };

    function setRandomNosePosition()
    {
        stacks.nose.current().setRandomYPosition();
    }

    function setRandomMouthPosition()
    {
        var mouth = stacks.mouth.current();
        var nose = stacks.nose.current();

        changeMouthIfItDoesntFit();

        // freely position mouth in the designated area
        var sizeRatio = mouth.bounds.height / getMouthRange();
        var offset = Math.round(Math.random() * (getMouthAvailableMovement() * sizeRatio));
        mouth.y = Math.round(nose.getGlobalBounds().bottom - mouth.bounds.top + offset);
    }

    function changeMouthIfItDoesntFit()
    {
        while(canMouthFit())
        {
            stacks.mouth.random();
        }
    }

    function canMouthFit()
    {
        return getMouthAvailableMovement() < 0;
    }

    function getMouthAvailableMovement()
    {
        var mouth = stacks.mouth.current();

        return getMouthRange() - mouth.bounds.height;
    }

    function getMouthRange()
    {
        var nose = stacks.nose.current();
        var chin = stacks.chin.current();

        return chin.getGlobalBounds().bottom - nose.getGlobalBounds().bottom;
    }

    function setRandomEyePosition()
    {
        var lefteye = stacks.lefteye.current();
        var righteye = stacks.righteye.current();
        var nose = stacks.nose.current();

        lefteye.setRandomYPosition();
        righteye.y = lefteye.y;

        var lowerEye = FacePart.getFacePartWithLowerBitmap(lefteye, righteye);
        var eyeLimit = lowerEye.getGlobalBounds().top + (lowerEye.bounds.height / 4);
        var correctionRequired = nose.getGlobalBounds().top - eyeLimit;

        // check that nose and eyes don"t overlap too much
        if(correctionRequired < 0)
        {
            var eyeYPosition = Math.round(nose.y - (lowerEye.bounds.height / 4));
            lefteye.y = eyeYPosition;
            righteye.y = eyeYPosition;
        }
    }

    me.getDebugBounds = function()
    {
        var shape = new Shape();

        var test = stacks.chin.current();

        console.log(test.getOuterDebugBoundSettings());

        drawFacePartToShape(shape, stacks.chin.current());
        drawFacePartToShape(shape, stacks.nose.current());
        drawFacePartToShape(shape, stacks.mouth.current());
        drawFacePartToShape(shape, stacks.lefteye.current());
        drawFacePartToShape(shape, stacks.righteye.current());

        return shape;
    }

    function drawFacePartToShape(shape, facePart)
    {
        var innerSettings = facePart.getInnerDebugBoundSettings();
        var outerSettings = facePart.getOuterDebugBoundSettings();

        shape.box(
            innerSettings.x,
            innerSettings.y,
            innerSettings.width,
            innerSettings.height);

        shape.strokeStyle = innerSettings.color;
        shape.stroke();

        shape.box(
            outerSettings.x,
            outerSettings.y,
            outerSettings.width,
            outerSettings.height);

        shape.strokeStyle = outerSettings.color;
        shape.stroke();
    }
}