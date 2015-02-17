
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

    var debug = false;

    function init()
    {
        stage = new createjs.Stage('face');

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
        setDefaultFaceParts();
        setDefaultPositions();
        addFacePartsToStage();

        drawDebugBounds();

        stage.update();
    }

    function randomize()
    {
        removeAllFacePartsFromStage();
        setRandomFaceParts();
        setRandomPositions();
        addFacePartsToStage();

        drawDebugBounds();

        stage.update();
    }

    function addFacePartsToStage()
    {
        stage.addChild(stacks.various.current().getImage());

        stage.addChild(stacks.chin.current().getImage());
        stage.addChild(stacks.mouth.current().getImage());
        stage.addChild(stacks.nose.current().getImage());
        stage.addChild(stacks.lefteye.current().getImage());
        stage.addChild(stacks.righteye.current().getImage());
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
        stage.removeAllChildren();
        stage.clear();
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
        var mouth = stacks.mouth.current();
        var nose = stacks.nose.current();
        var chin = stacks.chin.current();

        var mouthRange = chin.getGlobalBounds().bottom - nose.getGlobalBounds().bottom;
        var mouthAvailableMovement = mouthRange - mouth.bounds.height;

        if(mouthAvailableMovement < 0)
        {
            // adjust mouth and nose so that mouth fits inside the chin image and nose and mouth are not overlapping
            mouth.y = chin.getGlobalBounds().bottom - mouth.bounds.bottom;
            nose.y = mouth.getGlobalBounds().top - nose.bounds.bottom;
        }
        else
        {
            // freely position mouth in the designated area
            var sizeRatio = mouth.bounds.height / mouthRange;
            var offset = Math.round(Math.random() * (mouthAvailableMovement * sizeRatio));
            mouth.y = nose.getGlobalBounds().bottom - mouth.bounds.top + offset;
        }
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

        // check that nose and eyes don't overlap too much
        if(correctionRequired < 0)
        {
            lefteye.y = nose.y - (lowerEye.bounds.height / 4);
            righteye.y = nose.y - (lowerEye.bounds.height / 4);
        }
    }

    function drawDebugBounds()
    {
        if(debug)
        {
            stage.addChild(stacks.chin.current().getInnerDebugBounds());
            stage.addChild(stacks.chin.current().getOuterDebugBounds());
            stage.addChild(stacks.nose.current().getInnerDebugBounds());
            stage.addChild(stacks.nose.current().getOuterDebugBounds());
            stage.addChild(stacks.mouth.current().getInnerDebugBounds());
            stage.addChild(stacks.mouth.current().getOuterDebugBounds());
            stage.addChild(stacks.lefteye.current().getInnerDebugBounds());
            stage.addChild(stacks.lefteye.current().getOuterDebugBounds());
            stage.addChild(stacks.righteye.current().getInnerDebugBounds());
            stage.addChild(stacks.righteye.current().getOuterDebugBounds());
        }
    }

    init();
}