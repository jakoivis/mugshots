
"use strict";

var FaceLayer = require("./faceLayer.js");
var PreloadLayer = require("./preloadLayer.js");
var TWEEN = require("tween.js");

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
        removeOverlay();
    }

    function removeOverlay()
    {
        var overlay = document.getElementById("overlay");

        new TWEEN.Tween({opacity:1})
            .to({opacity:0}, 2000)
            .easing(TWEEN.Easing.Quartic.InOut)
            .onUpdate(function() {
                overlay.style.opacity = this.opacity;
            })
            .onComplete(function() {
                document.body.removeChild(overlay);
            })
            .start();
    }

    init();
}