
"use strict";

module.exports = Spinner;

function Spinner()
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
        get: function() { return container; },
    });

    var numberOfTicks = 17;

    Object.defineProperty(this, "numberOfTicks", {
        get: function() { return numberOfTicks; },
        set: function(value)
        {
            numberOfTicks = value;
            updateColorCache();
        }
    });

    var center = {x:100, y:100};

    Object.defineProperty(this, "center", {
        get: function() { return center; },
        set: function(value)
        {
            center = value;
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
            tickColor = Number(value);
            updateColorCache();
        }
    });

    var tickHighLightColor = 0xFFEEEE;

    Object.defineProperty(this, "tickHighLightColor", {
        get: function() { return tickHighLightColor; },
        set: function(value)
        {
            tickHighLightColor = Number(value);
            updateColorCache();
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

    var tickAlpha = 1;

    Object.defineProperty(this, "tickAlpha", {
        get: function() { return tickAlpha; },
        set: function(value)
        {
            tickAlpha = Number(value);
            tickAlpha = tickAlpha > 1 ? 1 : tickAlpha < 0 ? 0 : tickAlpha;
        }
    });

    var fadeDistance = 15;

    Object.defineProperty(this, "fadeDistance", {
        get: function() { return fadeDistance; },
        set: function(value)
        {
            fadeDistance = Number(value);
            updateColorCache();
        }
    });

    function init()
    {
        updateColorCache();
    }

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
        var innerPoint = pointOnACircle(innerRadius, center, radians);
        var outerPoint = pointOnACircle(outerRadius, center, radians);
        var color = "#" + getColor(tickIndex).toString(16);

        tickShape.alpha = tickAlpha;

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
        colorCache = getColorCache(
                        fadeDistance,
                        numberOfTicks,
                        tickHighLightColor,
                        tickColor);
    }

    function getColorCache(fadeDistance, numberOfTicks, color1, color2)
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