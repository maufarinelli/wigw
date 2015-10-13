(function(angular) {
    function DashboardController($scope, $q, CalculatorComponent, ExponentModel) {
        var self = this;
        this.teams = [];

        function initExponent() {
            return new ExponentModel();
        }

        $scope.ready = false;

        var teamArray = [
            'santos',
            'saopaulo',
            'corinthians',
            'palmeiras'
        ];

        initExponent().then(function(exponent) {
            var promises = [];
            _.forEach(teamArray, function(url) {
                var teamConfig = {
                    urlTeam: url,
                    exponent: exponent.data
                };
                var team = new CalculatorComponent(teamConfig);
                var promise = team.calculation.then(function(calculation) {
                    var teamData = {
                        name: calculation.name,
                        total: calculation.total / 1000
                    };
                    self.teams.push(teamData);
                });
                promises.push(promise);
            });

            $q.all(promises).then(function() {
                self.teams = _.sortByOrder(self.teams, 'total', 'desc');
                self.maximum = self.teams[0].total;
                $scope.ready = true;
            });
        });

    }

    angular.module('dashboard')
        .controller('DashboardController', DashboardController);
})(window.angular);