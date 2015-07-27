(function(angular, _) {
    function TeamboardController($scope, $translate, ptText) {
        var self = this,
            translateList = _.remove(_.keys(ptText), function(key) {
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

            addPositionsTexts(_.pluck(self.positions, 'type'), translateList);
        }

        function init() {
            self.templates = {
                positions: 'modules/teamboard/templates/positions.html'
            };

            initPositions();

            self.submit = function() {
                console.log(self.positions);
            };
        }

        init();
    }

    angular.module('teamboard')
        .controller('TeamboardController', TeamboardController);
})(window.angular, window._);