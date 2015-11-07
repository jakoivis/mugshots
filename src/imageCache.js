
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

    /**
     * Get ImageLoaderItem objects from cache that match the given filters
     *
     * @method     getItems
     *
     * @param {object}      filters
     * @param {string[]}    [filters.groupName]     Array of imageLoaderItem group names
     * @param {string[]}    [filters.name]          Array of imageLoaderItem names
     *
     * @return {ImageLoaderItem[]} Array of ImageLoaderItems
     */
    me.getItems = function(filters) {

        var result = [];

        _.forEach(filters, function(values, name) {

            _.forEach(values, function(value) {

                var filter = {};
                filter[name] = value;

                result.concat(_.filter(cache, filter));
            });
        });

        return result;
    };

    me.getItemByName = function(name) {

        return _.find(cache, {name: name});
    };
};

module.exports = new ImageCache();