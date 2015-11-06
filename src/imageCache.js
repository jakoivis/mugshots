
"use strict";

var _ = require("lodash");
var amplify = require("amplify").amplify;

var Topics = require("./topics.js");

var ImageCache = function() {

    var me = this;

    var cache = [];

    me.initialize = function() {

        amplify.subscribe(Topics.PRELOAD_ITEM_COMPLETE, onFileLoadComplete);
        amplify.subscribe(Topics.PRELOAD_COMPLETE, onComplete);
    };

    function onFileLoadComplete(imageLoaderItem) {

        amplify.unsubscribe(Topics.PRELOAD_ITEM_COMPLETE, onFileLoadComplete);

        cache.push(imageLoaderItem);
    }

    function onComplete() {

        amplify.unsubscribe(Topics.PRELOAD_ITEM_COMPLETE, onFileLoadComplete);
        amplify.unsubscribe(Topics.PRELOAD_COMPLETE, onComplete);
    }

    me.getItemByName = function(name) {

        return _.find(cache, {name: name});
    };

    me.getItemsByGroupName = function(groupName) {

        var images = [];

        for(var i = 0; i < cache.length; i++) {

            if(cache[i].groupName === groupName) {

                images.push(groupName);
            }
        }

        return images;
    };
};

module.exports = new ImageCache();