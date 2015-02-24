
"use strict";

var extend = require("extend");
var FacePartStack = require("./facePartStack.js");
var PreloaderList = require("./preloaderList.js");
var FacePart = require("./facePart.js");
var ImageLoader = require("ImageLoader");
var CanvasUtil = require("CanvasUtil");
var Layer = require("Layer");
var Graphic = require("Graphic");

module.exports = FaceLayer;

extend(FaceLayer, Layer);

function FaceLayer(options)
{
    FaceLayer.superconstructor.call(this, options);

    var me = this;

    var stacks = {
        various: new FacePartStack(),
        lefteye: new FacePartStack(),
        righteye: new FacePartStack(),
        nose: new FacePartStack(),
        mouth: new FacePartStack(),
        chin: new FacePartStack()
    };

    var debug = false;

    var onCompleteCallback;
    var onBackgroundPreload;

    var backgroundPreload = false;

    function init()
    {
        onCompleteCallback = options.onComplete;
        onBackgroundPreload = options.onBackgroundPreload;

        new ImageLoader({
            images: PreloaderList.getList(),
            onFileComplete: onFileComplete,
            onComplete: onComplete
        });
    }

    function onFileComplete(item)
    {
        if(!item.isFailed())
        {
            var imageData = CanvasUtil.getImageDataFromTag(item.tag);
            var graphic = new Graphic({
                imageData: imageData
            });

            var facePart = new FacePart(item.groupName, graphic);

            facePart.bounds.bottom = item.boundsBottom;
            facePart.bounds.top = item.boundsTop;
            facePart.bounds.left = item.boundsLeft;
            facePart.bounds.right = item.boundsRight;

            stacks[item.groupName].push(facePart);
        }

        if(canSwitchToBackgroundLoading())
        {
            setDefaultFaceParts();
            setDefaultPositions();
            addFacePartsToStage();

            drawDebugBounds();

            me.render();

            addLayerClickHandler();

            if(onBackgroundPreload)
            {
                onBackgroundPreload();
            }
        }
    }

    function onComplete()
    {
        if(onCompleteCallback)
        {
            onCompleteCallback();
        }
    }

    function randomize()
    {
        removeAllFacePartsFromStage();
        setRandomFaceParts();
        setRandomPositions();
        addFacePartsToStage();

        drawDebugBounds();

        me.render();
    }

    function addFacePartsToStage()
    {
        me.addGraphic(stacks.various.current().getImage());

        me.addGraphic(stacks.chin.current().getImage());
        me.addGraphic(stacks.mouth.current().getImage());
        me.addGraphic(stacks.nose.current().getImage());
        me.addGraphic(stacks.lefteye.current().getImage());
        me.addGraphic(stacks.righteye.current().getImage());
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
        me.removeAllGraphics();
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

        // check that nose and eyes don"t overlap too much
        if(correctionRequired < 0)
        {
            lefteye.y = nose.y - (lowerEye.bounds.height / 4);
            righteye.y = nose.y - (lowerEye.bounds.height / 4);
        }
    }

    function canSwitchToBackgroundLoading()
    {
        var minAmountLoaded = 10;

        if(backgroundPreload === false &&
            stacks.chin.length >= minAmountLoaded &&
            stacks.nose.length >= minAmountLoaded &&
            stacks.mouth.length >= minAmountLoaded &&
            stacks.lefteye.length >= minAmountLoaded &&
            stacks.righteye.length >= minAmountLoaded)
        {
            backgroundPreload = true;
            return true;
        }

        return false;
    }

    function addLayerClickHandler()
    {
        me.getCanvas().addEventListener("click", randomize);
        me.getCanvas().style.cursor = "pointer";
    }

    function drawDebugBounds()
    {
        if(debug)
        {
            me.addGraphic(stacks.chin.current().getInnerDebugBounds());
            me.addGraphic(stacks.chin.current().getOuterDebugBounds());
            me.addGraphic(stacks.nose.current().getInnerDebugBounds());
            me.addGraphic(stacks.nose.current().getOuterDebugBounds());
            me.addGraphic(stacks.mouth.current().getInnerDebugBounds());
            me.addGraphic(stacks.mouth.current().getOuterDebugBounds());
            me.addGraphic(stacks.lefteye.current().getInnerDebugBounds());
            me.addGraphic(stacks.lefteye.current().getOuterDebugBounds());
            me.addGraphic(stacks.righteye.current().getInnerDebugBounds());
            me.addGraphic(stacks.righteye.current().getOuterDebugBounds());
        }
    }

    init();
}