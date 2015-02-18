
'use strict';

module.exports = Spinner;

function Spinner()
{
    if (!(this instanceof Spinner))
    {
        return new Spinner();
    }

    var me = this;

    var options = {
        numberOfTicks: 17,
        tickWidth: 4,
        innerRadius: 15,
        outerRadius: 20,
        updateSpeed: 40,
        rotationSpeed: 0.03,
        roundEdges: true,
        tickHighLightColor: 0xFFEEEE,
        tickColor: 0xFF6666,
        tickAlpha: 0.5,
        fadeDistance: 15,
        center: null
    };

    function init()
    {
        updateColors();
    }

    me.update = function()
    {

    };

    function drawTick()
    {

    }

    function updateColors()
    {

    }

    function updateRotation()
    {

    }


    init();

    return this;
}