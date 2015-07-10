(function(angular) {
    function DashboardController($scope, CalculatorComponent) {
        var team1Config = {
            urlTeam: 'team1',
            urlExponent: 'exponent'
        };
        var calculator1 = new CalculatorComponent(team1Config);

        var team2Config = {
            urlTeam: 'team2',
            urlExponent: 'exponent'
        };
        var calculator2 = new CalculatorComponent(team2Config);
    }

    angular.module('dashboard')
        .controller('DashboardController', DashboardController);
})(window.angular);