
"use strict";

var amplify = require("amplify").amplify;
var extend = require("extend");
var Layer = require("Layer");

var TOPICS = require("../topics.js");

module.exports = HighlightLayer;

extend(HighlightLayer, Layer);

function HighlightLayer(options)
{
    HighlightLayer.superconstructor.call(this, options);

    var me = this;

    function init()
    {
        amplify.subscribe(TOPICS.FACE_PART_ROLL_OVER, itemRollOver);
        amplify.subscribe(TOPICS.FACE_PART_ROLL_OUT, itemRollOut);
    }

    function itemRollOver(data)
    {

    }

    function itemRollOut(data)
    {

    }

    init();

    return this;
}