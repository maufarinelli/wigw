(function(angular) {
    function CalculatorController($scope, CalculatorComponent) {
        var calculator = new CalculatorComponent();
    }

    angular.module('calculator')
        .controller('CalculatorController', CalculatorController);
})(window.angular);