
"use strict";

var Phone = function() {

    this.Container_constructor();

    var me = this;
}

var proto = createjs.extend(Phone, createjs.Container);

module.exports = createjs.promote(Phone, "Container");