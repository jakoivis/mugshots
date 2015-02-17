
'use strict';

var FacePartStack = require('./facePartStack.js');
var preloaderList = require('./preloaderList.js');
require('imageLoader');
var FacePart = require('./facePart.js');

module.exports = Mugshots;

function Mugshots()
{
    var stacks = {
        various: new FacePartStack(),
        lefteye: new FacePartStack(),
        righteye: new FacePartStack(),
        nose: new FacePartStack(),
        mouth: new FacePartStack(),
        chin: new FacePartStack()
    };

    var stage;
    var debug;

    function init()
    {
        stage = new createjs.Stage('face');
        debug = new createjs.Stage('debug');

        new ImageLoader({
            images: preloaderList,
            onFileComplete: onFileComplete,
            onComplete: onComplete
        });

        var randomButton = document.getElementById('randomButton');
        randomButton.addEventListener('click', randomize);
    }

    function onFileComplete(item)
    {
        if(!item.isFailed())
        {
            var bitmap = new createjs.Bitmap(item.tag);
            var facePart = new FacePart(item.groupName, bitmap);

            facePart.bounds.bottom = item.boundsBottom;
            facePart.bounds.top = item.boundsTop;
            facePart.bounds.left = item.boundsLeft;
            facePart.bounds.right = item.boundsRight;

            stacks[item.groupName].push(facePart);
        }
    }

    function onComplete()
    {
        stage.addChild(stacks.various.current().getImage());

        setDefaultFaceParts();
        setDefaultPositions();
        addFacePartsToStage();

        drawDebugBounds();
    }

    function randomize()
    {
        removeAllFacePartsFromStage();
        setRandomFaceParts();
        setRandomPositions();
        addFacePartsToStage();

        drawDebugBounds();
    }

    function addFacePartsToStage()
    {
        stage.addChild(stacks.chin.current().getImage());
        stage.addChild(stacks.nose.current().getImage());
        stage.addChild(stacks.mouth.current().getImage());
        stage.addChild(stacks.lefteye.current().getImage());
        stage.addChild(stacks.righteye.current().getImage());
        stage.update();
    }

    function setDefaultFaceParts()
    {
        stacks.chin.setPosition(0);
        stacks.nose.setPosition(0);
        stacks.mouth.setPosition(0);
        stacks.lefteye.setPosition(0);
        stacks.righteye.setPosition(0);
    }

    function setRandomFaceParts()
    {
        stacks.chin.random();
        stacks.nose.random();
        stacks.mouth.random();
        stacks.lefteye.random();
        stacks.righteye.random();
    }

    function removeAllFacePartsFromStage()
    {
        stage.removeChild(stacks.lefteye.current().getImage());
        stage.removeChild(stacks.righteye.current().getImage());
        stage.removeChild(stacks.nose.current().getImage());
        stage.removeChild(stacks.mouth.current().getImage());
        stage.removeChild(stacks.chin.current().getImage());
    }

    function setDefaultPositions()
    {
        stacks.chin.current().reset();
        stacks.nose.current().reset();
        stacks.mouth.current().reset();
        stacks.lefteye.current().reset();
        stacks.righteye.current().reset();
    }

    function setRandomPositions()
    {
        setRandomNosePosition();
        setRandomMouthPosition();
        setRandomEyePosition();
    }

    function setRandomNosePosition()
    {
        stacks.nose.current().setRandomYPosition();
    }

    function setRandomMouthPosition()
    {
        // var mouth = stacks.mouth.current();
        // var nose = stacks.nose.current();
        // var chin = stacks.chin.current();

        // var mouthRange = chin.getGlobalBounds().bottom - nose.getGlobalBounds().bottom;
        // var mouthAvailableMovement = mouthRange - mouth.bounds.height;

        // console.log(mouthRange, mouthAvailableMovement);
        // if(mouthAvailableMovement < 0)
        // {
        //     // adjust mouth and nose so that mouth fits inside the chin image and nose and mouth are not overlapping
        //     mouth.y = chin.getGlobalBounds().bottom - mouth.bounds.bottom;
        //     nose.y = mouth.getGlobalBounds().top - nose.bounds.bottom;
        //     console.log("1");
        // }
        // else
        // {
        //     // freely position mouth in the designated area
        //     var sizeRatio = mouth.bounds.height / mouthRange;
        //     var offset = Math.round(Math.random() * (mouthAvailableMovement * sizeRatio));
        //     mouth.y = nose.getGlobalBounds().bottom - mouth.bounds.top + offset;
        //     console.log("2");
        // }
    }

    function setRandomEyePosition()
    {

    }

    function drawDebugBounds()
    {
        debug.removeAllChildren();
        debug.clear();

        debug.addChild(stacks.chin.current().getInnerDebugBounds());
        debug.addChild(stacks.chin.current().getOuterDebugBounds());
        debug.addChild(stacks.nose.current().getInnerDebugBounds());
        debug.addChild(stacks.nose.current().getOuterDebugBounds());
        debug.addChild(stacks.mouth.current().getInnerDebugBounds());
        debug.addChild(stacks.mouth.current().getOuterDebugBounds());
        debug.addChild(stacks.lefteye.current().getInnerDebugBounds());
        debug.addChild(stacks.lefteye.current().getOuterDebugBounds());
        debug.addChild(stacks.righteye.current().getInnerDebugBounds());
        debug.addChild(stacks.righteye.current().getOuterDebugBounds());

        debug.update();
    }

    init();
}