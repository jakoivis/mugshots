
'use strict';

var FaceLayer = require('./faceLayer.js');
var PreloadLayer = require('./preloadLayer.js');

module.exports = Mugshots;

function Mugshots()
{
    function init()
    {
        var face = new FaceLayer({
            appendToBody: true,
            width: 500,
            height: 700
        });

        var preload = new PreloadLayer({
            appendToBody: true,
            width: 500,
            height: 700
        });
    }

    init();
}