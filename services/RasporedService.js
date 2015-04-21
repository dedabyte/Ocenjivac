(function(){
    angular
        .module('app')
        .factory('RasporedService', rasporedService);
    
    function rasporedService(){
        var dani = ['pon','uto','sre','cet','pet','sub','ned'];
        
        // return
        var rasporedSvc = { 
            smena: vratiSmenu(),
            tipSmene: 'skraceno',
            dan: vratiDanasnjiDan(),
			      pon: [{ razred: 'E31', ucionica: '6' },{},{ razred: 'M22', ucionica: '10' },{ razred: 'M22', ucionica: '10' },{},{},{}],
            uto: [{},{},{},{},{ razred: 'M32', ucionica: '3' },{ razred: 'M32', ucionica: '3' },{ razred: 'M22', ucionica: '12' }],
            sre: [{ razred: 'M23/E22', ucionica: '2P' },{ razred: 'M23/E22', ucionica: '2P' },{ razred: 'ČOS', ucionica: '2P' },{ razred: 'M11', ucionica: '2P' },{ razred: 'M11', ucionica: '2P' },{ razred: 'E21', ucionica: '2' },{}],
            cet: [{ razred: 'E21', ucionica: '2' },{ razred: 'E21', ucionica: '2' },{ razred: 'M32', ucionica: '11' },{ razred: 'M11', ucionica: '4' },{},{},{}],
			      pet: [{ razred: 'E31', ucionica: '6' },{ razred: 'E31', ucionica: '6' },{},{},{},{},{}],
            getVremeCasa: getVremeCasa,
            promeniSmenu: promeniSmenu,
            promeniTipSmene: promeniTipSmene,
            promeniDan: promeniDan
        };
        //
        
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
                    '6': { start: '18:00', end: '18:40'},
                    '7': { start: '18:45', end: '19:15'}
                }
            },
            skraceno: {
                '1': {
                    '1': { start: '08:00', end: '08:30'},
                    '2': { start: '08:35', end: '09:05'},
                    '3': { start: '09:10', end: '09:40'},
                    '4': { start: '09:50', end: '10:20'},
                    '5': { start: '10:25', end: '10:55'},
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
        
        function vratiDanasnjiDan(){
            return dani[new Date().getDay()-1];
        }
        
        function vratiSmenu() {
            // --- get week nuber - http://stackoverflow.com/a/6117889
            var d = new Date();
            d.setHours(0,0,0);
            d.setDate(d.getDate() + 4 - (d.getDay()||7));
            var yearStart = new Date(d.getFullYear(),0,1);
            var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
            // ---
            return weekNo % 2 === 0 ? '1' : '2';
        }
        
        function getVremeCasa(redniBrojCasa, isPocetak){
            var pocetakKraj = isPocetak ? 'start' : 'end';
            return smene[rasporedSvc.tipSmene][rasporedSvc.smena][redniBrojCasa][pocetakKraj] || '';
        }
        
        function promeniSmenu(){
            if(rasporedSvc.smena == '1') rasporedSvc.smena = '2';
            else rasporedSvc.smena = '1';
        }
        
        function promeniTipSmene(){
            if(rasporedSvc.tipSmene == 'normalno') rasporedSvc.tipSmene = 'skraceno';
            else rasporedSvc.tipSmene = 'normalno';
        }
        
        function promeniDan(dan){
            rasporedSvc.dan = dan;
        }
        
        return rasporedSvc;
    }
})();