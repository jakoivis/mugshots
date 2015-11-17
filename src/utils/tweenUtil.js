
"use strict";

var TweenUtil = {

    tween: function tween(target, options, duration, easing, wait) {

        return new Promise(function(resolve)  {

            createjs.Tween
                .get(target)
                .wait(wait || 0)
                .to(options, duration, easing)
                .call(resolve);
        });
    }
};

module.exports = TweenUtil;