
"use strict";

var extend = require("extend");
var Layer = require("Layer");

module.exports = HighlightLayer;

extend(HighlightLayer, Layer);

function HighlightLayer(options)
{
    HighlightLayer.superconstructor.call(this, options);

    var me = this;

    function init()
    {

    }

    init();

    return this;
}