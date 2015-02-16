
'use strict';

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

    var imageAlphaBounds;

    function init()
    {
        settings = defaultFacePartSettings[groupName];

        imageAlphaBounds = getBitmapAlphaBounds();

        me.reset();
    }

    Object.defineProperty(this, 'boundsBottom', {
        get: function() { return imageAlphaBounds.bottom; },
        set: function(value)
        {
            if(value !== undefined)
            {
                imageAlphaBounds.bottom = value;
                imageAlphaBounds.height = imageAlphaBounds.bottom - imageAlphaBounds.top;
            }
        }
    });

    Object.defineProperty(this, 'boundsTop', {
        get: function() { return imageAlphaBounds.top; },
        set: function(value)
        {
            if(value !== undefined)
            {
                imageAlphaBounds.top = value;
                imageAlphaBounds.height = imageAlphaBounds.bottom - imageAlphaBounds.top;
            }
        }
    });

    Object.defineProperty(this, 'boundsLeft', {
        get: function() { return imageAlphaBounds.left; },
        set: function(value)
        {
            if(value !== undefined)
            {
                imageAlphaBounds.left = value;
                imageAlphaBounds.width = imageAlphaBounds.right - imageAlphaBounds.left;
            }
        }
    });

    Object.defineProperty(this, 'boundsRight', {
        get: function() { return imageAlphaBounds; },
        set: function(value)
        {
            if(value !== undefined)
            {
                imageAlphaBounds.right = value;
                imageAlphaBounds.width = imageAlphaBounds.right - imageAlphaBounds.left;
            }
        }
    });

    me.getImage = function()
    {
        return image;
    };

    me.reset = function()
    {
        width = image.image.width;
        height = image.image.height;

        x = settings.defaultRect.x;
        y = settings.defaultRect.y;

        image.x = x;
        image.y = y;
    };

    me.setRandomYPosition = function()
    {
        y = settings.defaultRect.y + getRandomInt(settings.rangeY.min, settings.rangeY.max);
    };

    me.getInnerDebugBounds = function()
    {
        var bounds = localToGlobal(imageAlphaBounds);

        var shape = new createjs.Shape();

        shape.graphics
            .setStrokeStyle(1)
            .beginStroke(settings.debugColor)
            .drawRect(bounds.left, bounds.top, bounds.width, bounds.height);

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

    function localToGlobal(rect)
    {
        return {
            left: rect.left + x,
            right: rect.right + x,
            top: rect.top + y,
            bottom: rect.bottom + y,
            width: rect.width,
            height: rect.height
        };
    }

    function getRandomInt(min, max)
    {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    function getBitmapAlphaBounds()
    {
        var imageData = CanvasUtil.getImageDataFromTag(image.image);
        var imageData8ClampedView = imageData.data;
        var imageData32View = new Uint32Array(imageData8ClampedView.buffer);

        return ImageDataUtil.getBounds(imageData32View, imageData.width, imageData.height, BITMAP_ALPHA_TOLERANCE);
    }

    init();

    return this;
}

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