(function(angular, exponentMock) {
    'use strict';

    describe('Exponent Component', function() {
        var $httpBackend,
            ExponentComponent,
            exponent;

        beforeEach(function() {
            module('exponent');
            inject(function(_ExponentComponent_, _$httpBackend_) {
                ExponentComponent = _ExponentComponent_;
                $httpBackend = _$httpBackend_;
            });
        });

        it('it should get promises exponent data when instantiated', function() {
            $httpBackend.expectGET('/mock/exponent.json').respond(exponentMock);
            exponent = new ExponentComponent({url: 'exponent'});
            $httpBackend.flush();

            expect(exponent.$$state.value.data).toEqual(exponentMock);
        });

        it('it should throw an error with the promises is rejected', function() {
            var response;

            $httpBackend.expectGET('/mock/exponent.json').respond(500, null);
            exponent = new ExponentComponent({url: 'exponent'}).then(function() {
            }, function(reason) {
                response = reason;
            });
            $httpBackend.flush();

            expect(response.data).toEqual(null);
            expect(response.status).toEqual(500);
        });
    });

})(window.angular, window.exponentMock);