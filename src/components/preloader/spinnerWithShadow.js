
"use strict";

var Spinner = require("../../components/preloader/spinner.js");
var BasicContainer = require("../../components/basicContainer.js");

var SpinnerWithShadow = function(options) {

    if(!(this instanceof SpinnerWithShadow)) {

        return new SpinnerWithShadow(options);
    }

    var me = this;
    var _spinner;
    var _spinnerGlow;
    var _spinnerShadow;
    var _spinnerShadowMask;
    var _settings;

    me.initialize = function() {
        _settings = createSpinnerSettings();

        _spinner = new Spinner(_settings.fadeInStart);
        _spinnerGlow = createSpinnerGlow();
        _spinnerShadow = createSpinnerShadow();
        _spinnerShadowMask = createSpinnerShadowMask();

        applySpinnerShadowMaskFilter(_spinnerShadow, _spinnerShadowMask);

        me.addChild(_spinner);
        me.addChild(_spinnerShadow);
        me.regX = _settings.radius;
        me.regY = _settings.height / 2;
    };

    me.update = function() {

        _spinner.update();
        _spinnerShadow.update();
        _spinnerShadowMask.updateCache();
        _spinnerShadow.updateCache();
    };

    me.show = function() {

        createjs.Tween
            .get(_spinner)
            .to(_settings.fadeInEnd, 1000, createjs.Ease.bounceOut);

        createjs.Tween
            .get(_spinnerShadow)
            .to(_settings.fadeInEnd, 1000, createjs.Ease.bounceOut);
    };

    me.remove = function(onComplete) {

        createjs.Tween
            .get(_spinner)
            .to(_settings.fadeOutEnd, 1000, createjs.Ease.bounceOut);

        createjs.Tween
            .get(_spinnerShadow)
            .to(_settings.fadeOutEnd, 1000, createjs.Ease.bounceOut)
            .call(onComplete);
    };


    function createSpinnerSettings() {

        var diameter = 44;
        var radius = diameter / 2;
        var shadowOffsetY = 6;
        var heightWithShadow = diameter * 2 + shadowOffsetY;

        return {
            radius: radius,
            diameter: diameter,
            shadowY: heightWithShadow,
            height: heightWithShadow,

            fadeInStart: {
                numberOfTicks: 16,
                alpha: 0,
                outerRadius: 60,
                innerRadius: 40,
                rotationSpeed: 0.1,
                tickWidth: 8,
                tickColor: 0xEEEEEE,
                tickHighLightColor: 0x444444,

                // by default the origin of spinner is at the center
                // of the spinner. change it to top left corner.
                centerX: radius,
                centerY: radius
            },

            fadeInEnd: {
                alpha: 0.5,
                outerRadius: 20,
                innerRadius: 15,
                rotationSpeed: 0.03,
                tickWidth: 4
            },

            fadeOutEnd: {
                alpha: 0,
                outerRadius: 60,
                innerRadius: 40,
                rotationSpeed: 0.1,
                tickWidth: 8
            }
        };
    }

    function createSpinnerGlow() {

        var glow = new createjs.Shape();
        var r = _settings.radius;
        var x = r;
        var y = r;
        var glowRadius = r + 10;
        var graphics = glow.graphics;
        var colors = ["rgba(255, 255, 255, 0.5)", "rgba(255, 255, 255, 0)"];
        var ratios = [0, 1];

        graphics.beginRadialGradientFill(colors, ratios, x, y, 0, x, y, glowRadius);
        graphics.drawCircle(x, y, glowRadius);

        return glow;
    }

    function createSpinnerShadow() {

        var spinner = new Spinner(_settings.fadeInStart);
        spinner.scaleY = -1;
        spinner.y = _settings.shadowY;

        return spinner;
    }

    function createSpinnerShadowMask() {

        var mask = new createjs.Shape();
        var d = _settings.diameter;
        var graphics = mask.graphics;
        var colors = ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.4)"];
        var ratios = [0, 1];

        graphics.beginLinearGradientFill(colors, ratios, 0, 0, 0, d);
        graphics.drawRect(0, 0, d, d);

        mask.cache(0, 0, d, d);

        return mask;
    }

    function applySpinnerShadowMaskFilter(spinner, mask) {

        var d = _settings.diameter;
        var filter = new createjs.AlphaMaskFilter(mask.cacheCanvas);

        spinner.filters = [filter];
        spinner.cache(0, 0, d, d);
    }

    me.BasicContainer_constructor();
};

var proto = createjs.extend(SpinnerWithShadow, BasicContainer);

module.exports = createjs.promote(SpinnerWithShadow, "BasicContainer");
