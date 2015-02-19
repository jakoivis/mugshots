
'use strict';

var Bounds = require('./bounds.js');

var CanvasUtil = require('./utils/canvasUtil.js');

var ImageDataUtil = require('./utils/imageDataUtil.js');

module.exports = FacePart;

function FacePart(groupName, image)
{
    if (!(this instanceof FacePart))
    {
        return new FacePart(groupName, image);
    }

    var me = this;
    var settings;

    var x;
    var y;
    var width;
    var height;

    var bounds;

    function init()
    {
        settings = defaultFacePartSettings[groupName];

        bounds = new Bounds(getBitmapAlphaBounds());

        me.reset();
    }

    Object.defineProperty(this, 'bounds', {
        get: function() { return bounds; }
    });

    Object.defineProperty(this, 'x', {
        get: function() { return x; },
        set: function(value)
        {
            if(value !== undefined)
            {
                x = Number(value);
                image.x = x;
            }
        }
    });

    Object.defineProperty(this, 'y', {
        get: function() { return y; },
        set: function(value)
        {
            if(value !== undefined)
            {
                y = Number(value);
                image.y = y;
            }
        }
    });

    me.getImage = function()
    {
        return image;
    };

    me.reset = function()
    {
        width = image.getImageData().width;
        height = image.getImageData().height;

        me.x = settings.defaultRect.x;
        me.y = settings.defaultRect.y;
    };

    me.setRandomYPosition = function()
    {
        me.y = settings.defaultRect.y + getRandomInt(settings.rangeY.min, settings.rangeY.max);
    };

    me.getInnerDebugBounds = function()
    {
        var globalBounds = localToGlobal(bounds);

        var shape = new createjs.Shape();

        shape.graphics
            .setStrokeStyle(1)
            .beginStroke(settings.debugColor)
            .drawRect(globalBounds.left, globalBounds.top, globalBounds.width, globalBounds.height);

        return shape;
    };

    me.getOuterDebugBounds = function()
    {
        var shape = new createjs.Shape();

        shape.graphics
            .setStrokeStyle(1)
            .beginStroke(settings.debugColor)
            .drawRect(x, y, width, height);

        return shape;
    };

    function localToGlobal(bounds)
    {
        var globalBounds = bounds.clone();
        globalBounds.translate(x, y);
        return globalBounds;
    }

    me.getGlobalBounds = function()
    {
        return localToGlobal(bounds);
    };

    function getRandomInt(min, max)
    {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function getBitmapAlphaBounds()
    {
        var imageData = image.getImageData();
        var imageData8ClampedView = imageData.data;
        var imageData32View = new Uint32Array(imageData8ClampedView.buffer);

        return ImageDataUtil.getBounds(imageData32View, imageData.width, imageData.height, BITMAP_ALPHA_TOLERANCE);
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

var BITMAP_ALPHA_TOLERANCE = 230;

var defaultFacePartSettings = {
    various: {
        defaultRect: {x:0, y:0},
        debugColor: '#000000'
    },

    nose: {
        defaultRect: {x:217, y:278, width:126, height:172},
        rangeY: {min: -20, max: 20},
        rangeX: {min: 0, max: 0},
        debugColor: '#00FF00'
    },

    mouth: {
        defaultRect: {x:187, y:399, width:199, height:214},
        rangeY: {min: 0, max: 0},
        rangeX: {min: 0, max: 0},
        debugColor: '#FF0000'
    },

    chin: {
        defaultRect: {x:82, y:254, width:397, height:401},
        rangeY: {min: 0, max: 0},
        rangeX: {min: 0, max: 0},
        debugColor: '#0000FF'
    },

    lefteye: {
        defaultRect: {x:133, y:233, width:168, height:141},
        rangeY: {min: -10, max: 20},
        rangeX: {min: 0, max: 0},
        debugColor: '#FFFF00'
    },

    righteye: {
        defaultRect: {x:265, y:233, width:160, height:141},
        rangeY: {min: -10, max: 20},
        rangeX: {min: 0, max: 0},
        debugColor: '#00FFFF'
    }
};