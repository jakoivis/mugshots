
"use strict";

module.exports = FacePartStack;

function FacePartStack()
{
    if (!(this instanceof FacePartStack))
    {
        return new FacePartStack();
    }

    var me = this;
    var _stack = [];
    var _position = 0;

    Object.defineProperty(this, "length",
    {
        get: function() { return _stack.length; },
    });

    me.getPosition = function()
    {
        return _position;
    };

    me.setPosition = function(position)
    {
        _position = position;
    };

    me.current = function()
    {
        return _stack[_position];
    };

    me.random = function()
    {
        _position = Math.round(Math.random() * (_stack.length-1));

        return me.current();
    };

    me.push = function(facePart)
    {
        _stack.push(facePart);
    };

    return this;
}