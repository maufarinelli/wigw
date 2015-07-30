(function(angular) {
    'use strict';

    function ExponentComponent($http) {

        var Exponent = function(options) {
            return $http.get('/mock/' + options.url + '.json')
                .success(function(data) {
                             return data;
                         })
                .error(function(data, status) {
                          return {
                              data: data,
                              status: status,
                              message:'Exponent data was not found'
                          };
                      });
        };

        return Exponent;
    }

    angular.module('exponent', [])
        .factory('ExponentComponent', ExponentComponent);
})(window.angular);