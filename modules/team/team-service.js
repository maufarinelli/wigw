(function(angular) {
    'use strict'; 
    
    function teamService($http) {
        this.getTeamData = function(url) {
            return $http.get('/mock/' + url + '.json')
                .success(function(data, status, headers, config) {
                    return data;
                }).
                error(function(data, status, headers, config) {
                    return data;
                });
        };
    }

    angular.module('team')
        .service('teamService', teamService);
})(window.angular);