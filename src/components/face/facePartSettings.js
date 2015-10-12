
"use strict";

var alpha1 = 0.4;
var alpha2 = 0.1;

var FacePartSettings = {
    BITMAP_ALPHA_TOLERANCE: 210,
    DEBUG_SHOW_BOUNDS: true,
    DEBUG_SHOW_NAMES: true,

    various: {
        defaultRect: {x:0, y:0},
        debugColor1: "#000000"
    },

    background: {
        defaultRect: {x:0, y:0, width:584, height:803},
        rangeY: {min: 0, max: 0},
        rangeX: {min: 0, max: 0},
        debugColor1: "#000000",
        debugColor2: "#909090"
    },

    nose: {
        defaultRect: {x:187, y:279, width:164, height:215},
        rangeY: {min: -20, max: 20},
        rangeX: {min: 0, max: 0},
        debugColor1: "rgba(0,255,0,"+alpha1+")",
        debugColor2: "rgba(125,255,125,"+alpha2+")"
    },

    mouth: {
        defaultRect: {x:147, y:435, width:273, height:275},
        rangeY: {min: 0, max: 0},
        rangeX: {min: 0, max: 0},
        debugColor1: "rgba(255,0,0,"+alpha1+")",
        debugColor2: "rgba(255,125,125,"+alpha2+")"
    },

    chin: {
        defaultRect: {x:82, y:254, width:397, height:401},
        rangeY: {min: 0, max: 0},
        rangeX: {min: 0, max: 0},
        debugColor1: "rgba(0,0,255,"+alpha1+")",
        debugColor2: "rgba(125,125,255,"+alpha2+")"
    },

    lefteye: {
        defaultRect: {x:80, y:225, width:215, height:192},
        rangeY: {min: -20, max: 30},
        rangeX: {min: 0, max: 0},
        debugColor1: "rgba(255,255,0,"+alpha1+")",
        debugColor2: "rgba(255,255,125,"+alpha2+")"
    },

    righteye: {
        defaultRect: {x:260, y:224, width:214, height:193},
        rangeY: {min: -15, max: 30},
        rangeX: {min: 0, max: 0},
        debugColor1: "rgba(0,255,255,"+alpha1+")",
        debugColor2: "rgba(125,255,255,"+alpha2+")"
    }
};

module.exports = FacePartSettings;