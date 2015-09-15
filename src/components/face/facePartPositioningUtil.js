
"use strict";

var FacePartPositioningUtil = {

    setRandomNosePosition: function(stacks)
    {
        stacks.nose.current().setRandomYPosition();
    },

    setRandomMouthPosition: function(stacks)
    {
        changeMouthIfItDoesntFit(stacks);

    //     var sizeRatio = mouth.height / getMouthRange();
    //     var offset = Math.round(Math.random() * (getMouthAvailableMovement() * sizeRatio));
    //     mouth.bitmap.y = Math.round(nose.bottom - mouth.top + offset);

        // freely position mouth in the designated area
        var mouthFacePart = stacks.mouth.current();
        var noseFacePart = stacks.nose.current();
        var mouthAvailableSpace = getMouthAvailableSpace(stacks);
        var mouthAvailableMovement = getMouthAvailableMovement(stacks);

        console.log("mouthAvailableMovement: " + mouthAvailableMovement);

        // var sizeRatio = mouthFacePart.height / mouthAvailableSpace;
        // var offset = Math.round(Math.random() * (mouthAvailableMovement * sizeRatio));
        // console.log(mouthFacePart.top);
        // mouthFacePart.bitmap.y = Math.round(noseFacePart.bottom - mouthFacePart.top + offset);
        var mouthMin = noseFacePart.bottom;
        var mouthMax = mouthMin + mouthAvailableMovement;

        var x = getRandomInt(mouthMin, mouthMax);

        console.log(x);
    }
};

function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min)) + min;
}

function changeMouthIfItDoesntFit(stacks)
{
    while(canMouthFit(stacks))
    {
        stacks.mouth.next();
        // console.log("Changed mouth since it didn't fit in the available area");
    }
}

function canMouthFit(stacks)
{
    var range = getMouthAvailableMovement(stacks);

    // console.log("mouth avail. movement range Y: " + range);

    return range < 0;
}

function getMouthAvailableMovement(stacks)
{
    var mouth = stacks.mouth.current();

    return getMouthAvailableSpace(stacks) - mouth.height;
}

function getMouthAvailableSpace(stacks)
{
    var nose = stacks.nose.current();
    var background = stacks.background.current();

    return background.bottom - nose.bottom;
}

module.exports = FacePartPositioningUtil;