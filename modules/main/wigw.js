(function(angular) {
    'use strict';

    angular.module('wigw', [
        'ngRoute',
        'team',
        'exponent',
        'calculator',
        'indicator',
        'dashboard'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'templates/gameboard.html'
        });
        $routeProvider.when('/gameboard', {
            templateUrl: 'templates/gameboard.html'
        });
        $routeProvider.otherwise({
            redirectTo: '/dashboard'
        });
    }]);;
})(window.angular);