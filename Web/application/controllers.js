application.controller("LoginController", ['$scope', '$state', function($scope, $state) {
    
    $scope.user = {};
    
    $scope.login = function() {
        
        
        
    };
    
    $scope.clear = function () {
        
        delete $scope.user.email;
        delete $scope.user.password;
        
    };
    
}]);

application.controller("CadastreController", ['$scope', '$state', function($scope) {
    
    $scope.user = {};
    
    $scope.cadastre = function() {
        
    };
    
    $scope.back = function() {
        
    };
    
}])