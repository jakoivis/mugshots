
"use strict";

module.exports = Spinner;

function Spinner()
{
    if (!(this instanceof Spinner))
    {
        return new Spinner();
    }

    var me = this;
    var renderContext;

    var _colorCache;
    var _highLightRotation = 0;
    var _rotation = 0;

    var numberOfTicks = 17;
    var tickWidth = 4;
    var innerRadius = 15;
    var outerRadius = 20;
    var rotationSpeed = 0.03;
    var roundEdges = true;
    var tickHighLightColor = 0xFFEEEE;
    var tickColor = 0xFF6666;
    var tickAlpha = 1;
    var fadeDistance = 15;
    var center = {x:100, y:100};

    Object.defineProperty(this, "center", {
        get: function() { return center; },
        set: function(value)
        {
            center = value;
        }
    });

    Object.defineProperty(this, "tickColor", {
        get: function() { return tickColor; },
        set: function(value)
        {
            tickColor = Number(value);
            _colorCache = getColorCache(
                fadeDistance,
                numberOfTicks,
                tickHighLightColor,
                tickColor);
        }
    });

    Object.defineProperty(this, "tickHighLightColor", {
        get: function() { return tickHighLightColor; },
        set: function(value)
        {
            tickHighLightColor = Number(value);
            _colorCache = getColorCache(
                fadeDistance,
                numberOfTicks,
                tickHighLightColor,
                tickColor);
        }
    });

    Object.defineProperty(this, "tickWidth", {
        get: function() { return tickWidth; },
        set: function(value)
        {
            tickWidth = Number(value);
        }
    });

    Object.defineProperty(this, "rotationSpeed", {
        get: function() { return rotationSpeed; },
        set: function(value)
        {
            rotationSpeed = Number(value);
        }
    });

    Object.defineProperty(this, "outerRadius", {
        get: function() { return outerRadius; },
        set: function(value)
        {
            outerRadius = Number(value);
        }
    });

    Object.defineProperty(this, "innerRadius", {
        get: function() { return innerRadius; },
        set: function(value)
        {
            innerRadius = Number(value);
        }
    });

    Object.defineProperty(this, "tickAlpha", {
        get: function() { return tickAlpha; },
        set: function(value)
        {
            tickAlpha = Number(value);
            tickAlpha = tickAlpha > 1 ? 1 : tickAlpha < 0 ? 0 : tickAlpha;
        }
    });

    function init()
    {
        _colorCache = getColorCache(
            fadeDistance,
            numberOfTicks,
            tickHighLightColor,
            tickColor);
    }

    me.update = function()
    {
        updateRotation();
    };

    me.clear = function()
    {
        var left = center.x - outerRadius - tickWidth;
        var top = center.y - outerRadius - tickWidth;
        var width = outerRadius + outerRadius + tickWidth +2;
        var height = width;

        renderContext.clearRect(left, top, width, height);
    };

    me.setRenderContext = function(context)
    {
        renderContext = context;
    };

    me.render = function()
    {
        drawAllTicks();
    };

    function drawAllTicks()
    {
        var stepRadians = (Math.PI*2) / numberOfTicks;

        var radians = _rotation;

        renderContext.lineCap = roundEdges ? "round" : "square";
        renderContext.lineWidth = tickWidth;
        renderContext.globalAlpha = tickAlpha;
        renderContext.globalCompositeOperation = "source-over";

        for(var i = 0; i < numberOfTicks; i++)
        {
            drawTick(radians, i);
            radians += stepRadians;
        }
    }

    function drawTick(radians, tickIndex)
    {
        var innerPoint = pointOnACircle(innerRadius, center, radians);
        var outerPoint = pointOnACircle(outerRadius, center, radians);

        renderContext.strokeStyle = "#" + getColor(tickIndex).toString(16);

        renderContext.beginPath();
        renderContext.moveTo(innerPoint.x, innerPoint.y);
        renderContext.lineTo(outerPoint.x, outerPoint.y);

        renderContext.stroke();

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
        var colorIndex = tickIndex + _highLightRotation;

        if(colorIndex > numberOfTicks)
        {
            colorIndex = colorIndex - numberOfTicks;
        }

        return _colorCache[colorIndex];
    }

    function getColorCache(fadeDistance, numberOfTicks, color1, color2)
    {
        var result = [];
        var i = 0;

        if(fadeDistance > numberOfTicks)
        {
            fadeDistance = numberOfTicks;
        }

        var step = 100 / (fadeDistance-1);
        var gradientPosition = 0;

        for(i = 0; i < fadeDistance; i++)
        {
            result.push(getColorFromGradient(color1, color2, gradientPosition));
            gradientPosition += step;
        }

        for(i = fadeDistance-1; i < numberOfTicks; i++)
        {
            result.push(tickColor);
        }

        return result;
    }

    function getColorFromGradient(color1, color2, value)
    {
        value = value<0?0:value>100?100:value;
        var rgb1 = hexToRgb(color1);
        var rgb2 = hexToRgb(color2);
        var scale = {r:(rgb1.r-rgb2.r)/100, g:(rgb1.g-rgb2.g)/100, b:(rgb1.b-rgb2.b)/100};
        return ((rgb1.r-value*scale.r)<<16|(rgb1.g-value*scale.g)<<8|(rgb1.b-value*scale.b));
    }

    function hexToRgb(hex)
    {
        return {r:(hex & 0xff0000) >> 16, g:(hex & 0x00ff00) >> 8, b:hex & 0x0000ff};
    }

    function rgbToHex(r, g, b)
    {
        return (r<<16 | g<<8 | b);
    }

    function updateRotation()
    {
        _highLightRotation ++;

        if(_highLightRotation >= numberOfTicks)
        {
            _highLightRotation = 0;
        }

        _rotation += rotationSpeed;
    }

    init();

    return this;
}