
'use strict';

module.exports = Spinner;

function Spinner()
{
    if (!(this instanceof Spinner))
    {
        return new Spinner();
    }

    var me = this;
    var renderContext;

    var _colors;
    var _stepRadians;
    var _tickCaps;
    var _highLightRotation;
    var _rotation = 0;

    var numberOfTicks;
    var tickWidth;
    var innerRadius;
    var outerRadius;
    var updateSpeed;
    var rotationSpeed;
    var roundEdges;
    var tickHighLightColor;
    var tickColor;
    var tickAlpha;
    var fadeDistance;
    var center;

    var defaults = {
        numberOfTicks: 17,
        tickWidth: 4,
        innerRadius: 15,
        outerRadius: 40,
        updateSpeed: 40,
        rotationSpeed: 0.03,
        roundEdges: true,
        tickHighLightColor: 0xFFEEEE,
        tickColor: 0xFF6666,
        tickAlpha: 0.5,
        fadeDistance: 15,
        center: {x:100, y:100}
    };

    function init()
    {
        numberOfTicks = defaults.numberOfTicks;
        numberOfTicks = defaults.numberOfTicks;
        tickWidth = defaults.tickWidth;
        innerRadius = defaults.innerRadius;
        outerRadius = defaults.outerRadius;
        updateSpeed = defaults.updateSpeed;
        rotationSpeed = defaults.rotationSpeed;
        roundEdges = defaults.roundEdges;
        tickHighLightColor = defaults.tickHighLightColor;
        tickColor = defaults.tickColor;
        tickAlpha = defaults.tickAlpha;
        fadeDistance = defaults.fadeDistance;
        center = defaults.center;
    }

    me.update = function()
    {

    };

    me.clear = function()
    {

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
        var rotation = 0;

        var stepRadians = (Math.PI*2) / numberOfTicks;

        var radians = rotation;

        for(var i = 0; i < numberOfTicks; i++)
        {
            drawTick(radians, i);
            radians += stepRadians;
        }
    }

    function drawTick(radians)
    {
        var innerPoint = pointOnACircle(innerRadius, center, radians);
        var outerPoint = pointOnACircle(outerRadius, center, radians);

        renderContext.lineCap = roundEdges ? "round" : "square";
        renderContext.lineWidth = tickWidth;
        renderContext.globalAlpha = 1.0;
        renderContext.globalCompositeOperation = "source-over";
        renderContext.strokeStyle = "#660066";

        renderContext.beginPath();
        renderContext.moveTo(innerPoint.x, innerPoint.y);
        renderContext.lineTo(outerPoint.x, outerPoint.y);
        renderContext.closePath();

        renderContext.stroke();

    }

    function updateColors()
    {

    }

    function updateRotation()
    {

    }

    function pointOnACircle(radius, center, randians)
    {
        var result = {
            x: center.x + radius * Math.cos(randians),
            y: center.y + radius * Math.sin(randians)
        };

        return result;
    }

    // private function getColor(indexOfTick)
    // {
    //     var colorIndex = indexOfTick + _highLightRotation;

    //     if(colorIndex > numberOfTicks)
    //     {
    //         colorIndex = colorIndex - numberOfTicks;
    //     }

    //     return _colors[colorIndex];
    // }

    init();

    return this;
}