
"use strict";

var BasicContainer = function(options) {

    this.Container_constructor();

    var me = this;

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
    }

    init();
};

createjs.extend(BasicContainer, createjs.Container);

module.exports = createjs.promote(BasicContainer, "Container");