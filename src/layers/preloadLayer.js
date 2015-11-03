
"use strict";

var BasicLayer = require("../layers/basicLayer.js");
var SpinnerWithShadow = require("../components/preloader/spinnerWithShadow.js");

/**
 * This preloader is shown when nothing has been loaded yet.
 * When there is some content loaded, this will be removed.
 *
 * @class
 * @param      {<type>}  options  { description }
 */
function PreloadLayer(options) {

    var me = this;

    var _spinner;
    var _tableShadow;

    me.initialize = function() {

        _tableShadow = new createjs.Shape();
        me.stage.addChild(_tableShadow);

        _spinner = new SpinnerWithShadow();

        _spinner.x = me.stageWidth / 2;
        _spinner.y = me.stageHeight / 2;

        me.stage.addChild(_spinner);
        _spinner.show();

        me.setMousePointerEvents(false);
    };

    me.onResize = function() {

        resizeTableShadowPosition();
    };

    me.onTick = function(event) {

        _spinner.update();

        me.stage.update(event);
    };

    me.onRequiredFilesComplete = function() {

        _spinner.remove(function() {

            me.killAll();
        });

        createjs.Tween
            .get(_tableShadow)
            .to({alpha: 0}, 1500, createjs.Ease.circOut);
    };

    function resizeTableShadowPosition() {

        var canvas = me.stage.canvas;
        var colors = ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.03)", "rgba(0, 0, 0, 0)"];
        var ratios = [0, 0.03, 1];
        var shadowHeight = 75;
        var shadowWidth = canvas.width;

        _tableShadow.graphics.clear();
        _tableShadow.graphics.beginLinearGradientFill(colors, ratios, 0, 0, 0, shadowHeight);
        _tableShadow.graphics.drawRect(0, 0, shadowWidth, shadowHeight);

        _tableShadow.y = canvas.height / 2;
    }

    me.BasicLayer_constructor(options);
}

createjs.extend(PreloadLayer, BasicLayer);

module.exports = createjs.promote(PreloadLayer, "BasicLayer");