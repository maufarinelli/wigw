(function(angular) {
    'use strick';
    
    function ExponentController($scope, $q, exponentService) {
        var self = this,
            exponent, 
            team,
            total = 1;

        function initPromise() {
            var deffered  = $q.defer(),
                promises = [];

            var exponentPromise = exponentService.getExponent()
                .then(function(res) {
                    exponent = res.data;
                });

            var teamPromise = exponentService.getTeamData()
                .then(function(res) {
                    team = res.data;
                });

            promises.push(exponentPromise, teamPromise);
            $q.all(promises).then(init);
        }

        function init() {
            console.log(exponent);
            console.log(team);
            console.log('INIT')
            console.log(calculateTotal());
        }

        function calculateTotal() {
            total += calculateStrickers();
            return total;
        }

        

        initPromise();
    }

    angular.module('exponent')
        .controller('ExponentController', ExponentController);
})(window.angular);