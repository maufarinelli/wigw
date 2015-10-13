(function(angular, teamMock) {
    'use strict';

    describe('Team Model', function() {
        var $httpBackend,
            TeamModel,
            team;

        beforeEach(function() {
            module('team');
            inject(function(_TeamModel_, _$httpBackend_) {
                TeamModel = _TeamModel_;
                $httpBackend = _$httpBackend_;
            });
        });

        it('it should get promises team data when instantiated', function() {
            $httpBackend.expectGET('/mock/team.json').respond(teamMock);
            team = new TeamModel({url: 'team'});
            $httpBackend.flush();

            expect(team.$$state.value.data).toEqual(teamMock);
        });

        it('it should throw an error with the promises is rejected', function() {
            var response;

            $httpBackend.expectGET('/mock/team.json').respond(500, null);
            team = new TeamModel({url: 'team'}).then(function() {
            }, function(reason) {
                response = reason;
            });
            $httpBackend.flush();

            expect(response.data).toEqual(null);
            expect(response.status).toEqual(500);
        });
    });

})(window.angular, window.teamMock);