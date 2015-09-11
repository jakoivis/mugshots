
"use strict";

var amplify = require("amplify").amplify;
var Spinner = require("../components/spinner.js");
var TOPICS = require("../topics.js");

module.exports = PreloadLayer;

/**
 * @param           options
 * @param {string}  options.target          Canvas id
 * @param {number}  [options.width]         Canvas width
 * @param {number}  [options.height]        Canvas height
 * @param {boolean} [options.pointerEvents] Canvas pointer events
 *
 * @listens TOPICS.PRELOAD_COMPLETE
 */
function PreloadLayer(options)
{
    var canvas;
    var stage;
    var spinner;

    var spinnerSettings = {

        fadeInStart: {
            alpha: 0,
            outerRadius: 60,
            innerRadius: 40,
            rotationSpeed: 0.1,
            tickWidth: 8,
            tickColor: 0x444444,
            tickHighLightColor: 0xEEEEEE,
            y: 100
        },

        fadeInEnd: {
            alpha: 0.5,
            outerRadius: 20,
            innerRadius: 15,
            rotationSpeed: 0.03,
            tickWidth: 4,
            y: 620
        },

        fadeOutEnd: {
            alpha: 0,
            outerRadius: 60,
            innerRadius: 40,
            rotationSpeed: 0.1,
            tickWidth: 8
        }
    };

    function init()
    {
        initOptions();

        stage = new createjs.Stage(canvas);

        amplify.subscribe(TOPICS.PRELOAD_COMPLETE, removeSpinner);

        createjs.Ticker.setFPS(60);
        createjs.Ticker.on("tick", timerTickHandler);

        showSpinner();
    }

    function initOptions()
    {
        canvas = document.getElementById(options.target);

        if(typeof options.pointerEvents !== "undefined" &&
            Boolean(options.pointerEvents) === false)
        {
            canvas.style["pointer-events"] = "none";
        }

        if(options.width)
        {
            canvas.width = options.width;

            spinnerSettings.fadeInStart.x = options.width >> 1;
        }

        if(options.height)
        {
            canvas.height = options.height;
        }
    }


    function timerTickHandler(event)
    {
        spinner.update();
        stage.update(event);
    }

    function showSpinner()
    {
        spinner = new Spinner(spinnerSettings.fadeInStart);

        stage.addChild(spinner.container);

        createjs.Tween
            .get(spinner)
            .to(spinnerSettings.fadeInEnd, 1000,
                createjs.Ease.bounceOut);
    }

    function removeSpinner()
    {
        createjs.Tween
            .get(spinner)
            .to(spinnerSettings.fadeOutEnd, 1000,
                createjs.Ease.bounceOut);
    }

    init();

    return this;
}