var app = angular.module('App', []);
    
app.controller('MainController', ['$scope', 'preloaderService', function($scope, preloaderService) {
    $scope.testVar = 0;
    
    $scope.$on('preloadComplete', function(event, value) {
        console.log("preloadComplete", value);
    });
    
    $scope.init = function () {
        preloaderService();
    }
    
    $scope.init();
}]);