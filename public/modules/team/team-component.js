(function(angular) {
    'use strict';

    function TeamComponent($http) {

        var Team = function(options) {
            return $http.get('/team/?name=' + options.url)
                .success(function(data) {
                             return data;
                         })
                .error(function(data, status) {
                           return {
                               data   : data,
                               status : status,
                               message: 'Team data was not found'
                           };
                       });
        };

        return Team;
    }

    angular.module('team', [])
        .factory('TeamComponent', TeamComponent);
})(window.angular);