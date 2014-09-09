(function(){
    angular
        .module('app')
        .directive('ngTap', ngTap);
    
    function ngTap(){
        return function (scope, element, attrs) {
            element.bind('touchstart', function (e) {
                element.addClass('active');
            });
            element.bind('touchend', function (e) {
                element.removeClass('active');
                scope.$apply(attrs['ngTap'], element);
            });
        };
    }
})();