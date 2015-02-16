
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

            facePart.boundsBottom = item.boundsBottom;
            facePart.boundsTop = item.boundsTop;
            facePart.boundsLeft = item.boundsLeft;
            facePart.boundsRight = item.boundsRight;

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
        // var chin = stacks..current();

        // var mouthRange:int = chin.bitmapAbsoluteBottom - nose.bitmapAbsoluteBottom;
        // var mouthAvailableMovement:int = mouthRange - mouth.bitmapVisibleHeight;

        // if(mouthAvailableMovement < 0)
        // {
        //     // adjust mouth and nose so that mouth fits inside the chin image and nose and mouth are not overlapping
        //     mouth.top = chin.bitmapAbsoluteBottom - mouth.bitmapBottom;
        //     nose.top = mouth.bitmapAbsoluteTop - nose.bitmapBottom;
        // }
        // else
        // {
        //     // freely position mouth in the designated area
        //     var sizeRatio:Number = mouth.bitmapVisibleHeight / mouthRange;
        //     var offset:int = Math.round(Math.random() * (mouthAvailableMovement * sizeRatio));
        //     mouth.top = nose.bitmapAbsoluteBottom - mouth.bitmapTop + offset;
        // }
    }

    function setRandomEyePosition()
    {

    }

    function getDefaultFacePart(facePartName)
    {
        return stacks[facePartName][0];
    }

    function getRandomFacePart(facePartName)
    {
        var faceParts = stacks[facePartName];
        var randomNumber = getRandomInt(0, faceParts.length);
        var facePart = faceParts[randomNumber];
        return facePart;
    }

    function getRandomInt(min, max)
    {
      return Math.floor(Math.random() * (max - min)) + min;
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