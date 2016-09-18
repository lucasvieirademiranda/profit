application.config(['$stateProvider', function($stateProvider) {
    
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: '/views/base/login.html'
        })
        .state('home', {
            url: '/home',
            templateUrl: '/views/base/home.html'
        })
        .state('cadastre', {
            url: '/cadastre',
            templateUrl: '/views/base/cadastre.html'
        })
        .state('error', {
            url: '/error',
            templateUrl: '/views/base/error.html' 
        });
        
}]);

application.run(['$rootScope', '$state', function($rootScope, $state) {
    
    $state.go('login');
    
    $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {

        if (toState == 'home')
        {
            
        }

    });
    
}]);