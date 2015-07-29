(function(angular, teamMock) {
    'use strict';

    describe('Team Component', function() {
        var $httpBackend,
            TeamComponent,
            team;

        beforeEach(function() {
            module('team');
            inject(function(_TeamComponent_, _$httpBackend_) {
                TeamComponent = _TeamComponent_;
                $httpBackend = _$httpBackend_;
            });
        });

        it('it should get promises team data when instantiated', function() {
            $httpBackend.expectGET('/mock/team.json').respond(teamMock);
            team = new TeamComponent({url: 'team'});
            $httpBackend.flush();

            expect(team.$$state.value.data).toEqual(teamMock);
        });

        it('it should throw an error with the promises is rejected', function() {
            var response;

            $httpBackend.expectGET('/mock/team.json').respond(500, null);
            team = new TeamComponent({url: 'team'}).then(function() {
            }, function(reason) {
                response = reason;
            });
            $httpBackend.flush();

            expect(response.data).toEqual(null);
            expect(response.status).toEqual(500);
        });
    });

})(window.angular, window.teamMock);