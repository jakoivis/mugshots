
"use strict";

var FacePartStack = require("./facePartStack.js");
var FacePart = require("./facePart.js");

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

    me.createFacePart = function(imageSettings)
    {
        var facePart = new FacePart(imageSettings);

        stacks[imageSettings.groupName].push(facePart);
    };

    me.getBackgroundImage = function()
    {
        return stacks.various.current();
    };

    me.getChinImage = function()
    {
        return stacks.chin.current();
    };

    me.getMouthImage = function()
    {
        return stacks.mouth.current();
    };

    me.getNoseImage = function()
    {
        return stacks.nose.current();
    };

    me.getLefteyeImage = function()
    {
        return stacks.lefteye.current();
    };

    me.getRighteyeImage = function()
    {
        return stacks.righteye.current();
    };

    me.setDefaultFaceParts = function()
    {
        stacks.chin.setPosition(0);
        stacks.nose.setPosition(0);
        stacks.mouth.setPosition(0);
        stacks.lefteye.setPosition(0);
        stacks.righteye.setPosition(0);
    };

    // me.setDefaultPositions = function()
    // {
    //     stacks.chin.current().resetPosition();
    //     stacks.nose.current().resetPosition();
    //     stacks.mouth.current().resetPosition();
    //     stacks.lefteye.current().resetPosition();
    //     stacks.righteye.current().resetPosition();
    // };

    me.setRandomFaceParts = function()
    {
        stacks.chin.random();
        stacks.nose.random();
        stacks.mouth.random();
        stacks.lefteye.random();
        stacks.righteye.random();
    };

    me.setRandomPositions = function()
    {
        // setRandomNosePosition();
        // setRandomMouthPosition();
        // setRandomEyePosition();
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
}