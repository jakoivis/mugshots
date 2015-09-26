
"use strict";

/**
 * @class
 * @param      {<type>}  options  { description }
 *
 * - stageWidth     getter
 * - stageHeight    getter
 *
 * - initialize
 * - addedToStage
 * - onResize
 * - onTick
 */
var BasicContainer = function(options) {

    var me = this;

    Object.defineProperty(this, "stageWidth", {

        get: function() { return me.stage.canvas.width; }
    });

    Object.defineProperty(this, "stageHeight", {

        get: function() { return me.stage.canvas.height; }
    });

    function init() {

        if(me.initialize) {

            me.initialize();
        }

        me.addEventListener("added", addedToStage);
    }

    function addedToStage() {

        me.removeEventListener("added", addedToStage);

        if(me.addedToStage) {

            me.addedToStage();
        }

        if(me.onResize) {

            window.addEventListener("resize", me.onResize);

            me.onResize();
        }

        if(me.onTick) {

            me.on("tick", me.onTick);
        }
    }

    me.Container_constructor();

    init();
};

createjs.extend(BasicContainer, createjs.Container);

module.exports = createjs.promote(BasicContainer, "Container");