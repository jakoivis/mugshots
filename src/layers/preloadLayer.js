
"use strict";


var amplify = require("amplify").amplify;
// var extend = require("extend");
// var Layer = require("Layer");
// var TWEEN = require("tween.js");

var Spinner = require("../components/spinner.js");

var TOPICS = require("../topics.js");

module.exports = PreloadLayer;

/**
 * @param           options
 * @param {string}  options.target      Canvas id
 * @param {number}  [options.width]     Canvas width
 * @param {number}  [options.height]    Canvas height
 */
function PreloadLayer(options)
{
    // PreloadLayer.superconstructor.call(this, options);

    var me = this;
    var canvas;
    var stage;
    var spinner;

    var spinnerFadeSettings = {

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
        initStage();
        initSubscriptions();

        createjs.Ticker.setFPS(60);
        createjs.Ticker.on("tick", timerTickHandler);

        showSpinner();
    }

    function initOptions()
    {
        canvas = document.getElementById(options.target);

        if(options.width)
        {
            canvas.width = options.width;

            spinnerFadeSettings.fadeInStart.x = options.width >> 1;
        }

        if(options.height)
        {
            canvas.height = options.height;
        }
    }

    function initStage()
    {
        stage = new createjs.Stage(canvas);
    }

    function timerTickHandler(event)
    {
        spinner.update();
        stage.update(event);
    }

    function initSubscriptions()
    {
        amplify.subscribe(TOPICS.PRELOAD_COMPLETE, removeSpinner);
    }

    function showSpinner()
    {
        spinner = new Spinner();

        stage.addChild(spinner.container);

        spinner.setOptions(spinnerFadeSettings.fadeInStart);

        createjs.Tween
            .get(spinner)
            .to(spinnerFadeSettings.fadeInEnd, 1000,
                createjs.Ease.bounceOut);
    }

    function removeSpinner()
    {
        createjs.Tween
            .get(spinner)
            .to(spinnerFadeSettings.fadeOutEnd, 1000,
                createjs.Ease.bounceOut);
    }

    init();

    return this;
}