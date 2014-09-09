(function(){
    angular
        .module('app')
        .controller('MainController', mainController);
    
    function mainController($scope){
        $scope.tab = 2;    
        
        $scope.promeniTab = function(tab){
            $scope.tab = tab;
        };
    }
})();
