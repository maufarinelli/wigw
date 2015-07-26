(function(angular, _) {
    function TeamboardController($scope, $translate) {
        var self = this;

        this.positions = [{
            type: 'strikers',
            model: {
                level: 5, 
                injured: false,
                hasBench: false,
                levelBench: 1
            }
        }, {
            type: 'attackingMidfield',
            model: {
                level: 5, 
                injured: false,
                hasBench: false,
                levelBench: 1
            }
        }];

        $translate([
            'teamboard.striker.title',
            'teamboard.striker.level',
            'teamboard.striker.injured',
            'teamboard.striker.has.bench',
            'teamboard.striker.level.bench']
            ).then(function(translations) {
                self.positions[0].text = {
                    title: translations['teamboard.striker.title'],
                    level: translations['teamboard.striker.level'], 
                    injured: translations['teamboard.striker.injured'],
                    hasBench: translations['teamboard.striker.has.bench'],
                    levelBench: translations['teamboard.striker.level.bench']
                }

                console.log(self.positions);
            });

        this.templates = {
            positions: 'modules/teamboard/templates/positions.html',
        };

        this.model = {
            striker: {
                benchLevel: 1
            }
        }
    }

    angular.module('teamboard')
        .controller('TeamboardController', TeamboardController);
})(window.angular, window._);