(function(angular) {
    'use strict';

    function dashboardContainer() {
        return {
            restrict: 'E',
            templateUrl: 'modules/dashboard/dashboard.html',
            controllerAs: 'dashboard',
            controller: 'DashboardController',
            transclude: true
        }
    }

    angular.module('dashboard')
        .directive('dashboardContainer', dashboardContainer);
})(window.angular);