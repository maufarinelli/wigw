(function(angular) {
    function DashboardController($scope, $q, CalculatorComponent) {
        var self = this;

        $scope.ready = false;

        var teamMax = {
            urlTeam: 'team-max',
            urlExponent: 'exponent'
        };
        var teamMax = new CalculatorComponent(teamMax);
        teamMax.calculation.then(function(calculation) {
            self.maximum = calculation.total / 1000;
        });

        var palmeiras = {
            urlTeam: 'palmeiras',
            urlExponent: 'exponent'
        };
        var palmeiras = new CalculatorComponent(palmeiras);
        palmeiras.calculation.then(function(calculation) {
            self.palmeiras = calculation.total / 1000;
            $scope.ready = true;
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
        .controller('DashboardController', DashboardController);
})(window.angular);