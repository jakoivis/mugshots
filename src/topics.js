
"use strict";

/**
 * @readonly
 * @enum {string}
 */
var TOPICS = {

    /**
     * Topic executed once when all the files are loaded
     */
    PRELOAD_COMPLETE: "preloadComplete",

    /**
     * Topic executed for each loaded file
     */
    PRELOAD_ITEM_COMPLETE: "preloadItemComplete",

    /**
     * Topic executed once when all required files are loaded.
     * Intro / loading animations can start.
     */
    PRELOAD_REQUIRED_COMPLETE: "preloadRequiredComplete",

    /**
     * Topic executed once when application has loaded enough to run sufficiently.
     * The whole application can start
     */
    PRELOAD_APPLICATION_START: "preloaderApplicationStart",

    /**
     * Topic executed each time the screen is clicked
     */
    SCREEN_CLICK: "screenClick",

    // for debugging purposes
    RANDOM_POSITIONS: "randomPositions",
    NEXT_BACKGROUND: "nextBackground",
    NEXT_LEFT_EYE: "nextLeftEye",
    NEXT_RIGHT_EYE: "nextRightEye",
    NEXT_MOUTH: "nextMouth",
    NEXT_NOSE: "nextNose"
};

module.exports = TOPICS;

