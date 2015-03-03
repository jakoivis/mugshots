
"use strict";

var Bounds = function(bounds)
{
    if (!(this instanceof Bounds))
    {
        return new Bounds(bounds);
    }

    var me = this;

    var _left;
    var _right;
    var _top;
    var _bottom;
    var _width;
    var _height;

    function init(bounds)
    {
        me.left = bounds.left;
        me.top = bounds.top;
        me.bottom = bounds.bottom;
        me.right = bounds.right;
    }

    Object.defineProperty(this, "bottom", {
        get: function() { return _bottom; },
        set: function(value)
        {
            if(value !== undefined)
            {
                _bottom = Number(value);
                updateHeight();
            }
        }
    });

    Object.defineProperty(this, "top", {
        get: function() { return _top; },
        set: function(value)
        {
            if(value !== undefined)
            {
                _top = Number(value);
                updateHeight();
            }
        }
    });

    Object.defineProperty(this, "left", {
        get: function() { return _left; },
        set: function(value)
        {
            if(value !== undefined)
            {
                _left = Number(value);
                updateWidth();
            }
        }
    });

    Object.defineProperty(this, "right", {
        get: function() { return _right; },
        set: function(value)
        {
            if(value !== undefined)
            {
                _right = Number(value);
                updateWidth();
            }
        }
    });

    Object.defineProperty(this, "width", {
        get: function() { return _width; }
    });

    Object.defineProperty(this, "height", {
        get: function() { return _height; }
    });

    function updateHeight()
    {
        _height = _bottom - _top;
    }

    function updateWidth()
    {
        _width = _right - _left;
    }

    me.translate = function(x, y)
    {
        me.left = bounds.left + x;
        me.top = bounds.top + y;
        me.bottom = bounds.bottom + y;
        me.right = bounds.right + x;
    };

    me.clone = function()
    {
        return new Bounds(me);
    };

    init(bounds);

    return this;
};

module.exports = Bounds;