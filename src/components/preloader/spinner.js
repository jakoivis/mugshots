
"use strict";

/**
 * Spinning loading indicator
 */
function Spinner(options) {

    if(!(this instanceof Spinner)) {

        return new Spinner();
    }

    this.Container_constructor();

    var me = this;
    var _colorCache;
    var _highLightRotation = 0;
    var _rotation = 0;

    var _numberOfTicks = 17;
    var _centerX = 0;
    var _centerY = 0;
    var _lineCaps = "round";
    var _tickColor = 0xFF6666;
    var _tickHighLightColor = 0xFFEEEE;
    var _tickWidth = 4;
    var _rotationSpeed = 0.03;
    var _outerRadius = 20;
    var _innerRadius = 15;
    var _alpha = 1;

    var _fadeDistance = 15;

    Object.defineProperty(this, "numberOfTicks", {

        get: function() { return _numberOfTicks; },

        set: function(value) {

            var castedValue = Number(value);

            if(_numberOfTicks !== castedValue) {

                _numberOfTicks = castedValue;
                updateColorCache();
            }
        }
    });

    Object.defineProperty(this, "centerX", {

        get: function() { return _centerX; },

        set: function(value) {

            _centerX = Number(value);
        }
    });

    Object.defineProperty(this, "centerY", {

        get: function() { return _centerY; },

        set: function(value) {

            _centerY = Number(value);
        }
    });

    Object.defineProperty(this, "lineCaps", {

        get: function() { return _lineCaps; },

        set: function(value) {

            _lineCaps = value;
        }
    });

    Object.defineProperty(this, "tickColor", {

        get: function() { return _tickColor; },

        set: function(value) {

            var castedValue = Number(value);

            if(_tickColor !== castedValue) {

                _tickColor = castedValue;
                updateColorCache();
            }
        }
    });

    Object.defineProperty(this, "tickHighLightColor", {

        get: function() { return _tickHighLightColor; },

        set: function(value) {

            var castedValue = Number(value);

            if(_tickHighLightColor !== castedValue) {

                _tickHighLightColor = castedValue;
                updateColorCache();
            }
        }
    });

    Object.defineProperty(this, "tickWidth", {

        get: function() { return _tickWidth; },

        set: function(value) {

            _tickWidth = Number(value);
        }
    });

    Object.defineProperty(this, "rotationSpeed", {

        get: function() { return _rotationSpeed; },

        set: function(value) {

            _rotationSpeed = Number(value);
        }
    });

    Object.defineProperty(this, "outerRadius", {

        get: function() { return _outerRadius; },

        set: function(value) {

            _outerRadius = Number(value);
        }
    });

    Object.defineProperty(this, "innerRadius", {

        get: function() { return _innerRadius; },

        set: function(value) {

            _innerRadius = Number(value);
        }
    });

    Object.defineProperty(this, "alpha", {

        get: function() { return _alpha; },

        set: function(value) {

            _alpha = Number(value);
            _alpha = _alpha > 1 ? 1 : _alpha < 0 ? 0 : _alpha;
        }
    });

    Object.defineProperty(this, "fadeDistance", {

        get: function() { return _fadeDistance; },

        set: function(value) {

            var castedValue = Number(value);

            if(_fadeDistance !== castedValue) {

                _fadeDistance = castedValue;
                updateColorCache();
            }
        }
    });

    function init() {

        me.setOptions(options);
        updateColorCache();
    }

    me.setOptions = function(opts) {

        for(var propertyName in opts) {

            if(me.hasOwnProperty(propertyName)) {

                me[propertyName] = opts[propertyName];
            }
        }
    };

    /**
     * Update spinner animation
     */
    me.update = function() {

        updateRotation();
        updateHighlightRotation();
        me.removeAllChildren();
        createTickShapes();
    };

    function updateRotation() {

        _rotation += _rotationSpeed;
    }

    function updateHighlightRotation() {

        _highLightRotation --;

        if(_highLightRotation < 0) {

            _highLightRotation = _numberOfTicks-1;
        }
    }

    function createTickShapes() {

        var stepRadians = (Math.PI*2) / _numberOfTicks;
        var radians = _rotation;
        var tickShape;

        for(var i = 0; i < _numberOfTicks; i++) {

            tickShape = createTickShape(radians, i);
            me.addChild(tickShape);
            radians += stepRadians;
        }
    }

    function createTickShape(radians, tickIndex) {

        var tickShape = new createjs.Shape();
        var center = {x: _centerX, y: _centerY};
        var innerPoint = pointOnACircle(_innerRadius, center, radians);
        var outerPoint = pointOnACircle(_outerRadius, center, radians);
        var color = "#" + getColor(tickIndex).toString(16);

        tickShape.alpha = _alpha;

        tickShape
            .graphics
            .setStrokeStyle(_tickWidth, _lineCaps)
            .beginStroke(color)
            .moveTo(innerPoint.x, innerPoint.y)
            .lineTo(outerPoint.x, outerPoint.y);

        return tickShape;
    }

    function pointOnACircle(radius, center, randians) {

        var result = {
            x: center.x + radius * Math.cos(randians),
            y: center.y + radius * Math.sin(randians)
        };

        return result;
    }

    function getColor(tickIndex) {

        var colorIndex = tickIndex + _highLightRotation;

        if(colorIndex > _numberOfTicks) {

            colorIndex = colorIndex - _numberOfTicks;
        }

        return _colorCache[colorIndex];
    }

    function updateColorCache() {

        _colorCache = createColorCache(
                        _fadeDistance,
                        _numberOfTicks,
                        _tickHighLightColor,
                        _tickColor);
    }

    function createColorCache(fadeDistance, numberOfTicks, color1, color2) {

        var result = [];
        var i = 0;

        if(fadeDistance > numberOfTicks) {

            fadeDistance = numberOfTicks;
        }

        var step = 100 / (fadeDistance -1);
        var gradientPosition = 0;

        for(i = 0; i < fadeDistance; i++) {

            result.push(getColorFromGradient(color1, color2, gradientPosition));
            gradientPosition += step;
        }

        for(i = fadeDistance -1; i < numberOfTicks; i++) {

            result.push(_tickColor);
        }

        return result;
    }

    function getColorFromGradient(color1, color2, value) {

        value = value < 0 ? 0 : value > 100 ? 100 : value;

        var rgb1 = hexToRgb(color1);
        var rgb2 = hexToRgb(color2);

        var scale = {
            r: (rgb1.r - rgb2.r) /100,
            g: (rgb1.g - rgb2.g) /100,
            b: (rgb1.b - rgb2.b) /100
        };

        return ((rgb1.r - value * scale.r) << 16 |
                (rgb1.g - value * scale.g) << 8 |
                (rgb1.b - value * scale.b));
    }

    function hexToRgb(hex) {

        return {
            r: (hex & 0xff0000) >> 16,
            g: (hex & 0x00ff00) >> 8,
            b: hex & 0x0000ff
        };
    }

    function rgbToHex(r, g, b) {

        return (r << 16 | g << 8 | b);
    }

    init();

    return this;
}

var proto = createjs.extend(Spinner, createjs.Container);

module.exports = createjs.promote(Spinner, "Container");