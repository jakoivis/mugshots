
"use strict";

// createjs is not commonjs module. import it once
window.createjs = window.createjs || {};
require("easeljs");
require("tweenjs");

var PreloadService = require("./services/preloadService.js");
var PreloadLayer = require("./layers/preloadLayer.js");
var FaceLayer = require("./layers/faceLayer.js");
var DebugControlsLayer = require("./layers/debugControlsLayer.js");
var PageMarginLayer = require("./layers/pageMarginLayer.js");

// new FaceLayer({
//     target: "face"
// });

new PreloadLayer({
    target: "loader"
});

// new DebugControlsLayer({
//     target: "debugControls"
// });

new PageMarginLayer({
    target: "margins"
});

PreloadService.load();
