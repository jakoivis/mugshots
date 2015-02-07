
var PreloaderList = require('./preloaderList.js');
require('imageLoader');

var Mugshots = function()
{
    var faceResources = {
        various: [],
        lefteye: [],
        righteye: [],
        nose: [],
        mouth: [],
        chin: []
    };

    function init()
    {
        var imageLoader = new ImageLoader({
            images: new PreloaderList().create(),
            onFileComplete: onFileComplete,
            onComplete: onComplete
        });

        console.log(new PreloaderList().create());
    }

    function onFileComplete(item)
    {
        if(!item.isFailed())
        {
            faceResources[item.groupName].push(item.tag);
        }
    }

    function onComplete()
    {
        var x = 0;
    }

    init();
}

module.exports = Mugshots;