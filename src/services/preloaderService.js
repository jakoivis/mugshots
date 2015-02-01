app.factory('preloaderService', ['$rootScope', function($rootScope) {

    return function() {
        
        var preloader = new Preloader({
            images: new PreloaderList().create(),
            onComplete: preloadOnComplete,
            onFileComplete: preloadOnFileComplete
        });
        
        function preloadOnComplete(preloader) {
            $rootScope.$broadcast('preloadComplete'); 
        }
    
        function preloadOnFileComplete(preloader) {
            
            var item = preloader.getLatestReady();
            
            if (item.status === 'complete') {
                
                $rootScope.$broadcast('preloadFileComplete', item); 
            }
            else{
                
                console.log('error loading image');
            }
            
        }
    };
}]);