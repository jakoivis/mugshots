
"use strict";

var Bounds = require("../../utils/bounds.js");
var ImageDataUtil = require("../../utils/imageDataUtil.js");
var CanvasUtil = require("../../utils/canvasUtil.js");
var FacePartSettings = require("../../components/face/facePartSettings.js");

module.exports = FacePart;

/**
 * @param {object} options                  ImageLoaderItem
 * @param {object} options.tag              Image
 * @param {object} options.boundsBottom     Explicit alpha bound of image. Overriders the calculated value
 * @param {object} options.boundsTop        Explicit alpha bound of image. Overriders the calculated value
 * @param {object} options.boundsLef        Explicit alpha bound of image. Overriders the calculated value
 * @param {object} options.boundsRight      Explicit alpha bound of image. Overriders the calculated value
 */
function FacePart(options) {

    if(!(this instanceof FacePart)) {

        return new FacePart(options);
    }

    var me = this;
    var _settings;
    var _bitmap;
    var _name;
    var _localInnerBounds;

    Object.defineProperty(this, "top", {

        get: function() {

            return _bitmap.y + _localInnerBounds.top;
        },

        set: function(value) {

            _bitmap.y = value - _localInnerBounds.top;
        }
    });

    Object.defineProperty(this, "left", {

        get: function() {

            return _bitmap.x + _localInnerBounds.left;
        },

        set: function(value) {

            _bitmap.x = value - _localInnerBounds.left;
        }
    });

    Object.defineProperty(this, "bottom", {

        get: function() {

            return _bitmap.y + _localInnerBounds.bottom;
        }
    });

    Object.defineProperty(this, "right", {

        get: function() {

            return _bitmap.x + _localInnerBounds.right;
        }
    });

    Object.defineProperty(this, "width", {

        get: function() {

            return _localInnerBounds.width;
        }
    });

    Object.defineProperty(this, "height", {

        get: function() {

            return _localInnerBounds.height;
        }
    });

    Object.defineProperty(this, "localInnerBounds", {

        get: function() {

            return _localInnerBounds;
        }
    });

    Object.defineProperty(this, "bitmap", {

        get: function() { return _bitmap; }
    });

    Object.defineProperty(this, "name", {

        get: function() { return _name; }
    });

    function init() {

        _settings = FacePartSettings[options.groupName];

        initBitmap();
        initBounds();
        initName();
    }

    function initBitmap() {

        _bitmap = new createjs.Bitmap(options.tag);
        _bitmap.width = options.tag.width;
        _bitmap.height = options.tag.height;

        me.resetPosition();
    }

    function initBounds() {

        var imageData = CanvasUtil.getImageDataFromTag(options.tag);

        _localInnerBounds = new Bounds(getBitmapAlphaBounds(imageData));

        if(typeof options.boundsBottom !== "undefined") {

            _localInnerBounds.bottom = options.boundsBottom;
        }

        if(typeof options.boundsTop !== "undefined") {

            _localInnerBounds.top = options.boundsTop;
        }

        if(typeof options.boundsLeft !== "undefined") {

            _localInnerBounds.left = options.boundsLeft;
        }

        if(typeof options.boundsRight !== "undefined") {

            _localInnerBounds.right = options.boundsRight;
        }
    }

    function initName() {

        var result = "";
        var fileNameDigits = /\d{4}/g.exec(options.src);

        if(fileNameDigits && fileNameDigits.length) {

            result += fileNameDigits[0];
        }

        _name = result;
    }

    function getBitmapAlphaBounds(imageData) {

        var imageData8ClampedView = imageData.data;
        var imageData32View = new Uint32Array(imageData8ClampedView.buffer);

        return ImageDataUtil.getBounds(
                            imageData32View,
                            imageData.width,
                            imageData.height,
                            _settings.alphaToleranceBounds);
    }

    me.resetPosition = function() {

        _bitmap.x = _settings.defaultRect.x;
        _bitmap.y = _settings.defaultRect.y;
    };

    me.setRandomYPosition = function() {

        _bitmap.y = _settings.defaultRect.y +
                    getRandomInt(_settings.rangeY.min,
                                 _settings.rangeY.max);
    };

    me.setRandomYPositionBetween = function(min, max) {

        _bitmap.y = getRandomInt(min, max);
    };

    function getRandomInt(min, max) {

        return Math.floor(Math.random() * (max - min)) + min;
    }

    me.getDebugBounds = function() {

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

    function getOuterDebugBoundSettings() {

        return {
            x: _bitmap.x,
            y: _bitmap.y,
            width: _bitmap.width,
            height: _bitmap.height,
            color: _settings.debugColor2
        };
    }

    function getInnerDebugBoundSettings() {

        return {
            x: me.left,
            y: me.top,
            width: me.width,
            height: me.height,
            color: _settings.debugColor1
        };
    }

    init();

    return this;
}