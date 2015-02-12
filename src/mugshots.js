
'use strict';

var PreloaderList = require('./preloaderList.js');
require('imageLoader');
var FacePart = require('./facePart.js');

module.exports = Mugshots;

function Mugshots()
{
    var faceResources = {
        various: [],
        lefteye: [],
        righteye: [],
        nose: [],
        mouth: [],
        chin: []
    };

    var currentFaceParts = {
        background: undefined,
        lefteye: undefined,
        righteye: undefined,
        nose: undefined,
        mouth: undefined,
        chin: undefined
    };

    var stage = undefined;
    var debug = undefined;

    function init()
    {
        new ImageLoader({
            images: new PreloaderList().create(),
            onFileComplete: onFileComplete,
            onComplete: onComplete
        });

        var randomButton = document.getElementById('randomButton');
        randomButton.addEventListener('click', randomize);
    }

    function onFileComplete(item)
    {
        if(!item.isFailed())
        {
            var bitmap = new createjs.Bitmap(item.tag);
            var facePart = new FacePart(item.groupName, bitmap);
            faceResources[item.groupName].push(facePart);
        }
    }

    function onComplete()
    {
        stage = new createjs.Stage('face');
        debug = new createjs.Stage('debug');

        currentFaceParts.background = getDefaultImage('various');
        stage.addChild(currentFaceParts.background.getImage());

        currentFaceParts.chin = getDefaultImage('chin');
        stage.addChild(currentFaceParts.chin.getImage());

        currentFaceParts.nose = getDefaultImage('nose');
        stage.addChild(currentFaceParts.nose.getImage());

        currentFaceParts.mouth = getDefaultImage('mouth');
        stage.addChild(currentFaceParts.mouth.getImage());

        currentFaceParts.lefteye = getDefaultImage('lefteye');
        stage.addChild(currentFaceParts.lefteye.getImage());

        currentFaceParts.righteye = getDefaultImage('righteye');
        stage.addChild(currentFaceParts.righteye.getImage());

        stage.update();

        drawDebugBounds();
    }

    function getDefaultImage(facePartName)
    {
        var facePart = faceResources[facePartName][0];
        var image = facePart.getImage();
        var defaultPosition = facePart.getDefaultPosition();

        image.x = defaultPosition.x;
        image.y = defaultPosition.y;

        return facePart;
    }

    function randomize()
    {
        stage.removeChild(currentFaceParts.lefteye.getImage());
        stage.removeChild(currentFaceParts.righteye.getImage());
        stage.removeChild(currentFaceParts.nose.getImage());
        stage.removeChild(currentFaceParts.mouth.getImage());
        stage.removeChild(currentFaceParts.chin.getImage());

        currentFaceParts.chin = getRandomFacePart('chin');
        stage.addChild(currentFaceParts.chin.getImage());

        currentFaceParts.nose = getRandomFacePart('nose');
        stage.addChild(currentFaceParts.nose.getImage());

        currentFaceParts.mouth = getRandomFacePart('mouth');
        stage.addChild(currentFaceParts.mouth.getImage());

        currentFaceParts.lefteye = getRandomFacePart('lefteye');
        stage.addChild(currentFaceParts.lefteye.getImage());

        currentFaceParts.righteye = getRandomFacePart('righteye');
        stage.addChild(currentFaceParts.righteye.getImage());

        stage.update();

        drawDebugBounds();

    }

    function getRandomFacePart(facePartName)
    {
        var faceParts = faceResources[facePartName];
        var randomNumber = getRandomInt(0, faceParts.length);
        var facePart = faceParts[randomNumber];
        var image = facePart.getImage();
        var defaultPosition = facePart.getDefaultPosition();

        image.x = defaultPosition.x;
        image.y = defaultPosition.y;

        return facePart;
    }

    function getRandomInt(min, max)
    {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    function drawDebugBounds()
    {
        debug.removeAllChildren();
        debug.clear();

        debug.addChild(currentFaceParts.chin.getDebugBounds());
        debug.addChild(currentFaceParts.nose.getDebugBounds());
        debug.addChild(currentFaceParts.mouth.getDebugBounds());
        debug.addChild(currentFaceParts.lefteye.getDebugBounds());
        debug.addChild(currentFaceParts.righteye.getDebugBounds());

        debug.update();
    }

    init();
}