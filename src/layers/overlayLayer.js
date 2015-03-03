
"use strict";

var amplify = require("amplify").amplify;
var TWEEN = require("tween.js");

var TOPICS = require("../topics.js");

module.exports = OverlayLayer;

function OverlayLayer()
{
    function init()
    {
        amplify.subscribe(TOPICS.PRELOAD_BACKGROUND, removeOverlay);
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

    return this;
}
