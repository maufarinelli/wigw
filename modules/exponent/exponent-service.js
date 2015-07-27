(function(angular) {
    'use strict'; 
    
    function exponentService($http) {
        this.getExponent = function(url) {
            return $http.get('/mock/' + url + '.json')
                .success(function(data) {
                    return data;
                }).
                error(function(data, status, headers, config) {
                                            console.log(data);
                     return {
                         data: data,
                         status: status,
                         message:'Exponent data was not found'
                     };
                 });
        };
    }

    angular.module('exponent')
        .service('exponentService', exponentService);
})(window.angular);