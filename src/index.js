
"use strict";

// createjs is not commonjs module. import it once
window.createjs = window.createjs || {};
require("easeljs");
require("tweenjs");

var PreloadService = require("./services/preloadService.js");
var PreloadLayer = require("./layers/preloadLayer.js");
var BackgroundLayer = require("./layers/backgroundLayer.js");
var ApplicationLayer = require("./layers/applicationLayer.js");
var ImageCache = require("./imageCache.js");
// var DebugControlsLayer = require("./layers/debugControlsLayer.js");
// var DebugFaceLayer = require("./layers/debugFaceLayer.js");


createjs.Ticker.setFPS(30);

// new BackgroundLayer({
//     target: "background"
// });

new PreloadLayer({
    target: "loader"
});

new ApplicationLayer({
    target: "application"
});

// new DebugFaceLayer({
//     target: "application"
// });

// new DebugControlsLayer({
//     target: "debugControls"
// });

ImageCache.initialize();
PreloadService.load();