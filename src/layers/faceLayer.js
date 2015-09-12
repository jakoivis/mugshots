
"use strict";

var amplify = require("amplify").amplify;
var Face = require("../components/face/face.js");
var TOPICS = require("../topics.js");

module.exports = FaceLayer;

function FaceLayer(options)
{
    var face = new Face();
    // var debug = false;
    var canvas;
    var stage;

    function init()
    {
        canvas = document.getElementById(options.target);

        if(options.width)
        {
            canvas.width = options.width;
        }

        if(options.height)
        {
            canvas.height = options.height;
        }

        stage = new createjs.Stage(canvas);

        amplify.subscribe(TOPICS.PRELOAD_ITEM_COMPLETE, onFileComplete);
        amplify.subscribe(TOPICS.PRELOAD_BACKGROUND, switchToBackgroundMode);
    }

    function onFileComplete(item)
    {
        if(!item.isFailed())
        {
            face.createFacePart(item);
        }
    }

    function switchToBackgroundMode()
    {
        face.setDefaultFaceParts();
        // face.setDefaultPositions();

        updateGraphics();

        addLayerClickHandler();
    }

    function randomize()
    {
        face.setRandomFaceParts();
    //     face.setRandomPositions();

        updateGraphics();
    }

    function updateGraphics()
    {
        stage.removeAllChildren();

        stage.addChild(face.getBackgroundImage().bitmap);

        stage.addChild(face.getChinImage().bitmap);
        stage.addChild(face.getMouthImage().bitmap);
        stage.addChild(face.getNoseImage().bitmap);
        stage.addChild(face.getLefteyeImage().bitmap);
        stage.addChild(face.getRighteyeImage().bitmap);

        stage.update();

        // if(debug)
        // {
        //     me.addGraphic(face.getDebugBounds());
        // }
    }

    function addLayerClickHandler()
    {
        canvas.style.cursor = "pointer";
        canvas.addEventListener("click", randomize);
    }

    init();
}