
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

module.exports = FacePartPositioningUtil;