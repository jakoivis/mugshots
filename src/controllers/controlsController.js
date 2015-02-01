app.controller('FaceCanvasController', ['$scope', '$rootScope', function($scope, $rootScope) {
    
    $scope.random = function() {
        console.log('random');
        $rootScope.$broadcast('changeImages', 'random');
    }
    
}]);