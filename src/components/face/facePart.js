
"use strict";

var Bounds = require("./bounds.js");
var ImageDataUtil = require("../../utils/imageDataUtil.js");
var CanvasUtil = require("../../utils/canvasUtil.js");

module.exports = FacePart;

/**
 * @param {object} options                  ImageLoaderItem
 * @param {object} options.tag              Image
 * @param {object} options.boundsBottom     Explicit alpha bound of image. Overriders the calculated value
 * @param {object} options.boundsTop        Explicit alpha bound of image. Overriders the calculated value
 * @param {object} options.boundsLef        Explicit alpha bound of image. Overriders the calculated value
 * @param {object} options.boundsRight      Explicit alpha bound of image. Overriders the calculated value
 */
function FacePart(options)
{
    if (!(this instanceof FacePart))
    {
        return new FacePart(options);
    }

    var me = this;
    var settings;
    var bounds;
    var bitmap;

    var width;
    var height;

    Object.defineProperty(this, "bitmap", {
        get: function() { return bitmap; }
    });

    function init()
    {
        var imageData = CanvasUtil.getImageDataFromTag(options.tag);

        bounds = new Bounds(getBitmapAlphaBounds(imageData));
        width = options.tag.width;
        height = options.tag.height;

        if(typeof options.boundsBottom !== "undefined")
        {
            bounds.bottom = options.boundsBottom;
        }

        if(typeof options.boundsTop !== "undefined")
        {
            bounds.top = options.boundsTop;
        }

        if(typeof options.boundsLeft !== "undefined")
        {
            bounds.left = options.boundsLeft;
        }

        if(typeof options.boundsRight !== "undefined")
        {
            bounds.right = options.boundsRight;
        }

        bitmap = new createjs.Bitmap(options.tag);

        settings = defaultFacePartSettings[options.groupName];

        me.reset();
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

    me.reset = function()
    {
        bitmap.x = settings.defaultRect.x;
        bitmap.y = settings.defaultRect.y;
    };

    me.setRandomYPosition = function()
    {
        me.y = settings.defaultRect.y + getRandomInt(settings.rangeY.min, settings.rangeY.max);
    };

    me.getDebugBounds = function()
    {
        var innerBounds = getInnerDebugBoundSettings();
        var outerBounds = getOuterDebugBoundSettings();

        var shape = new createjs.Shape();
        var graphics = shape.graphics;

        graphics.setStrokeStyle(1);
        graphics.beginStroke(innerBounds.color);
        graphics.drawRect(innerBounds.x, innerBounds.y,
                            innerBounds.width, innerBounds.height);
        graphics.beginStroke(outerBounds.color);
        graphics.drawRect(outerBounds.x, outerBounds.y,
                            outerBounds.width, outerBounds.height);

        return shape;
    };

    function getInnerDebugBoundSettings()
    {
        var globalBounds = me.getGlobalBounds();

        return {
            x: globalBounds.left,
            y: globalBounds.top,
            width: globalBounds.width,
            height: globalBounds.height,
            color: settings.debugColor1
        };
    };

    function getOuterDebugBoundSettings()
    {
        return {
            x: bitmap.x,
            y: bitmap.y,
            width: width,
            height: height,
            color: settings.debugColor2
        };
    };

    me.getGlobalBounds = function()
    {
        var globalBounds = bounds.clone();
        globalBounds.translate(bitmap.x, bitmap.y);
        return globalBounds;
    };

    function getRandomInt(min, max)
    {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    init();

    return this;
}

FacePart.getFacePartWithLowerBitmap = function(facepart1, facepart2)
{
    if(facepart1.getGlobalBounds().bottom < facepart2.getGlobalBounds().bottom)
    {
        return facepart1;
    }
    else
    {
        return facepart2;
    }
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