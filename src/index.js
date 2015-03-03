
"use strict";

var PreloadService = require("./services/preloadService.js");
var PreloadLayer = require("./layers/preloadLayer.js");
var FaceLayer = require("./layers/faceLayer.js");
var OverlayLayer = require("./layers/overlayLayer.js");

new FaceLayer({
    target: "face",
    width: 600,
    height: 800,
    enableOnClickEvents: true,
    enableOnRollEvents: true
});

new PreloadLayer({
    target: "loader",
    clickThrough: true,
    width: 600,
    height: 800
});

new OverlayLayer();

PreloadService.load();