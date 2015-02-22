
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
            appendToBody: true,
            width: 500,
            height: 700,
            onComplete: loadComplete,
            onBackgroundPreload: onBackgroundPreload
        });

        preloadLayer = new PreloadLayer({
            appendToBody: true,
            width: 500,
            height: 700
        });
    }

    function loadComplete()
    {
        preloadLayer.remove();
    }

    function onBackgroundPreload()
    {

    }

    init();
}