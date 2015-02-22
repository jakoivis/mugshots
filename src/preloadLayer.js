
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

    var isAnimating = true;

    function init()
    {
        spinner = new Spinner();

        me.addGraphic(spinner);

        animate();
    }

    function animate()
    {
        me.update();
        me.render();

        if(isAnimating)
        {
            window.requestAnimationFrame(animate);
        }
    }

    me.remove = function()
    {
        isAnimating = false;

    };

    init();

    return this;
}