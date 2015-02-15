
'use strict';

module.exports = FacePartStack;

function FacePartStack()
{
    if (!(this instanceof FacePartStack))
    {
        return new FacePartStack();
    }

    var me = this;

    var stack = [];

    var _position = 0;

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
        return stack[_position];
    };

    me.random = function()
    {
        _position = Math.round(Math.random() * (stack.length-1));

        return me.current();
    };

    me.push = function(facePart)
    {
        stack.push(facePart);
    };

    return this;
}