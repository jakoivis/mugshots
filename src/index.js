
"use strict";

// easeljs is not commonjs module. import it once
window.createjs = window.createjs || {};
window.easeljs = createjs;
require("easeljs");
require("tweenjs");

var PreloadService = require("./services/preloadService.js");
var PreloadLayer = require("./layers/preloadLayer.js");
var FaceLayer = require("./layers/faceLayer.js");
var DebugControlsLayer = require("./layers/debugControlsLayer.js");
// var OverlayLayer = require("./layers/overlayLayer.js");

var layerWidth = 600;
var layerHeight = 800;

// new FaceLayer({
//     target: "face",
//     width: layerWidth,
//     height: layerHeight
// });

new PreloadLayer({
    target: "loader",
    pointerEvents: false,
    width: layerWidth,
    height: layerHeight
});

new DebugControlsLayer({
    target: "debugControls"
});


// new OverlayLayer();

PreloadService.load();