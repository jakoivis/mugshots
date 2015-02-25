
"use strict";

var extend = require("extend");
var Face = require("./face.js");
var PreloaderList = require("./preloaderList.js");
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
    var face = new Face();
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
            addLoadedItemToFace(item);
        }

        if(canSwitchToBackgroundLoading())
        {
            switchToBackgroundLoading();
        }
    }

    function addLoadedItemToFace(loadedItem)
    {
        var imageData = CanvasUtil.getImageDataFromTag(loadedItem.tag);
        var graphic = new Graphic({
            imageData: imageData
        });

        var bounds = {
            bottom: loadedItem.boundsBottom,
            top: loadedItem.boundsTop,
            left: loadedItem.boundsLeft,
            right: loadedItem.boundsRight
        };

        face.addGraphic(loadedItem.groupName, graphic, bounds);
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
        face.setRandomFaceParts();
        face.setRandomPositions();

        updateGraphics();
    }

    function canSwitchToBackgroundLoading()
    {
        var minAmountLoaded = 50;

        if(backgroundPreload === false &&
            face.getTotalNumberOfItems() >= minAmountLoaded)
        {
            backgroundPreload = true;
            return true;
        }

        return false;
    }

    function switchToBackgroundLoading()
    {
        face.setDefaultFaceParts();
        face.setDefaultPositions();

        updateGraphics();

        addLayerClickHandler();

        if(onBackgroundPreload)
        {
            onBackgroundPreload();
        }
    }

    function updateGraphics()
    {
        me.removeAllGraphics();

        me.addGraphic(face.getBackgroundImage());

        me.addGraphic(face.getChinImage());
        me.addGraphic(face.getMouthImage());
        me.addGraphic(face.getNoseImage());
        me.addGraphic(face.getLefteyeImage());
        me.addGraphic(face.getRighteyeImage());

        me.render();
    }

    function addLayerClickHandler()
    {
        me.getCanvas().addEventListener("click", randomize);
        me.getCanvas().style.cursor = "pointer";
    }

    init();
}