
"use strict";

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

        if(me.resize) {

            window.addEventListener("resize", me.resize);

            me.resize();
        }

        if(me.tick) {

            me.on("tick", me.tick);
        }
    }

    me.Container_constructor();

    init();
};

createjs.extend(BasicContainer, createjs.Container);

module.exports = createjs.promote(BasicContainer, "Container");