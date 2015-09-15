
"use strict";

var FacePartSettings = {
    BITMAP_ALPHA_TOLERANCE: 210,

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
        debugColor1: "#00FF00",
        debugColor2: "#90FF90"
    },

    mouth: {
        defaultRect: {x:147, y:435, width:273, height:275},
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
        defaultRect: {x:80, y:225, width:215, height:192},
        rangeY: {min: -20, max: 30},
        rangeX: {min: 0, max: 0},
        debugColor1: "#FFFF00",
        debugColor2: "#FFFF90"
    },

    righteye: {
        defaultRect: {x:260, y:224, width:214, height:193},
        rangeY: {min: -15, max: 30},
        rangeX: {min: 0, max: 0},
        debugColor1: "#00FFFF",
        debugColor2: "#90FFFF"
    }
};

module.exports = FacePartSettings;