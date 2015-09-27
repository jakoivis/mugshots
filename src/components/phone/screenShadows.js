
"use strict";

var ScreenShadows = function(screenBounds, shadowSize) {

    this.Shape_constructor();

    var color1 = "rgba(0, 0, 0, 0.5)";
    var color2 = "rgba(0, 0, 0, 0.3)";
    var color3 = "rgba(0, 0, 0, 0)";
    var colors, ratios, gradX1, gradY1, gradX2, gradY2, x, y, w, h;
    var graphics = this.graphics;

    colors = [color1, color2, color3];
    ratios = [0, 0.3, 1];

    x = 0;
    y = 0;
    w = screenBounds.width;
    h = shadowSize;
    gradX1 = 0;
    gradY1 = 0;
    gradX2 = 0;
    gradY2 = shadowSize;

    graphics.beginLinearGradientFill(colors, ratios, gradX1, gradY1, gradX2, gradY2);
    graphics.drawRect(x, y, w, h);

    x = 0;
    y = 0;
    w = shadowSize;
    h = screenBounds.height;
    gradX1 = 0;
    gradY1 = 0;
    gradX2 = shadowSize;
    gradY2 = 0;

    graphics.beginLinearGradientFill(colors, ratios, gradX1, gradY1, gradX2, gradY2);
    graphics.drawRect(x, y, w, h);

    colors = [color3, color2, color1];
    ratios = [0, 0.7, 1];

    x = screenBounds.width - shadowSize;
    y = 0;
    w = shadowSize;
    h = screenBounds.height;
    gradX1 = x;
    gradY1 = 0;
    gradX2 = screenBounds.width;
    gradY2 = 0;

    graphics.beginLinearGradientFill(colors, ratios, gradX1, gradY1, gradX2, gradY2);
    graphics.drawRect(x, y, w, h);

    x = 0;
    y = screenBounds.height - shadowSize;
    w = screenBounds.width;
    h = shadowSize;
    gradX1 = 0;
    gradY1 = y;
    gradX2 = 0;
    gradY2 = screenBounds.height;

    graphics.beginLinearGradientFill(colors, ratios, gradX1, gradY1, gradX2, gradY2);
    graphics.drawRect(x, y, w, h);
};

createjs.extend(ScreenShadows, createjs.Shape);

module.exports = createjs.promote(ScreenShadows, "Shape");