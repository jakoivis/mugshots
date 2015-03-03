
"use strict";

var amplify = require("amplify").amplify;
var extend = require("extend");
var Layer = require("Layer");
var TWEEN = require("tween.js");

var Spinner = require("../components/spinner.js");

var TOPICS = require("../topics.js");

module.exports = PreloadLayer;

extend(PreloadLayer, Layer);

function PreloadLayer(options)
{
    PreloadLayer.superconstructor.call(this, options);

    var me = this;
    var spinner;

    var isAnimating = true;

    var spinnerHidden = {
        alpha: 0,
        outerRadius: 60,
        innerRadius: 40,
        rotationSpeed: 0.1,
        tickWidth: 8
    };

    var spinnerVisible = {
        alpha: 0.5,
        outerRadius: 20,
        innerRadius: 15,
        rotationSpeed: 0.03,
        tickWidth: 4
    };

    function init()
    {
        amplify.subscribe(TOPICS.PRELOAD_COMPLETE, remove);

        spinner = new Spinner();
        spinner.tickColor = 0x444444;
        spinner.tickHighLightColor = 0xEEEEEE;
        spinner.center = {x: 80, y: 620};
        spinner.outerRadius = spinnerVisible.outerRadius;
        spinner.innerRadius = spinnerVisible.innerRadius;
        spinner.tickAlpha = spinnerVisible.alpha;
        spinner.rotationSpeed = spinnerVisible.rotationSpeed;
        spinner.tickWidth = spinnerVisible.tickWidth;

        me.addGraphic(spinner);

        animate();

        doTransition(spinnerHidden, spinnerVisible, 2000);
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

    function remove()
    {
        doTransition(spinnerVisible, spinnerHidden, 4000, function() {
            isAnimating = false;
            document.body.removeChild(me.getCanvas());
        });
    }

    function doTransition(from, to, duration, onComplete)
    {
        onComplete = onComplete || function() {};

        new TWEEN.Tween(clone(from))
            .to(clone(to), duration)
            .easing(TWEEN.Easing.Elastic.InOut)
            .onUpdate(fadeUpdate)
            .onComplete(onComplete)
            .start();
    }

    function fadeUpdate()
    {
        spinner.outerRadius = this.outerRadius;
        spinner.innerRadius = this.innerRadius;
        spinner.rotationSpeed = this.rotationSpeed;
        spinner.tickWidth = this.tickWidth;
        spinner.tickAlpha = this.alpha;
    }

    function clone(obj) {

        var copy = {};

        for (var attr in obj)
        {
            copy[attr] = obj[attr];
        }

        return copy;
    }

    init();

    return this;
}