
"use strict";

var PreloadService = require("./services/preloadService.js");
var PreloadLayer = require("./layers/preloadLayer.js");
var FaceLayer = require("./layers/faceLayer.js");
var HighlightLayer = require("./layers/highlightLayer.js");
var OverlayLayer = require("./layers/overlayLayer.js");

var layerWidth = 600;
var layerHeight = 800;

new FaceLayer({
    target: "face",
    width: layerWidth,
    height: layerHeight,
    enableOnClickEvents: true,
    enableOnRollEvents: true
});

new HighlightLayer({
    target: "highlight",
    width: layerWidth,
    height: layerHeight,
    clickThrough: true
});

new PreloadLayer({
    target: "loader",
    clickThrough: true,
    width: layerWidth,
    height: layerHeight
});

new OverlayLayer();

PreloadService.load();