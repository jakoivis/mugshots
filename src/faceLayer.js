
"use strict";

var TOPICS = require("./topics.js");
var amplify = require("amplify").amplify;
var extend = require("extend");
var Face = require("./face.js");

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
    var debug = false;

    function init()
    {
        onCompleteCallback = options.onComplete;
        onBackgroundPreload = options.onBackgroundPreload;

        amplify.subscribe(TOPICS.PRELOAD_COMPLETE, onComplete);
        amplify.subscribe(TOPICS.PRELOAD_ITEM_COMPLETE, onFileComplete);
        amplify.subscribe(TOPICS.PRELOAD_BACKGROUND, switchToBackgroundMode);
    }

    function onFileComplete(item)
    {
        if(!item.isFailed())
        {
            addLoadedItemToFace(item);
        }
    }

    function onComplete()
    {
        if(onCompleteCallback)
        {
            onCompleteCallback();
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

    function randomize()
    {
        face.setRandomFaceParts();
        face.setRandomPositions();

        updateGraphics();
    }

    function switchToBackgroundMode()
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

        if(debug)
        {
            me.addGraphic(face.getDebugBounds());
        }

        me.render();
    }

    function addLayerClickHandler()
    {
        me.getCanvas().addEventListener("click", randomize);
        me.getCanvas().style.cursor = "pointer";
    }

    init();
}