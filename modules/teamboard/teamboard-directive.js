(function(angular, _) {
    'use strict';

    function teamboardContainer() {
        return {
            restrict: 'E',
            templateUrl: 'modules/teamboard/teamboard.html',
            controllerAs: 'teamboard',
            controller: 'TeamboardController',
            link: function(scope, element, attrs) {
                var rangeElements = element[0].querySelectorAll('.input-range'),
                    valueElements = element[0].querySelectorAll('.range-value');

                _.forEach(rangeElements, function(range) {
                    var valueSibling = range.nextElementSibling;
                    valueSibling.textContent = range.getAttribute('value');

                    range.addEventListener('input', function(event) {
                        valueSibling.textContent = event.currentTarget.value;
                    });
                });
            }
        }
    }

    angular.module('teamboard')
        .directive('teamboardContainer', teamboardContainer);
})(window.angular, window._);