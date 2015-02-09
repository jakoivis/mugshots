
'use strict';

module.exports = FacePart;

function FacePart(groupName, bitmap)
{
    if (!(this instanceof FacePart))
    {
        return new FacePart(groupName, bitmap);
    }

    var me = this;
    var settings;

    me.getImage = function()
    {
        return bitmap;
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

    init();

    return this;
}

var defaultFacePartSettings = {
    various: {
        defaultRect: {x:0, y:0},
        debugColor: 0x000000
    },

    nose: {
        defaultRect: {x:217, y:278, width:126, height:172},
        debugColor: 0x00FF00
    },

    mouth: {
        defaultRect: {x:187, y:399, width:199, height:214},
        debugColor: 0xFF0000
    },

    chin: {
        defaultRect: {x:82, y:254, width:397, height:401},
        debugColor: 0x0000FF
    },

    lefteye: {
        defaultRect: {x:133, y:233, width:168, height:141},
        debugColor: 0xFFFF00
    },

    righteye: {
        defaultRect: {x:265, y:233, width:160, height:141},
        debugColor: 0x00FFFF
    }
};