(function(angular) {
    function DashboardController($scope, CalculatorComponent) {
        var team1Config = {
            urlTeam: 'team1',
            urlExponent: 'exponent'
        };
        var calculator = new CalculatorComponent(team1Config);
    }

    angular.module('dashboard')
        .controller('DashboardController', DashboardController);
})(window.angular);