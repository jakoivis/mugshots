app.controller('FaceCanvasController', ['$scope', '$rootScope', function($scope, $rootScope) {
    var faceParts = {
        chin: [],
        nose: [],
        mouth: [],
        lefteye: [],
        righteye: []
    };
    
    var faceBackground = null;
    
    $rootScope.$on('preloadFileComplete', function(event, item) {
        var groupName = item.properties.groupName;
        
        if (groupName === 'various') {
            
            if (item.properties.name === 'faceBackground') {
            
                faceBackground = item;
            }
        }
        else {
            
            var imageTag = item.tag;
            var facePart = new FacePart(groupName, imageTag);
            
            faceParts[groupName].push(facePart);
        }
    });
    
    $rootScope.$on('preloadComplete', function(event) {
        var canvas = document.getElementById("face");
        var ctx = canvas.getContext("2d");
        ctx.drawImage(faceBackground.tag, 0, 0);
        
        drawImageOnDefaultPosition('chin', 0);
        drawImageOnDefaultPosition('nose', 0);
        drawImageOnDefaultPosition('mouth', 0);
        drawImageOnDefaultPosition('lefteye', 0);
        drawImageOnDefaultPosition('righteye', 0);
    });
    
    function drawImageOnDefaultPosition(facePartName, index) {
        var image = faceParts[facePartName][index].getImage();
        var x = faceParts[facePartName][index].getDefaultPosition().x;
        var y = faceParts[facePartName][index].getDefaultPosition().y;
        var canvas = document.getElementById("face");
        var ctx = canvas.getContext("2d");
        
        ctx.drawImage(image, x, y);
    }
    
}]);