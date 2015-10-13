
"use strict";

var FacePartSettings = require("../../components/face/facePartSettings.js");

var FacePartPositioningUtil = {

    setRandomNosePosition: function(stacks) {

        stacks.nose.current().setRandomYPosition();
    },

    setRandomMouthPosition: function(stacks) {

        changeMouthIfItDoesntFit(stacks);

        // freely position mouth in the designated area
        var mouth = stacks.mouth.current();
        var nose = stacks.nose.current();
        var mouthAvailableMovement = getMouthAvailableMovement(stacks);
        var mouthTopMin = nose.bottom;
        var mouthTopMax = mouthTopMin + mouthAvailableMovement;

        mouth.top = getRandomInt(mouthTopMin, mouthTopMax);
    },

    setRandomEyePosition: function(stacks) {

        var lefteye = stacks.lefteye.current();
        var righteye = stacks.righteye.current();
        var nose = stacks.nose.current();

        // calculate eye min max range instead of using congifured one
        // set max eye bottom to nose bottom - 5th of nose's height

        // this is height from bitmap top to alpha bounds bottom
        var eyeLocalBottom = lefteye.localInnerBounds.bottom;
        var eyeMaxY = nose.bottom - (eyeLocalBottom + nose.height / 5);

        var eyeSettings = FacePartSettings.lefteye;
        var eyeMinY = eyeSettings.defaultRect.y + eyeSettings.rangeY.min;

        if(eyeMaxY < eyeMinY) {
            eyeMaxY = eyeMinY;
        }

        lefteye.setRandomYPositionBetween(eyeMinY, eyeMaxY);
        righteye.top = getCentralizedTop(lefteye, righteye);
    }
};

function changeMouthIfItDoesntFit(stacks) {

    var count = 0;

    while(canMouthFit(stacks)) {

        console.log("didn't fit, change image");
        stacks.mouth.next();

        if(count > 30) {
            // just give up and let it
            // position on small space
            break;
        }
    }
}

function canMouthFit(stacks) {

    return getMouthAvailableMovement(stacks) < 0;
}

function getMouthAvailableMovement(stacks) {

    var mouth = stacks.mouth.current();

    return getMouthAvailableSpace(stacks) - mouth.height;
}

function getMouthAvailableSpace(stacks) {

    var nose = stacks.nose.current();
    var background = stacks.background.current();

    return background.bottom - nose.bottom;
}

function getRandomInt(min, max) {

    return Math.floor(Math.random() * (max - min)) + min;
}

function getFacePartWithLowerBitmap(facepart1, facepart2) {

    if(facepart1.bottom < facepart2.bottom) {

        return facepart1;

    } else {

        return facepart2;
    }
}

/**
 * Calculate centralized top position for FacePart2 realative to FacePart1
 *
 * @param  {object} facePart1 FacePart which is used as anchor point
 * @param  {object} facePart2 FacePart for which the top position is calculated
 * @return {number}           Top position of FacePart
 */
function getCentralizedTop(facePart1, facePart2) {

    return facePart1.top + ((facePart1.height - facePart2.height) / 2);
}

module.exports = FacePartPositioningUtil;