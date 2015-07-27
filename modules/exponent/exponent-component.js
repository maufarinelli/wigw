(function(angular) {
    'use strict';

    function ExponentComponent(exponentService) {
        var self,
            data;

        var Exponent = function(options) {
            self = this;

            this.promise = this.getPromise(options);
        };

        Exponent.prototype.getPromise = function(options) {
            return exponentService.getExponent(options.url);
        };

        Exponent.prototype.setData = function(information) {
            data = information;
        };

        Exponent.prototype.getData = function() {
            return data;
        };

        return Exponent;
    }

    angular.module('exponent')
        .factory('ExponentComponent', ExponentComponent);
})(window.angular);