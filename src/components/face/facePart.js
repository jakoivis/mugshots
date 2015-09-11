
"use strict";

var extend = require("extend");
var Graphic = require("Graphic");
var Bounds = require("./bounds.js");
var ImageDataUtil = require("../../utils/imageDataUtil.js");
var CanvasUtil = require("../../utils/canvasUtil.js");

module.exports = FacePart;

// extend(FacePart, Graphic);

/**
 * @param {object} options  ImageLoaderItem
 */
function FacePart(options)
{
    // FacePart.superconstructor.call(this, options);

    if (!(this instanceof FacePart))
    {
        return new FacePart(options);
    }

    var me = this;

    // var settings;

    // var width;
    // var height;

    var bounds;

    // Object.defineProperty(this, "bounds", {
    //     get: function() { return bounds; }
    // });

    function init()
    {
        var imageData = CanvasUtil.getImageDataFromTag(options.tag);

        bounds = new Bounds(getBitmapAlphaBounds(imageData));

        // bounds.bottom = options.boundsBottom;
        // bounds.top = options.boundsTop;
        // bounds.left = options.boundsLeft;
        // bounds.right = options.boundsRight;

        console.log(bounds.width, bounds.height);

        me.groupName = options.groupName;

        var bitmap = new createjs.Bitmap(options.tag);

        // settings = defaultFacePartSettings[options.groupName];
    //     me.reset();
    }

    function getBitmapAlphaBounds(imageData)
    {
        var imageData8ClampedView = imageData.data;
        var imageData32View = new Uint32Array(imageData8ClampedView.buffer);

        return ImageDataUtil.getBounds(
                            imageData32View,
                            imageData.width,
                            imageData.height,
                            BITMAP_ALPHA_TOLERANCE);
    }

    // me.reset = function()
    // {
    //     width = me.getImageData().width;
    //     height = me.getImageData().height;

    //     me.x = settings.defaultRect.x;
    //     me.y = settings.defaultRect.y;
    // };

    // me.setRandomYPosition = function()
    // {
    //     me.y = settings.defaultRect.y + getRandomInt(settings.rangeY.min, settings.rangeY.max);
    // };

    // me.getInnerDebugBoundSettings = function()
    // {
    //     var globalBounds = localToGlobal(bounds);

    //     return {
    //         x: globalBounds.left,
    //         y: globalBounds.top,
    //         width: globalBounds.width,
    //         height: globalBounds.height,
    //         color: settings.debugColor1
    //     };
    // };

    // me.getOuterDebugBoundSettings = function()
    // {
    //     return {
    //         x: me.x,
    //         y: me.y,
    //         width: width,
    //         height: height,
    //         color: settings.debugColor2
    //     };
    // };

    // function localToGlobal(bounds)
    // {
    //     var globalBounds = bounds.clone();
    //     globalBounds.translate(me.x, me.y);
    //     return globalBounds;
    // }

    // me.getGlobalBounds = function()
    // {
    //     return localToGlobal(bounds);
    // };

    // function getRandomInt(min, max)
    // {
    //     return Math.floor(Math.random() * (max - min)) + min;
    // }

    init();

    return this;
}

FacePart.getFacePartWithLowerBitmap = function(facepart1, facepart2)
{
    // if(facepart1.getGlobalBounds().bottom < facepart2.getGlobalBounds().bottom)
    // {
    //     return facepart1;
    // }
    // else
    // {
    //     return facepart2;
    // }
};

var BITMAP_ALPHA_TOLERANCE = 210;

var defaultFacePartSettings = {
    various: {
        defaultRect: {x:0, y:0},
        debugColor1: "#000000"
    },

    nose: {
        defaultRect: {x:217, y:278, width:126, height:172},
        rangeY: {min: -20, max: 20},
        rangeX: {min: 0, max: 0},
        debugColor1: "#00FF00",
        debugColor2: "#90FF90"
    },

    mouth: {
        defaultRect: {x:187, y:399, width:199, height:214},
        rangeY: {min: 0, max: 0},
        rangeX: {min: 0, max: 0},
        debugColor1: "#FF0000",
        debugColor2: "#FF9090"
    },

    chin: {
        defaultRect: {x:82, y:254, width:397, height:401},
        rangeY: {min: 0, max: 0},
        rangeX: {min: 0, max: 0},
        debugColor1: "#0000FF",
        debugColor2: "#9090FF"
    },

    lefteye: {
        defaultRect: {x:133, y:233, width:168, height:141},
        rangeY: {min: -15, max: 30},
        rangeX: {min: 0, max: 0},
        debugColor1: "#FFFF00",
        debugColor2: "#FFFF90"
    },

    righteye: {
        defaultRect: {x:265, y:233, width:160, height:141},
        rangeY: {min: -15, max: 30},
        rangeX: {min: 0, max: 0},
        debugColor1: "#00FFFF",
        debugColor2: "#90FFFF"
    }
};