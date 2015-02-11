
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

    var bitmaps = {
        background: undefined,
        lefteye: undefined,
        righteye: undefined,
        nose: undefined,
        mouth: undefined,
        chin: undefined
    };

    var stage = undefined;

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

        bitmaps.background = getDefaultImage('various');
        stage.addChild(bitmaps.background);

        bitmaps.chin = getDefaultImage('chin');
        stage.addChild(bitmaps.chin);

        bitmaps.nose = getDefaultImage('nose');
        stage.addChild(bitmaps.nose);

        bitmaps.mouth = getDefaultImage('mouth');
        stage.addChild(bitmaps.mouth);

        bitmaps.lefteye = getDefaultImage('lefteye');
        stage.addChild(bitmaps.lefteye);

        bitmaps.righteye = getDefaultImage('righteye');
        stage.addChild(bitmaps.righteye);

        stage.update();
    }

    function getDefaultImage(facePartName)
    {
        var facePart = faceResources[facePartName][0];
        var image = facePart.getImage();
        var defaultPosition = facePart.getDefaultPosition();

        image.x = defaultPosition.x;
        image.y = defaultPosition.y;

        return image;
    }

    function randomize()
    {
        // bitmaps.lefteye.image = getRandomFacePartImage('lefteye');
        // bitmaps.righteye.image = getRandomFacePartImage('righteye');
        // bitmaps.nose.image = getRandomFacePartImage('nose');
        // bitmaps.mouth.image = getRandomFacePartImage('mouth');
        // bitmaps.chin.image = getRandomFacePartImage('chin');

        stage.removeChild(bitmaps.lefteye);
        stage.removeChild(bitmaps.righteye);
        stage.removeChild(bitmaps.nose);
        stage.removeChild(bitmaps.mouth);
        stage.removeChild(bitmaps.chin);

        bitmaps.chin = getRandomFacePartImage('chin');
        stage.addChild(bitmaps.chin);

        bitmaps.nose = getRandomFacePartImage('nose');
        stage.addChild(bitmaps.nose);

        bitmaps.mouth = getRandomFacePartImage('mouth');
        stage.addChild(bitmaps.mouth);

        bitmaps.lefteye = getRandomFacePartImage('lefteye');
        stage.addChild(bitmaps.lefteye);

        bitmaps.righteye = getRandomFacePartImage('righteye');
        stage.addChild(bitmaps.righteye);

        stage.update();



        stage.update();
    }

    function getRandomFacePartImage(facePartName)
    {
        var faceParts = faceResources[facePartName];
        var randomNumber = getRandomInt(0, faceParts.length);
        var facePart = faceParts[randomNumber];
        var image = facePart.getImage();
        var defaultPosition = facePart.getDefaultPosition();

        image.x = defaultPosition.x;
        image.y = defaultPosition.y;

        return image;
    }

    function getRandomInt(min, max)
    {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    init();
}