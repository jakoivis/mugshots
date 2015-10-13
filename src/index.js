
"use strict";

// createjs is not commonjs module. import it once
window.createjs = window.createjs || {};
require("easeljs");
require("tweenjs");

var PreloadService = require("./services/preloadService.js");
var PreloadLayer = require("./layers/preloadLayer.js");
var ApplicationLayer = require("./layers/ApplicationLayer.js");
var DebugControlsLayer = require("./layers/debugControlsLayer.js");
var DebugFaceLayer = require("./layers/debugFaceLayer.js");

createjs.Ticker.setFPS(30);

new ApplicationLayer({
    target: "application"
});

new PreloadLayer({
    target: "loader"
});

// new DebugFaceLayer({
//     target: "application"
// });

// new DebugControlsLayer({
//     target: "debugControls"
// });


PreloadService.load();
