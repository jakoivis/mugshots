
"use strict";

var amplify = require("amplify").amplify;
var TWEEN = require("tween.js");

var PreloadService = require("./services/preloadService.js");
var PreloadLayer = require("./layers/preloadLayer.js");
var FaceLayer = require("./layers/faceLayer.js");

var TOPICS = require("./topics.js");

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
            enableOnClickEvents: true,
            enableOnRollEvents: true
        });

        preloadLayer = new PreloadLayer({
            target: "loader",
            clickThrough: true,
            width: 600,
            height: 800
        });

        amplify.subscribe(TOPICS.PRELOAD_BACKGROUND, onSwitchToBackgroundMode);

        PreloadService.load();
    }

    function onSwitchToBackgroundMode()
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