
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

    me.getImage = function()
    {
        return image;
    };

    me.getDefaultPosition = function()
    {
        return {
            x:settings.defaultRect.x,
            y:settings.defaultRect.y
        };
    };

    function init()
    {
        settings = defaultFacePartSettings[groupName];
    }

    me.getDebugBounds = function()
    {
        var imageData = CanvasUtil.getImageDataFromTag(image.image);
        var imageData8ClampedView = imageData.data;
        var imageData32View = new Uint32Array(imageData8ClampedView.buffer);

        var bounds = ImageDataUtil.getBounds(imageData32View, imageData.width, imageData.height, BITMAP_ALPHA_TOLERANCE);

        bounds = localToGlobal(bounds);

        var shape = new createjs.Shape();

        shape.graphics
            .setStrokeStyle(1)
            .beginStroke(settings.debugColor)
            .drawRect(bounds.left, bounds.top, bounds.width, bounds.height);

        return shape;
    };

    function localToGlobal(rect)
    {
        return {
            left: rect.left + me.getDefaultPosition().x,
            right: rect.right + me.getDefaultPosition().x,
            top: rect.top + me.getDefaultPosition().y,
            bottom: rect.bottom + me.getDefaultPosition().y,
            width: rect.width,
            height: rect.height
        };
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