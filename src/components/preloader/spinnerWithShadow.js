
"use strict";

var Spinner = require("./spinner.js");

var SpinnerWithShadow = function(options) {

    if(!(this instanceof SpinnerWithShadow)) {

        return new SpinnerWithShadow(options);
    }

    var me = this;
    var _container;
    var _spinner;
    var _spinnerGlow;
    var _spinnerShadow;
    var _spinnerShadowMask;
    var _settings;

    Object.defineProperty(this, "container", {

        get: function() { return _container; },
    });

    function init() {

        _settings = createSpinnerSettings();

        _spinner = createSpinner();
        _spinnerGlow = createSpinnerGlow();
        _spinnerShadow = createSpinnerShadow();
        _spinnerShadowMask = createSpinnerShadowMask();

        applySpinnerShadowMaskFilter(_spinnerShadow, _spinnerShadowMask);

        _container = new createjs.Container();
        _container.addChild(_spinnerGlow);
        _container.addChild(_spinner.container);
        _container.addChild(_spinnerShadow.container);
        _container.regX = _settings.radius;
        _container.regY = _settings.diameter;
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

    me.remove = function() {

        removeSpinner();
    };

    function createSpinnerSettings() {

        var x = 0;
        var y = 0;
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
        var r = _settings.radius;
        var x = _settings.x + r;
        var y = _settings.y + r;
        var glowRadius = r + 10;
        var graphics = glow.graphics;
        var colors = ["rgba(255, 255, 255, 0.5)", "rgba(255, 255, 255, 0)"];
        var ratios = [0, 1];

        graphics.beginRadialGradientFill(colors, ratios, x, y, 0, x, y, glowRadius);
        graphics.drawCircle(x, y, glowRadius);

        return glow;
    }

    function createSpinner() {

        var spinner = new Spinner(_settings.fadeInStart);
        spinner.container.x = _settings.x;
        spinner.container.y = _settings.y;

        return spinner;
    }

    function createSpinnerShadow() {

        var spinner = new Spinner(_settings.fadeInStart);
        var container = spinner.container;

        container.regY = _settings.diameter;
        container.scaleY = -1;
        container.x = _settings.shadowX;
        container.y = _settings.shadowY;

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

        spinner.container.filters = [filter];
        spinner.container.cache(0, 0, d, d);
    }

    function showSpinner() {

        createjs.Tween
            .get(_spinner)
            .to(_settings.fadeInEnd, 1000,
                createjs.Ease.bounceOut);

        _spinner.container.y = -200;

        createjs.Tween
            .get(_spinner.container)
            .to({y: 0}, 1000,
                createjs.Ease.bounceOut);
    }

    function showSpinnerShadow() {

        createjs.Tween
            .get(_spinnerShadow)
            .to(_settings.fadeInEnd, 1000, createjs.Ease.bounceOut);
    }

    function removeSpinner() {

        // createjs.Tween
        //     .get(spinner)
        //     .to(spinnerSettings.fadeOutEnd, 1000,
        //         createjs.Ease.bounceOut);
    }

    init();
};

module.exports = SpinnerWithShadow;