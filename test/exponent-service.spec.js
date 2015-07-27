(function(angular, exponentMock) {
    'use strict';

    describe('Exponent Service', function() {
        var service,
            $httpBackend;

        beforeEach(module('exponent'));
        beforeEach(inject(function(exponentService, $injector, _$httpBackend_) {
            $httpBackend = _$httpBackend_;
            service = exponentService;
        }));

        it('getExponent method should get the exponent json', function() {
            var json;

            $httpBackend.expectGET('/mock/exponent.json').respond(exponentMock);
            service.getExponent('exponent').then(function(res) {
                json = res;
            });
            $httpBackend.flush();
            
            expect(json.data).toEqual(exponentMock);
        });

        it('getExponent method should throw an error with something unexpected happens', function() {
            var response;

            $httpBackend.expectGET('/mock/exponent.json').respond(500, {});
            service.getExponent('exponent').then(function() {
            }, function(reason) {
                response = reason;
            });
            $httpBackend.flush();

            expect(response.data).toEqual({});
            expect(response.status).toEqual(500);
        });
    });

})(window.angular, window.exponentMock);