(function(angular) {
    'use strict';

    function ExponentModel($http) {

        var Exponent = function() {

            return $http.get('/exponent/')
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
        .factory('ExponentModel', ExponentModel);
})(window.angular);