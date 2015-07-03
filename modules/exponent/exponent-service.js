(function(angular) {
    'use strict'; 
    
    function exponentService($http) {
        this.getExponent = function(url) {
            return $http.get('/mock/' + url + '.json')
                .success(function(data, status, headers, config) {
                    return data;
                }).
                error(function(data, status, headers, config) {
                    return data;
                });
        };
    }

    angular.module('exponent')
        .service('exponentService', exponentService);
})(window.angular);