
"use strict";

var Bounds = require("./bounds.js");
var ImageDataUtil = require("../../utils/imageDataUtil.js");
var CanvasUtil = require("../../utils/canvasUtil.js");
var FacePartSettings = require("./facePartSettings.js");

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
    var bitmapAlphaBounds;
    var bitmap;

    Object.defineProperty(this, "bitmap", {
        get: function() { return bitmap; }
    });

    function init()
    {
        settings = FacePartSettings[options.groupName];

        initBitmap();
        initBounds();
    }

    function initBitmap()
    {
        bitmap = new createjs.Bitmap(options.tag);
        bitmap.width = options.tag.width;
        bitmap.height = options.tag.height;
        me.resetPosition();
    }

    function initBounds()
    {
        var imageData = CanvasUtil.getImageDataFromTag(options.tag);

        bitmapAlphaBounds = new Bounds(getBitmapAlphaBounds(imageData));

        if(typeof options.boundsBottom !== "undefined")
        {
            bitmapAlphaBounds.bottom = options.boundsBottom;
        }

        if(typeof options.boundsTop !== "undefined")
        {
            bitmapAlphaBounds.top = options.boundsTop;
        }

        if(typeof options.boundsLeft !== "undefined")
        {
            bitmapAlphaBounds.left = options.boundsLeft;
        }

        if(typeof options.boundsRight !== "undefined")
        {
            bitmapAlphaBounds.right = options.boundsRight;
        }
    }

    function getBitmapAlphaBounds(imageData)
    {
        var imageData8ClampedView = imageData.data;
        var imageData32View = new Uint32Array(imageData8ClampedView.buffer);

        return ImageDataUtil.getBounds(
                            imageData32View,
                            imageData.width,
                            imageData.height,
                            FacePartSettings.BITMAP_ALPHA_TOLERANCE);
    }

    me.resetPosition = function()
    {
        bitmap.x = settings.defaultRect.x;
        bitmap.y = settings.defaultRect.y;
    };

    me.setRandomYPosition = function()
    {
        me.y = settings.defaultRect.y + getRandomInt(settings.rangeY.min, settings.rangeY.max);
    };

    function getRandomInt(min, max)
    {
        return Math.floor(Math.random() * (max - min)) + min;
    }

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

    function getOuterDebugBoundSettings()
    {
        return {
            x: bitmap.x,
            y: bitmap.y,
            width: bitmap.width,
            height: bitmap.height,
            color: settings.debugColor2
        };
    }

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
    }

    me.getGlobalBounds = function()
    {
        var globalBounds = bitmapAlphaBounds.clone();
        globalBounds.translate(bitmap.x, bitmap.y);
        return globalBounds;
    };

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