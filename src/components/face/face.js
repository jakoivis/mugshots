
"use strict";

var FacePartStack = require("./facePartStack.js");
var FacePart = require("./facePart.js");
var FacePartPositioningUtil = require("./facePartPositioningUtil.js");

module.exports = Face;

function Face()
{
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

    me.createFacePart = function(imageSettings)
    {
        var facePart = new FacePart(imageSettings);

        stacks[imageSettings.groupName].push(facePart);
    };

    me.setDefaultFaceParts = function()
    {
        stacks.chin.position = 0;
        stacks.nose.position = 0;
        stacks.mouth.position = 0;
        stacks.lefteye.position = 0;
        stacks.righteye.position = 0;
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
        stacks.background.random();
        stacks.chin.random();
        stacks.nose.random();
        stacks.mouth.random();
        stacks.lefteye.random();
        stacks.righteye.random();
    };

    me.setRandomPositions = function()
    {
        FacePartPositioningUtil.setRandomNosePosition(stacks);
        FacePartPositioningUtil.setRandomMouthPosition(stacks);
        // setRandomEyePosition();
    };

    // function setRandomNosePosition()
    // {
    //     stacks.nose.current().setRandomYPosition();
    // }

    // function setRandomMouthPosition()
    // {
    //     var mouth = stacks.mouth.current();
    //     var nose = stacks.nose.current();

    //     changeMouthIfItDoesntFit();

    //     // freely position mouth in the designated area
    //     var sizeRatio = mouth.height / getMouthRange();
    //     var offset = Math.round(Math.random() * (getMouthAvailableMovement() * sizeRatio));
    //     mouth.bitmap.y = Math.round(nose.bottom - mouth.top + offset);
    // }

    // function changeMouthIfItDoesntFit()
    // {
    //     while(canMouthFit())
    //     {
    //         stacks.mouth.random();
    //     }
    // }

    // function canMouthFit()
    // {
    //     return getMouthAvailableMovement() < 0;
    // }

    // function getMouthAvailableMovement()
    // {
    //     var mouth = stacks.mouth.current();

    //     console.log(mouth.bounds);

    //     return getMouthRange() - mouth.height;
    // }

    // function getMouthRange()
    // {
    //     var nose = stacks.nose.current();
    //     var background = stacks.background.current();

    //     return background.bottom - nose.bottom;
    // }

    function setRandomEyePosition()
    {
        var lefteye = stacks.lefteye.current();
        var righteye = stacks.righteye.current();
        var nose = stacks.nose.current();

        lefteye.setRandomYPosition();
        righteye.y = lefteye.y;

        var lowerEye = FacePart.getFacePartWithLowerBitmap(lefteye, righteye);
        var eyeLimit = lowerEye.top + (lowerEye.bounds.height / 4);
        var correctionRequired = nose.top - eyeLimit;

        // check that nose and eyes don"t overlap too much
        if(correctionRequired < 0)
        {
            var eyeYPosition = Math.round(nose.y - (lowerEye.bounds.height / 4));
            lefteye.y = eyeYPosition;
            righteye.y = eyeYPosition;
        }
    }
}