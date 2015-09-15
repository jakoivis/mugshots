
"use strict";

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
        // var nose = stacks.nose.current();

        lefteye.setRandomYPosition();
        righteye.top = getCentralizedTop(lefteye, righteye);

        // var lowerEye = getFacePartWithLowerBitmap(lefteye, righteye);
        // var eyeLimit = lowerEye.top + (lowerEye.bounds.height / 4);
        // var correctionRequired = nose.top - eyeLimit;

        // // check that nose and eyes don"t overlap too much
        // if(correctionRequired < 0) {

        //     var eyeYPosition = Math.round(nose.y - (lowerEye.bounds.height / 4));
        //     lefteye.y = eyeYPosition;
        //     righteye.y = eyeYPosition;
        // }
    }
};

function changeMouthIfItDoesntFit(stacks) {

    while(canMouthFit(stacks)) {

        console.log("didn't fit, change image");
        stacks.mouth.next();
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