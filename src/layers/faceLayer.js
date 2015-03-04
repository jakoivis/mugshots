
"use strict";

var amplify = require("amplify").amplify;
var extend = require("extend");

var Layer = require("Layer");

var Face = require("../components/face.js");
var TOPICS = require("../topics.js");

module.exports = FaceLayer;

extend(FaceLayer, Layer);

function FaceLayer(options)
{
    FaceLayer.superconstructor.call(this, options);

    var me = this;
    var face = new Face();
    var debug = false;

    function init()
    {
        amplify.subscribe(TOPICS.PRELOAD_ITEM_COMPLETE, onFileComplete);
        amplify.subscribe(TOPICS.PRELOAD_BACKGROUND, switchToBackgroundMode);

        face.onFacePartRollOver = facePartRollOver;
        face.onFacePartRollOut = facePartRollOut;
    }

    function onFileComplete(item)
    {
        if(!item.isFailed())
        {
            addLoadedItemToFace(item);
        }
    }

    function addLoadedItemToFace(loadedItem)
    {
        face.createFacePart(loadedItem);
    }

    function facePartRollOver(groupName, bounds)
    {
        amplify.publish(TOPICS.FACE_PART_ROLL_OVER, {groupName:groupName, bounds:bounds});
    }

    function facePartRollOut(groupName, bounds)
    {
        amplify.publish(TOPICS.FACE_PART_ROLL_OUT, {groupName:groupName, bounds:bounds});
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