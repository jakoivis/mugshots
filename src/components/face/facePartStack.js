
"use strict";

module.exports = FacePartStack;

function FacePartStack() {

    if(!(this instanceof FacePartStack)) {

        return new FacePartStack();
    }

    var me = this;
    var _stack = [];
    var _position = 0;

    Object.defineProperty(this, "length", {

        get: function() { return _stack.length; }
    });

    Object.defineProperty(this, "position", {

        get: function() { return _position; },

        set: function(value) {

            _position = Number(value);
        }
    });

    me.current = function() {

        return _stack[_position];
    };

    me.random = function() {

        _position = Math.round(Math.random() * (_stack.length-1));

        return me.current();
    };

    me.next = function() {

        _position = _position + 1;

        if(_position >= _stack.length) {

            _position = 0;
        }

        return me.current();
    };

    me.push = function(facePart) {

        _stack.push(facePart);
    };

    return this;
}