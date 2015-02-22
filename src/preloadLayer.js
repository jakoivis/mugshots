
"use strict";

var extend = require("extend");
var Layer = require("Layer");
var Spinner = require("./spinner.js");

module.exports = PreloadLayer;

extend(PreloadLayer, Layer);

function PreloadLayer(options)
{
    PreloadLayer.superconstructor.call(this, options);

    var me = this;
    var spinner;

    function init()
    {
        spinner = new Spinner();


        me.addGraphic(spinner);
        me.render();
    }

    init();

    return this;
}