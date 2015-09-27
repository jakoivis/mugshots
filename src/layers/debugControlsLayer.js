
"use strict";

var amplify = require("amplify").amplify;
var TOPICS = require("topics.js");

module.exports = DebugControlsLayer;

function DebugControlsLayer(options) {

    function init() {

        var target = document.getElementById(options.target);

        createButton(target, "Next background", function() {

            amplify.publish(TOPICS.NEXT_BACKGROUND);
        });

        createButton(target, "Next left eye", function() {

            amplify.publish(TOPICS.NEXT_LEFT_EYE);
        });

        createButton(target, "Next right eye", function() {

            amplify.publish(TOPICS.NEXT_RIGHT_EYE);
        });

        createButton(target, "Next mouth", function() {

            amplify.publish(TOPICS.NEXT_MOUTH);
        });

        createButton(target, "Next nose", function() {

            amplify.publish(TOPICS.NEXT_NOSE);
        });
    }

    function createButton(appendTo, label, handler) {

        var button = document.createElement("button");
        var textNode = document.createTextNode(label);

        button.appendChild(textNode);
        button.addEventListener("click", handler);

        appendTo.appendChild(button);
    }

    init();

    return this;
}
