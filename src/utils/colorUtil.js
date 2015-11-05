
"use strict";

var ColorUtil = function() {

    // this.rgbToHex = function(r, g, b) {

    //     return r << 16 | g << 8 | b;
    // };

    this.hexToRgb = function(hex) {

        return {
            r: (hex & 0xff0000) >> 16,
            g: (hex & 0x00ff00) >> 8,
            b: hex & 0x0000ff
        };
    };

    // *
    //  * Calculate a value between 0 to 100 where 0 is darkest and 100 is brightest.
    //  *
    //  * @method     getBrightness
    //  * @param      {number}  hex     Color
    //  * @return     {number}

    // this.getBrightness = function(hex) {

    //     return hex / 0xffffff * 100;
    // };

    // this.getRandomColor = function() {

    //     return Math.round(Math.random()*0xFFFFFF);
    // };

    /**
     * @param Gradient color1
     * @param Gradient color2
     * @param value Number value from 0 to 1
     * @return Color between two values.
     */
    this.getRGBFromGradient = function(color1, color2, value) {

        value = value<0?0:value>100?100:value;

        var rgb1 = this.hexToRgb(color1);
        var rgb2 = this.hexToRgb(color2);

        var scale = {
            r: (rgb1.r - rgb2.r) /100,
            g: (rgb1.g - rgb2.g) /100,
            b: (rgb1.b - rgb2.b) /100
        };


        return "rgba(" +
            Math.round(rgb1.r - value * scale.r) + "," +
            Math.round(rgb1.g - value * scale.g) + "," +
            Math.round(rgb1.b - value * scale.b) + ",1)";

        // return (
        //     (rgb1.r - value * scale.r) << 16 |
        //     (rgb1.g - value * scale.g) << 8 |
        //     (rgb1.b - value * scale.b)
        // );
    };

    // /**
    //  * @param colors Several color values
    //  * @param value Number value
    //  * @param min Minimum of the value
    //  * @param max Maximum of the value
    //  * @return Color from the colors gradient array at the position indicated with value parameter.
    //  */
    // this.getColorAtValue = function(colors:Array, value:Number, min:int=0, max:int=100):uint
    // {
    //     if(colors.length==1) return colors[0];
    //     var v:int = (value<min?min:value>max?max:value)-min;
    //     var s:int = max-min;
    //     var l:int = colors.length-1;
    //     var i:int = Math.floor(v/s*l);// index of the color
    //     var pl:Number = s/l;// length of one part
    //     var nv:Number = (v%pl)/pl*100;// new value. the value between two color values and scale is 0-100
    //     return getGetColorFromGradient(colors[i],colors[i+1]?colors[i+1]:colors[i],nv);
    // }

    // /**
    //  * Returns a random color value that is not too dark and not too bright
    //  */
    // this.getRandomColorFromBrightnessRange = function(minBrightness:uint=40, maxBrightness:uint=70):uint
    // {
    //     var color:uint = getRandomColor();
    //     var brightness:int = getBrightness( color );
    //     if( brightness < minBrightness )
    //         color = brightenColor(color,minBrightness);
    //     else if( brightness > maxBrightness )
    //         color = darkenColor(color,maxBrightness);
    //     return color;
    // }

    // this.brightness = function(hex:Number):Number{
    //     var max:Number=0;
    //     var rgb:Object=hexToRgb(hex);
    //     if(rgb.r>max)
    //         max=rgb.r;
    //     if(rgb.g>max)
    //         max=rgb.g;
    //     if(rgb.b>max)
    //         max=rgb.b;
    //     max/=255;
    //     return max;
    // }

    // this.brightenColor = function(hexColor:Number, percent:Number):Number {
    //     if(isNaN(percent))
    //         percent=0;
    //     if(percent>100)
    //         percent=100;
    //     if(percent<0)
    //         percent=0;

    //     var factor:Number=percent/100;
    //     var rgb:Object=hexToRgb(hexColor);

    //     rgb.r+=(255-rgb.r)*factor;
    //     rgb.b+=(255-rgb.b)*factor;
    //     rgb.g+=(255-rgb.g)*factor;

    //     return rgbToHex(Math.round(rgb.r),Math.round(rgb.g),Math.round(rgb.b));
    // }

    // this.darkenColor = function(hexColor, percent) {
    //     if(isNaN(percent))
    //         percent=0;
    //     if(percent>100)
    //         percent=100;
    //     if(percent<0)
    //         percent=0;

    //     var factor:Number=1-(percent/100);
    //     var rgb:Object=hexToRgb(hexColor);

    //     rgb.r*=factor;
    //     rgb.b*=factor;
    //     rgb.g*=factor;

    //     return rgbToHex(Math.round(rgb.r),Math.round(rgb.g),Math.round(rgb.b));
    // }
};

module.exports = new ColorUtil();