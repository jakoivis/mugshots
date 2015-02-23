
"use strict";

var extend = require("extend");
var Layer = require("Layer");
var Spinner = require("./spinner.js");
var TWEEN = require("tween.js");

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
        spinner.tickColor = 0x444444;
        spinner.tickHighLightColor = 0xEEEEEE;
        spinner.tickAlpha = 0.5;
        spinner.center = {x: 100, y: 100};

        me.addGraphic(spinner);

        animate();

        new TWEEN.Tween({
                alpha: 0,
                outerRadius: 60,
                innerRadius: 40,
                rotationSpeed: 0.1,
                tickWidth: 8
            })
            .to({
                alpha: 0.5,
                outerRadius: 20,
                innerRadius: 15,
                rotationSpeed: 0.03,
                tickWidth: 4
            }, 2000)
            .easing(TWEEN.Easing.Elastic.InOut)
            .onUpdate(fadeUpdate)
            // .onComplete(fadeInCompleteComplete)
            .start();
    }

    function animate(time)
    {
        TWEEN.update(time);

        me.update();
        me.render();

        if(isAnimating)
        {
            window.requestAnimationFrame(animate);
        }
    }

    me.remove = function()
    {
        new TWEEN.Tween({
                alpha: 0.5,
                outerRadius: 20,
                innerRadius: 15,
                rotationSpeed: 0.03,
                tickWidth: 4
            })
            .to({
                alpha: 0,
                outerRadius: 60,
                innerRadius: 40,
                rotationSpeed: 0.1,
                tickWidth: 8
            }, 4000)
            .easing(TWEEN.Easing.Elastic.InOut)
            .onUpdate(fadeUpdate)
            .onComplete(fadeOutComplete)
            .start();
    };

    function fadeUpdate()
    {
        spinner.outerRadius = this.outerRadius;
        spinner.innerRadius = this.innerRadius;
        spinner.rotationSpeed = this.rotationSpeed;
        spinner.tickWidth = this.tickWidth;
        spinner.tickAlpha = this.alpha;
    }

    function fadeOutComplete()
    {
        isAnimating = false;
    }

    init();

    return this;
}