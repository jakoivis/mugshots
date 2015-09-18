
"use strict";

var Spinner = require("../components/spinner.js");

var SpinnerWithShadow = function(options) {

    if(!(this instanceof SpinnerWithShadow)) {

        return new SpinnerWithShadow(options);
    }

    var me = this;
    var _spinner;
    var _spinnerGlow;
    var _spinnerShadow;
    var _spinnerShadowMask;
    var _spinnerSettings;

    Object.defineProperty(this, "spinner", {
        get: function() { return _spinner; },
    });
    Object.defineProperty(this, "spinnerShadow", {
        get: function() { return _spinnerShadow; },
    });
    Object.defineProperty(this, "spinnerGlow", {
        get: function() { return _spinnerGlow; },
    });

    function init() {

        _spinnerSettings = createSpinnerSettings();

        _spinner = createSpinner();
        _spinnerGlow = createSpinnerGlow();
        _spinnerShadow = createSpinnerShadow();
        _spinnerShadowMask = createSpinnerShadowMask();

        applySpinnerShadowMaskFilter(_spinnerShadow, _spinnerShadowMask);
    }

    me.update = function() {

        _spinner.update();
        _spinnerShadow.update();
        _spinnerShadowMask.updateCache();
        _spinnerShadow.container.updateCache();
    };

    me.show = function() {

        showSpinner();
        showSpinnerShadow();
    };

    function createSpinnerSettings() {

        var x = 200;
        var y = 200;
        var diameter = 44;
        var radius = diameter / 2;
        var shadowOffsetY = diameter + 4;

        return {
            x: x,
            y: y,
            radius: radius,
            diameter: diameter,
            shadowX: x,
            shadowY: y + shadowOffsetY,

            fadeInStart: {
                numberOfTicks: 16,
                alpha: 0,
                outerRadius: 60,
                innerRadius: 40,
                rotationSpeed: 0.1,
                tickWidth: 8,
                tickColor: 0xEEEEEE,
                tickHighLightColor: 0x444444,
                x: radius,
                y: radius
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
        var r = _spinnerSettings.radius;
        var x = _spinnerSettings.x + r;
        var y = _spinnerSettings.y + r;
        var glowRadius = r + 10;

        glow.graphics.beginRadialGradientFill(
                ["rgba(255, 255, 255, 0.5)", "rgba(255, 255, 255, 0)"],
                [0, 1], x, y, 0, x, y, glowRadius)
            .drawCircle(x, y, glowRadius);

        return glow;
    }

    function createSpinner() {

        var spinner = new Spinner(_spinnerSettings.fadeInStart);
        spinner.container.x = _spinnerSettings.x;
        spinner.container.y = _spinnerSettings.y;

        return spinner;
    }

    function createSpinnerShadow() {

        var spinner = new Spinner(_spinnerSettings.fadeInStart);
        var container = spinner.container;

        container.regY = _spinnerSettings.diameter;
        container.scaleY = -1;
        container.x = _spinnerSettings.shadowX;
        container.y = _spinnerSettings.shadowY;

        return spinner;
    }

    function createSpinnerShadowMask() {

        var mask = new createjs.Shape();
        var d = _spinnerSettings.diameter;

        mask.graphics.beginLinearGradientFill(
                ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.4)"],
                [0, 1], 0, 0, 0, d);

        mask.graphics.drawRect(0, 0, d, d);

        mask.cache(0, 0, d, d);

        return mask;
    }

    function applySpinnerShadowMaskFilter(spinner, mask) {
        spinner.container.filters = [new createjs.AlphaMaskFilter(mask.cacheCanvas)];
        spinner.container.cache(0, 0, _spinnerSettings.diameter, _spinnerSettings.diameter);
    }

    function showSpinner() {

        createjs.Tween
            .get(_spinner)
            .to(_spinnerSettings.fadeInEnd, 1000,
                createjs.Ease.bounceOut);
    }

    function showSpinnerShadow() {

        createjs.Tween
            .get(_spinnerShadow)
            .to(_spinnerSettings.fadeInEnd, 1000, createjs.Ease.bounceOut);
    }

    init();
};

module.exports = SpinnerWithShadow;