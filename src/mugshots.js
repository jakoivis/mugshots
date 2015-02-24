
"use strict";

var FaceLayer = require("./faceLayer.js");
var PreloadLayer = require("./preloadLayer.js");

module.exports = Mugshots;

function Mugshots()
{
    var preloadLayer;

    function init()
    {
        var face = new FaceLayer({
            target: "face",
            width: 600,
            height: 800,
            onComplete: loadComplete,
            onBackgroundPreload: onBackgroundPreload
        });

        preloadLayer = new PreloadLayer({
            target: "loader",
            clickThrough: true,
            width: 600,
            height: 800
        });
    }

    function loadComplete()
    {
        preloadLayer.remove();
        preloadLayer = null;
    }

    function onBackgroundPreload()
    {

    }

    init();
}