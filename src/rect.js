
'use strict';

var Rect = function(left, top, right, bottom)
{
    if (!(this instanceof Rect))
    {
        return new Rect(left, top, right, bottom);
    }

    var _left = left;
    var _right = right;
    var _top = top;
    var _bottom = bottom;
    var _width;
    var _height;

    updateWidth();
    updateHeight();

    Object.defineProperty(this, 'bottom', {
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

    Object.defineProperty(this, 'top', {
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

    Object.defineProperty(this, 'left', {
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

    Object.defineProperty(this, 'right', {
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

    function updateHeight()
    {
        _height = _bottom - _top;
    }

    function updateWidth()
    {
        _width = _right - _left;
    }

    return this;
};

module.exports = Rect;