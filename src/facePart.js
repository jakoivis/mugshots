;(function() {
    'use strict';
    
    function FacePart(groupName, imageTag)
    {
        if (!(this instanceof FacePart))
        {
            return new FacePart(options);
        }
        
        var me = this;
        var settings;
        
        init(groupName, imageTag);
        
        me.getImage = function()
        {
            return imageTag;
        }
        
        me.getDefaultPosition = function()
        {
            return {x:settings.defaultRect.x, y:settings.defaultRect.y};
        }
        
        me.test2 = test2;
        
        function init(groupName, imageTag)
        {
            settings = defaultFacePartSettings[groupName];
        }
        
        function test2()
        {
        }
        
        return this;
    }
    
    window.FacePart = FacePart;
    
    var defaultFacePartSettings = {
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
    
})();