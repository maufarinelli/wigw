(function(angular) {
    'use strict';
    
    function TeamComponent($q, teamService) {
        var self;

        var Team = function(options) {
            self = this;
            this.data;
            this.promise = this.getPromise(options);
        };

        Team.prototype.getPromise = function(options) {
            return teamService.getTeamData(options.url);
        };

        Team.prototype.setData = function(data) {
            this.data = data;
        };

        Team.prototype.getData = function() {
            return this.data;
        };

        return Team;
    }

    angular.module('team')
        .factory('TeamComponent', TeamComponent);
})(window.angular);