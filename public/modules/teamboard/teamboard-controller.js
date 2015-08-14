(function(angular, _) {
    function TeamboardController($scope, $translate, ptText) {
        var self = this,
            translatePositionList = _.remove(_.keys(ptText), function(key) {
                return !key.search('teamboard.position');
            });

        /**
         * Adds the i18n texts to each position
         * @param types {String} the position
         * @param textList {Array} the array containing all the position's keys we want to translate
         */
        function addPositionsTexts(types, textList) {
            $translate(textList).then(function(translations) {
                _.forEach(types, function(type) {
                    var position = _.find(self.positions, {type: type});

                    position.text = {
                        title     : translations['teamboard.position.' + type + '.title'],
                        level     : translations['teamboard.position.' + type + '.level'],
                        injured   : translations['teamboard.position.' + type + '.injured'],
                        hasBench  : translations['teamboard.position.' + type + '.has.bench'],
                        levelBench: translations['teamboard.position.' + type + '.level.bench']
                    };
                });
            });
        }

        function initPositions() {
            self.positions = [
                {
                    type : 'strikers',
                    model: {
                        level     : 5,
                        injured   : false,
                        hasBench  : false,
                        benchLevel: 1
                    }
                },
                {
                    type : 'attackingMidfield',
                    model: {
                        level     : 5,
                        injured   : false,
                        hasBench  : false,
                        benchLevel: 1
                    }
                },
                {
                    type : 'defensiveMidfield',
                    model: {
                        level     : 5,
                        injured   : false,
                        hasBench  : false,
                        benchLevel: 1
                    }
                },
                {
                    type : 'centralBack',
                    model: {
                        level     : 5,
                        injured   : false,
                        hasBench  : false,
                        benchLevel: 1
                    }
                },
                {
                    type : 'fullBack',
                    model: {
                        level     : 5,
                        injured   : false,
                        hasBench  : false,
                        benchLevel: 1
                    }
                },
                {
                    type : 'goalkeeper',
                    model: {
                        level     : 5,
                        injured   : false,
                        hasBench  : false,
                        benchLevel: 1
                    }
                }
            ];

            addPositionsTexts(_.pluck(self.positions, 'type'), translatePositionList);
        }

        function initTeamExperience() {
            self.teamExperience = {
                model: {
                    experience                : 5,
                    goodBalanceExperienceYouth: 5
                },
                text: {
                    title  : ptText['teamboard.teamexperience.title'],
                    level  : ptText['teamboard.teamexperience.level'],
                    balance: ptText['teamboard.teamexperience.balance']
                }
            };
        }

        function initTeamShape() {
            self.teamShape = {
                model: {
                    chemistry                : 5,
                },
                text: {
                    title  : ptText['teamboard.teamshape.title'],
                    level  : ptText['teamboard.teamshape.level'],
                }
            };
        }

        function init() {
            self.templates = {
                positions: 'modules/teamboard/templates/positions.html',
                experience: 'modules/teamboard/templates/experience.html',
                shape: 'modules/teamboard/templates/shape.html'
            };

            initPositions();
            initTeamExperience();
            initTeamShape();

            self.submit = function() {
                console.log(self.positions);
                console.log(self.teamExperience.model);
                console.log(self.teamShape.model);
            };
        }

        init();
    }

    angular.module('teamboard')
        .controller('TeamboardController', TeamboardController);
})(window.angular, window._);