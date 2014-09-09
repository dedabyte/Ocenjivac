(function(){
    angular
        .module('app')
        .factory('OWMService', OWMService);
    
    function OWMService($http, $q){
        // return
        var OWMService = {
            vratiSVE: vratiSVE,
            heandlujPrognozu: heandlujPrognozu
        }
        //
        
        var promises = [];

        function vratiTrenutnoStanje(){
            var dfrd = $q.defer();
            $http({
                method: 'GET',
                url:'http://api.openweathermap.org/data/2.5/weather?id=3191429&units=metric'
            }).success(function(data){
                dfrd.resolve(data);
            });
            return dfrd.promise;
        }

        function vratiPrognozu(){
            var dfrd = $q.defer();
            $http({
                method: 'GET',
                url:'http://api.openweathermap.org/data/2.5/forecast?id=3191429&units=metric'
            }).success(function(data){
                dfrd.resolve(data);
            });
            return dfrd.promise;
        }
        
        function vratiSVE(){
            promises = [];
            promises.push(vratiTrenutnoStanje());
            promises.push(vratiPrognozu());
            return $q.all(promises);
        }
        
        function heandlujPrognozu(prognoza){
            var time = new Date().getTime();
            return prognoza.list
                .filter(function(item){  // samo prognoza posle sada (OWM šalje i jednu pre)
                    var itemTime = new Date(item.dt_txt).getTime();
                    return itemTime > time;
                })
                .slice(0, 4) // 4 komada stane
                .reverse(); // reverse jer se u view radi float-right koji obrće redosled
        }

        return OWMService;
    }
})();