(function(angular) {
    'use strick';

    function exponentComponent(exponentService) {
        var self;

        var Exponent = function(options) {
            self = this;
            this.data;

            this.init(options);
        };

        Exponent.prototype.init = function(options) {
            exponentService.getExponent(options.url)
                .then(function(result) {
                    self.data = result.data;
                });
        };

        return Exponent;
    }

    angular.module('exponent')
        .factory('exponentComponent', exponentComponent);
})(window.angular);