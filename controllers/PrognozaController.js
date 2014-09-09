(function(){
    angular
        .module('app')
        .controller('PrognozaController', prognozaController);
    
    function prognozaController($scope, OWMService){
        $scope.trenutnoStanje = {};
        $scope.prognoza = [];

        OWMService.vratiSVE().then(function(aData){
            // popuni trenutno stanje
            $scope.trenutnoStanje = aData[0];
            // popuni prognozu
            $scope.prognoza = OWMService.heandlujPrognozu(aData[1])
        });
    }
})();