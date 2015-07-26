(function(angular) {
    function TeamboardController($scope) {
        this.positions = [
            'strikers',
            'attackingMidfield'
        ];
        
        this.templates = {
            strikers: 'modules/teamboard/templates/strikers.html',
            attackingMidfield: 'modules/teamboard/templates/attackingMidfield.html'
        };

        this.model = {
            striker: {
                benchLevel: 1
            }
        }
    }

    angular.module('teamboard')
        .controller('TeamboardController', TeamboardController);
})(window.angular);