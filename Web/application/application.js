var application = angular.module('profit', ['ui.router']);

application.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        
        $urlRouterProvider.otherwise('/error');
        
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: '/views/base/login.html'
            })
            .state('home', {
                url: '/home',
                templateUrl: '/views/base/home.html'
            })
            .state('error', {
               url: '/error',
               templateUrl: '/views/base/error.html' 
            });
        
    }
]);

application.run(['$rootScope', '$location', function($rootScope, $location) {
    
    $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
        
        debugger;
        
    });
    
}]);