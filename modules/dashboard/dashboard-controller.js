(function(angular) {
    function DashboardController($scope, $q, CalculatorComponent, ExponentComponent, DASHBOARD) {
        var self = this;
        this.teams = [];

        function initExponent() {
            self.exponent = new ExponentComponent({url: DASHBOARD.urlExponent});

            return self.exponent.promise.then(function(result) {
                self.exponent.setData(result.data);
            });
        };

        $scope.ready = false;

        var teamArray = [
            'santos',
            'saopaulo',
            'corinthians',
            'palmeiras'
        ];

        initExponent().then(function() {
            var promises = [];
            _.forEach(teamArray, function(url) {
                var teamConfig = {
                    urlTeam: url,
                    exponent: self.exponent
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

        



        /*
        var corinthians = {
            urlTeam: 'corinthians',
            urlExponent: 'exponent'
        };
        var corinthians = new CalculatorComponent(corinthians);

        var saopaulo = {
            urlTeam: 'saopaulo',
            urlExponent: 'exponent'
        };
        var saopaulo = new CalculatorComponent(saopaulo);

        var santos = {
            urlTeam: 'santos',
            urlExponent: 'exponent'
        };
        var santos = new CalculatorComponent(santos);
        */

    }

    angular.module('dashboard')
        .constant('DASHBOARD', {
            'urlExponent': 'exponent'
        })
        .controller('DashboardController', DashboardController);
})(window.angular);