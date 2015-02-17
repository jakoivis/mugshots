
'use strict';

var ImageDataUtil =
{
    getPixel32Alpha: function(imageData, x, y)
    {
        // return bmd.getPixel32(x,y) >> 24 & 0xFF;
    },

    getPixel32AlphaHex: function (imageData, x, y)
    {
        // return (bmd.getPixel32(x,y) >> 24 & 0xFF).toString(16);
    },

    getPixel32Red: function (imageData, x, y)
    {
        // return bmd.getPixel32(x,y) >> 16 & 0xFF;
    },

    getPixel32RedHex: function (imageData, x, y)
    {
        // return (bmd.getPixel32(x,y) >> 16 & 0xFF).toString(16);
    },

    getPixel32Green: function (imageData, x, y)
    {
        // return bmd.getPixel32(x,y) >> 8 & 0xFF;
    },

    getPixel32GreenHex: function (imageData, x, y)
    {
        // return (bmd.getPixel32(x,y) >> 8 & 0xFF).toString(16);
    },

    getPixel32Blue: function (imageData, x, y)
    {
        // return bmd.getPixel32(x,y) & 0xFF;
    },

    getPixel32BlueHex: function (imageData, x, y)
    {
        // return (bmd.getPixel32(x,y) & 0xFF).toString(16);
    },

    getPixel32At: function (uint32Array, width, x, y)
    {
        return uint32Array[y * width + x];
    },

    /**
     * Get the bottom position of an image. Lowest non-transparent pixel y position
     */
    getBoundsBottom: function (uint32Array, width, height, alphaTolerance)
    {
        var x = 0;
        var y = height-1;

        for(; y>=0; y--)
        {
            for(x=0; x<width; x++)
            {
                if((uint32Array[y*width+x] >> 24 & 0xFF) >= alphaTolerance)
                {
                    return y+1;
                }
            }
        }

        return height;
    },

    /**
     * Get the top position of an image. Highest non-transparent pixel y position
     */
    getBoundsTop: function (uint32Array, width, height, alphaTolerance)
    {
        var x = 0;
        var y = 0;

        for(; y<height; y++)
        {
            for(x=0; x<width; x++)
            {
                if((uint32Array[y*width+x] >> 24 & 0xFF) >= alphaTolerance)
                {
                    return y;
                }
            }
        }

        return 0;
    },

    /**
     * Get the left position of an image. Left-most non-transparent pixel x position
     */
    getBoundsLeft: function (uint32Array, width, height, alphaTolerance)
    {
        var x = 0;
        var y = 0;

        for(; x<width; x++)
        {
            for(y=0; y<height; y++)
            {
                if((uint32Array[y*width+x] >> 24 & 0xFF) >= alphaTolerance)
                {
                    return x;
                }
            }
        }

        return 0;
    },

    /**
     * Get the right position of an image. Right-most non-transparent pixel x position
     */
    getBoundsRight: function (uint32Array, width, height, alphaTolerance)
    {
        var x = width-1;
        var y = 0;

        for(; x>=0; x--)
        {
            for(y=0; y<height; y++)
            {
                if((uint32Array[y*width+x] >> 24 & 0xFF) >= alphaTolerance)
                {
                    return x+1;
                }
            }
        }

        return width;
    },

    getBounds: function (uint32Array, width, height, alphaTolerance)
    {
        var rect = {
            top: this.getBoundsTop(uint32Array, width, height, alphaTolerance),
            bottom: this.getBoundsBottom(uint32Array, width, height, alphaTolerance),
            left: this.getBoundsLeft(uint32Array, width, height, alphaTolerance),
            right: this.getBoundsRight(uint32Array, width, height, alphaTolerance)
        };

        return rect;
    }
};

module.exports = ImageDataUtil;