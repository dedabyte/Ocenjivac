(function(){
    angular
        .module('app')
        .controller('RasporedController', rasporedController);
    
    function rasporedController($scope, RasporedService){
        $scope.data = RasporedService;
        $scope.getVremeCasa = RasporedService.getVremeCasa;
        $scope.promeniSmenu = RasporedService.promeniSmenu;
        $scope.promeniTipSmene = RasporedService.promeniTipSmene;
        $scope.promeniDan = RasporedService.promeniDan;
    }
})();