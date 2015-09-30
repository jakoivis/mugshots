"use strict";

var ScaleUtil = {

    fit: function (contentWidth, contentHeight, containerWidth, containerHeight) {

        return null;
    },

    /**
     * Scale the dimensions to fill container dimensions while maintaining aspect ratio.
     *
     * @param {number} contentWidth Width that will be scaled
     * @param {number} contentHeight Height that will be scaled
     * @param {number} containerWidth Width of the container that is filled
     * @param {number} containerHeight Height of the container that is filled
     *
     * @return Object containing the width and height dimensions and x and y offsets for centering the scaled dimension relative to the container.
     */
    fill: function(contentWidth, contentHeight, containerWidth, containerHeight) {

        var containerAspect = containerWidth / containerHeight;
        var aspect = contentWidth / contentHeight;
        var result;
        var scale, width, height;

        if(aspect >= containerAspect) {

            // content is wider than container

            width = containerHeight * aspect;
            scale = width / contentWidth;

            result = {
                x: -((width>>1) - (containerWidth>>1)),
                y: 0,
                width: width,
                height: containerHeight,
                scale: scale
            };

        } else {

            // container is wider than content

            height = Math.round(containerWidth / aspect);
            scale = height / contentHeight;

            result = {
                x: 0,
                y: -((height>>1) - (containerHeight>>1)),
                width: containerWidth,
                height: height,
                scale: scale
            };
        }

        return result;
    }
};

module.exports = ScaleUtil;