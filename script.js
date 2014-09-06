var app = angular.module('app', []);

app.directive('ngTap', function () {
    return function (scope, element, attrs) {
        var tapping = false;
        element.bind('touchstart', function (e) {
            element.addClass('active');
            tapping = true;
        });
        element.bind('touchend', function (e) {
            element.removeClass('active');
            if (tapping) {
                scope.$apply(attrs['ngTap'], element);
            }
        });
    };
});



// MAIN
app.controller('MainController', function($scope){
    $scope.tab = 1;    
    $scope.promeniTab = function(tab){
        $scope.tab = tab;
    };
});



// OCENJIVAC
app.controller('OcenjivacController', function ($scope) {
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
});



// RASPORED
app.service('DataSvc', function () {
    function vratiSmenu() {
        // --- get week nuber - http://stackoverflow.com/a/6117889
        var d = new Date();
        d.setHours(0,0,0);
        d.setDate(d.getDate() + 4 - (d.getDay()||7));
        var yearStart = new Date(d.getFullYear(),0,1);
        var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7)
        // ---
        return weekNo % 2 === 0 ? '1' : '2'; // parna prepodne, neparna popodne
    }
    
    var dani = ['pon','uto','sre','cet','pet'];
    var vratiDanasnjiDan = function(){
        return dani[new Date().getDay()-1];
    };
    
    var smene = {
        normalno: {
            '1': {
                '1': { start: '08:00', end: '08:45'},
                '2': { start: '08:50', end: '09:35'},
                '3': { start: '09:40', end: '10:25'},
                '4': { start: '10:35', end: '11:20'},
                '5': { start: '11:25', end: '12:10'},
                '6': { start: '12:15', end: '12:55'},
                '7': { start: '13:00', end: '13:30'}
            },
            '2': {
                '1': { start: '13:45', end: '14:30'},
                '2': { start: '14:35', end: '15:20'},
                '3': { start: '15:25', end: '16:10'},
                '4': { start: '16:20', end: '17:05'},
                '5': { start: '17:10', end: '17:55'},
                '6': { start: '18:00', end: '18:35'},
                '7': { start: '18:40', end: '19:15'}
            }
        },
        skraceno: {
            '1': {
                '1': { start: '08:00', end: '08:30'},
                '2': { start: '08:35', end: '09:05'},
                '3': { start: '09:10', end: '09:40'},
                '4': { start: '09:50', end: '10:20'},
                '5': { start: '10:20', end: '10:55'},
                '6': { start: '11:00', end: '11:30'},
                '7': { start: '11:35', end: '12:05'}
            },
            '2': {
                '1': { start: '13:45', end: '14:15'},
                '2': { start: '14:20', end: '14:50'},
                '3': { start: '14:55', end: '15:25'},
                '4': { start: '15:35', end: '16:05'},
                '5': { start: '16:10', end: '16:40'},
                '6': { start: '16:45', end: '17:15'},
                '7': { start: '17:20', end: '17:50'}
            }
        }
    };
    
    var dataSvc = { 
        smena: vratiSmenu(),
        tipSmene: 'normalno',
        dan: vratiDanasnjiDan(),
        //pon: [{},{},{},{},{},{},{}],        
        uto: [{},{},{},{},{ razred: 'M32' },{ razred: 'M32' },{}],        
        sre: [{ razred: 'M23/E22' },{ razred: 'M23/E22' },{ razred: 'ČOS' },{ razred: 'M11' },{ razred: 'M11' },{ razred: 'E21'},{}],        
        cet: [{ razred: 'E21' },{ razred: 'E21' },{ razred: 'M32' },{ razred: 'M11' },{},{},{}],        
        //pet: [{},{},{},{},{},{},{}],        
        getVremeCasa: function(redniBrojCasa, isPocetak){
            var pocetakKraj = isPocetak ? 'start' : 'end';
            return smene[dataSvc.tipSmene][dataSvc.smena][redniBrojCasa][pocetakKraj] || '';
        },
        promeniSmenu: function(){
            if(dataSvc.smena == '1') dataSvc.smena = '2';
            else dataSvc.smena = '1';
        },
        promeniTipSmene: function(){
            if(dataSvc.tipSmene == 'normalno') dataSvc.tipSmene = 'skraceno';
            else dataSvc.tipSmene = 'normalno';
        },
        promeniDan: function(dan){
            dataSvc.dan = dan;
        },
    };
    
    return dataSvc;
});

app.controller('RasporedController', function ($scope, DataSvc) {
    $scope.data = DataSvc;
    $scope.getVremeCasa = DataSvc.getVremeCasa;
    $scope.promeniSmenu = DataSvc.promeniSmenu;
    $scope.promeniTipSmene = DataSvc.promeniTipSmene;
    $scope.promeniDan = DataSvc.promeniDan;
});
