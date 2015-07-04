(function(angular) {
    'use strick';

    function ExponentComponent(exponentService) {
        var self;

        var Exponent = function(options) {
            self = this;
            this.data;
            this.promise = this.getPromise(options);
        };

        Exponent.prototype.getPromise = function(options) {
            return exponentService.getExponent(options.url);
        };

        Exponent.prototype.setData = function(data) {
            this.data = data;
        };

        Exponent.prototype.getData = function() {
            return this.data;
        };

        return Exponent;
    }

    angular.module('exponent')
        .factory('ExponentComponent', ExponentComponent);
})(window.angular);