
"use strict";

module.exports = Spinner;

/**
 * Spinning loading indicator
 */
function Spinner(options)
{
    if (!(this instanceof Spinner))
    {
        return new Spinner();
    }

    var me = this;
    var colorCache;
    var highLightRotation = 0;
    var rotation = 0;

    var container = new createjs.Container();

    Object.defineProperty(this, "container", {

        /**
         * @return {object} Easeljs Container
         */
        get: function() { return container; },
    });

    var numberOfTicks = 17;

    Object.defineProperty(this, "numberOfTicks", {

        get: function() { return numberOfTicks; },
        set: function(value)
        {
            var castedValue = Number(value);

            if(numberOfTicks !== castedValue)
            {
                numberOfTicks = castedValue;
                updateColorCache();
            }
        }
    });

    var x = 0;

    Object.defineProperty(this, "x", {
        get: function() { return x; },
        set: function(value)
        {
            x = Number(value);
        }
    });

    var y = 0;

    Object.defineProperty(this, "y", {
        get: function() { return y; },
        set: function(value)
        {
            y = Number(value);
        }
    });

    var lineCaps = "round";
    // TODO: docs butt, round, or square, 0 (butt), 1 (round), and 2 (square)
    Object.defineProperty(this, "lineCaps", {
        get: function() { return lineCaps; },
        set: function(value)
        {
            lineCaps = value;
        }
    });

    var tickColor = 0xFF6666;

    Object.defineProperty(this, "tickColor", {
        get: function() { return tickColor; },
        set: function(value)
        {
            var castedValue = Number(value);

            if(tickColor !== castedValue)
            {
                tickColor = castedValue;
                updateColorCache();
            }
        }
    });

    var tickHighLightColor = 0xFFEEEE;

    Object.defineProperty(this, "tickHighLightColor", {
        get: function() { return tickHighLightColor; },
        set: function(value)
        {
            var castedValue = Number(value);

            if(tickHighLightColor !== castedValue)
            {
                tickHighLightColor = castedValue;
                updateColorCache();
            }
        }
    });

    var tickWidth = 4;

    Object.defineProperty(this, "tickWidth", {
        get: function() { return tickWidth; },
        set: function(value)
        {
            tickWidth = Number(value);
        }
    });

    var rotationSpeed = 0.03;

    Object.defineProperty(this, "rotationSpeed", {
        get: function() { return rotationSpeed; },
        set: function(value)
        {
            rotationSpeed = Number(value);
        }
    });

    var outerRadius = 20;

    Object.defineProperty(this, "outerRadius", {
        get: function() { return outerRadius; },
        set: function(value)
        {
            outerRadius = Number(value);
        }
    });

    var innerRadius = 15;

    Object.defineProperty(this, "innerRadius", {
        get: function() { return innerRadius; },
        set: function(value)
        {
            innerRadius = Number(value);
        }
    });

    var alpha = 1;

    Object.defineProperty(this, "alpha", {
        get: function() { return alpha; },
        set: function(value)
        {
            alpha = Number(value);
            alpha = alpha > 1 ? 1 : alpha < 0 ? 0 : alpha;
        }
    });

    var fadeDistance = 15;

    Object.defineProperty(this, "fadeDistance", {
        get: function() { return fadeDistance; },
        set: function(value)
        {
            var castedValue = Number(value);

            if(fadeDistance !== castedValue)
            {
                fadeDistance = castedValue;
                updateColorCache();
            }
        }
    });

    function init()
    {
        me.setOptions(options);
        updateColorCache();
    }

    me.setOptions = function(opts)
    {
        for(var propertyName in opts)
        {
            if(me.hasOwnProperty(propertyName))
            {
                me[propertyName] = opts[propertyName];
            }
        }
    };

    /**
     * Update spinner animation
     */
    me.update = function()
    {
        updateRotation();
        updateHighlightRotation();
        container.removeAllChildren();
        createTickShapes();
    };

    function updateRotation()
    {
        rotation += rotationSpeed;
    }

    function updateHighlightRotation()
    {
        highLightRotation ++;

        if(highLightRotation >= numberOfTicks)
        {
            highLightRotation = 0;
        }
    }

    function createTickShapes()
    {
        var stepRadians = (Math.PI*2) / numberOfTicks;

        // TODO: fix this assignment
        var radians = rotation;
        var tickShape;

        for(var i = 0; i < numberOfTicks; i++)
        {
            tickShape = createTickShape(radians, i);
            container.addChild(tickShape);
            radians += stepRadians;
        }
    }

    function createTickShape(radians, tickIndex)
    {
        var tickShape = new createjs.Shape();
        var center = {x: x, y: y};
        var innerPoint = pointOnACircle(innerRadius, center, radians);
        var outerPoint = pointOnACircle(outerRadius, center, radians);
        var color = "#" + getColor(tickIndex).toString(16);

        tickShape.alpha = alpha;

        tickShape
            .graphics
            .setStrokeStyle(tickWidth, lineCaps)
            .beginStroke(color)
            .moveTo(innerPoint.x, innerPoint.y)
            .lineTo(outerPoint.x, outerPoint.y);

        return tickShape;
    }

    function pointOnACircle(radius, center, randians)
    {
        var result = {
            x: center.x + radius * Math.cos(randians),
            y: center.y + radius * Math.sin(randians)
        };

        return result;
    }

    function getColor(tickIndex)
    {
        var colorIndex = tickIndex + highLightRotation;

        if(colorIndex > numberOfTicks)
        {
            colorIndex = colorIndex - numberOfTicks;
        }

        return colorCache[colorIndex];
    }

    function updateColorCache()
    {
        colorCache = createColorCache(
                        fadeDistance,
                        numberOfTicks,
                        tickHighLightColor,
                        tickColor);
    }

    function createColorCache(fadeDistance, numberOfTicks, color1, color2)
    {
        var result = [];
        var i = 0;

        if(fadeDistance > numberOfTicks)
        {
            fadeDistance = numberOfTicks;
        }

        var step = 100 / (fadeDistance -1);
        var gradientPosition = 0;

        for(i = 0; i < fadeDistance; i++)
        {
            result.push(getColorFromGradient(color1, color2, gradientPosition));
            gradientPosition += step;
        }

        for(i = fadeDistance -1; i < numberOfTicks; i++)
        {
            result.push(tickColor);
        }

        return result;
    }

    function getColorFromGradient(color1, color2, value)
    {
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

    function hexToRgb(hex)
    {
        return {
            r: (hex & 0xff0000) >> 16,
            g: (hex & 0x00ff00) >> 8,
            b: hex & 0x0000ff
        };
    }

    function rgbToHex(r, g, b)
    {
        return (r << 16 | g << 8 | b);
    }

    init();

    return this;
}