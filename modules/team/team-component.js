(function(angular) {
    'use strict';

    function TeamComponent($http) {

        var Team = function(options) {
            return $http.get('/mock/' + options.url + '.json')
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

    angular.module('team')
        .factory('TeamComponent', TeamComponent);
})(window.angular);