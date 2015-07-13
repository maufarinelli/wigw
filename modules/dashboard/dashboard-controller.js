(function(angular) {
    function DashboardController($scope, CalculatorComponent) {
        var teamMax = {
            urlTeam: 'team-max',
            urlExponent: 'exponent'
        };
        var teamMax = new CalculatorComponent(teamMax);

        var palmeiras = {
            urlTeam: 'palmeiras',
            urlExponent: 'exponent'
        };
        var palmeiras = new CalculatorComponent(palmeiras);

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
    }

    angular.module('dashboard')
        .controller('DashboardController', DashboardController);
})(window.angular);