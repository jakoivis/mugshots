
"use strict";

var BasicLayer = function(options) {

    var me = this;

    Object.defineProperty(this, "canvas", {

        get: function() { return me.stage.canvas; }
    });

    function init() {

        var canvas = document.getElementById(options.target);

        me.stage = new createjs.Stage(canvas);

        window.addEventListener("resize", resize);

        resize();

        if(me.tick) {

            createjs.Ticker.on("tick", me.tick);
        }

        if(me.initialize) {

            me.initialize();
        }
    }

    function resize() {

        me.canvas.width = window.innerWidth;
        me.canvas.height = window.innerHeight;

        if(me.resize) {

            me.resize();
        }

        me.stage.update();
    }

    init();
};

module.exports = BasicLayer;