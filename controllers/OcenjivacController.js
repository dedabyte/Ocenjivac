(function(){
    angular
        .module('app')
        .controller('OcenjivacController', ocenjivacController);
    
    function ocenjivacController($scope){
        $scope.ocene = [];
        
        $scope.ponistiOcene = function () {
            $scope.ocene = [];
        };
        
        $scope.dodajOcenu = function (ocena) {
            $scope.ocene.push(ocena);
        };
        
        $scope.izracunajProsek = function () {
            var suma = 0,
                brojOcena = $scope.ocene.length;
            for (var i = 0; i < brojOcena; i++) {
                suma += $scope.ocene[i];
            }                
            //return brojOcena ? Math.round(suma / brojOcena * 100) / 100 : '';
            return brojOcena ? suma / brojOcena : 0;
        };
        
        $scope.obrisiOcenu = function (idx) {
            $scope.ocene.splice(idx, 1);
        };         
    }
})();