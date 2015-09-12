
"use strict";

var FacePartSettings = {
    BITMAP_ALPHA_TOLERANCE: 210,

    various: {
        defaultRect: {x:0, y:0},
        debugColor1: "#000000"
    },

    nose: {
        defaultRect: {x:217, y:278, width:126, height:172},
        rangeY: {min: -20, max: 20},
        rangeX: {min: 0, max: 0},
        debugColor1: "#00FF00",
        debugColor2: "#90FF90"
    },

    mouth: {
        defaultRect: {x:187, y:399, width:199, height:214},
        rangeY: {min: 0, max: 0},
        rangeX: {min: 0, max: 0},
        debugColor1: "#FF0000",
        debugColor2: "#FF9090"
    },

    chin: {
        defaultRect: {x:82, y:254, width:397, height:401},
        rangeY: {min: 0, max: 0},
        rangeX: {min: 0, max: 0},
        debugColor1: "#0000FF",
        debugColor2: "#9090FF"
    },

    lefteye: {
        defaultRect: {x:133, y:233, width:168, height:141},
        rangeY: {min: -15, max: 30},
        rangeX: {min: 0, max: 0},
        debugColor1: "#FFFF00",
        debugColor2: "#FFFF90"
    },

    righteye: {
        defaultRect: {x:265, y:233, width:160, height:141},
        rangeY: {min: -15, max: 30},
        rangeX: {min: 0, max: 0},
        debugColor1: "#00FFFF",
        debugColor2: "#90FFFF"
    }
};

module.exports = FacePartSettings;