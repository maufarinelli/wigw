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
            service.getExponent().then(function(res) {
                json = res;
            });
            $httpBackend.flush();
            
            expect(json.data).toEqual(exponentMock);
        });
    });

})(window.angular, window.exponentMock);