(function(angular, exponentMock) {
    'use strict';

    describe('Exponent Model', function() {
        var $httpBackend,
            ExponentModel,
            exponent;

        beforeEach(function() {
            module('exponent');
            inject(function(_ExponentModel_, _$httpBackend_) {
                ExponentModel = _ExponentModel_;
                $httpBackend = _$httpBackend_;
            });
        });

        it('it should get promises exponent data when instantiated', function() {
            $httpBackend.expectGET('/exponent/').respond(exponentMock);
            exponent = new ExponentModel();
            $httpBackend.flush();

            expect(exponent.$$state.value.data).toEqual(exponentMock);
        });

        it('it should throw an error with the promises is rejected', function() {
            var response;

            $httpBackend.expectGET('/exponent/').respond(500, null);
            exponent = new ExponentModel().then(function() {
            }, function(reason) {
                response = reason;
            });
            $httpBackend.flush();

            expect(response.data).toEqual(null);
            expect(response.status).toEqual(500);
        });
    });

})(window.angular, window.exponentMock);