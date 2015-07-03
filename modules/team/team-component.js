(function(angular) {
    'use strick';
    
    function teamComponent(teamService) {
        var self;

        var Team = function(options) {
            self = this;
            this.data;

            this.init(options);
        };

        Team.prototype.init = function(options) {
            teamService.getTeamData(options.url)
                .then(function(result) {
                    self.data = result.data;
                });
        };

        return Team;
    }

    angular.module('team')
        .factory('teamComponent', teamComponent);
})(window.angular);