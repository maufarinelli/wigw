(function(angular) {
    'use strick'; 
    
    function CalculatorController($scope, $q, TeamComponent, ExponentComponent) {
        var self = this,
            promises = [];

        function initTeam(urlTeam) {
            var configTeam = {
                    url: urlTeam
                };

            self.team = new TeamComponent(configTeam);

            var teamPromise = self.team.promise.then(function(result) {
                self.team.setData(result.data);
            });

            promises.push(teamPromise);
        }

        function initExponent(urlExponent) {
            var configExp = {
                    url: urlExponent
                };

            self.exponent = new ExponentComponent(configExp);

            var exponentPromise = self.exponent.promise.then(function(result) {
                self.exponent.setData(result.data);
            });

            promises.push(exponentPromise);
        }

        function initCalculator() {
            var strikers,
                midfield,
                goalkeeper, 
                back;
            
            $q.all(promises).then(function() {
                strikers = self.calculatePositions('strikers');
                console.log(strikers);

                midfield = self.calculatePositions('midfield');
                console.log(midfield);

                goalkeeper = self.calculatePositions('goalkeeper');
                console.log(goalkeeper);

                back = self.calculatePositions('back');
                console.log(back);
            });
        }
        

        /**
         * [_hasGoodStrickerNotInjured description]
         * @param  {Boolean} hasBench              if team has a good forward bench
         * @param  {Number}  levelGoodPlayers    level of its good stricker (1-10)
         * @param  {Number}  expGoodPlayers       the exponent for good strickers
         * @param  {Number}  levelGoodPositionBench level of its good forward bench (1-10)
         * @param  {Number}  expGoodBench          the exponent for good forward bench
         * @return {Number}                        calculated value for a good stricker not injured
         */
        function _hasGoodStrickerNotInjured(hasBench, levelGoodPlayers, expGoodPlayers, levelGoodPositionBench, expGoodBench) {
            var result = expGoodPlayers * levelGoodPlayers;
            if(hasBench) {
                result += expGoodBench * levelGoodPositionBench;
            }
            return result;
        }

        /**
         * [_hasGoodStrickerInjured description]
         * @param  {Boolean} hasBench              if team has a good forward bench
         * @param  {[type]}  levelGoodPositionBench level of its good forward bench (1-10)
         * @param  {[type]}  expGoodBench          the exponent for good forward bench
         * @return {Boolean}                       calculated value for a good stricker injured
         */
        function _hasGoodStrickerInjured(hasBench, levelGoodPositionBench, expGoodBench) {
            var exp = levelGoodPositionBench;
            if(hasBench) {
                exp = expGoodBench * levelGoodPositionBench;
            }
            return exp;
        }

        // Properties
        this.team;
        this.exponent;

        // Methods
        this.calculatePositions = function(position) {
            var team = self.team.getData(),
                exponent = self.exponent.getData();

            var hasGoodPlayers = team[position].has.goodPlayer,
                hasGoodPlayersInjured = team[position].has.goodPlayerInjured,
                hasGoodPositionBench = team[position].has.goodPositionBench,

                levelGoodPlayers = team[position].level.goodPlayer,
                levelGoodPositionBench = team[position].level.goodPositionBench,

                expGoodPlayers = exponent[position].exp.goodPlayer,
                expGoodBench = exponent[position].exp.goodPositionBench;

            if(hasGoodPlayers && !hasGoodPlayersInjured) {
                return _hasGoodStrickerNotInjured(hasGoodPositionBench, levelGoodPlayers, expGoodPlayers, levelGoodPositionBench, expGoodBench);
            }
            else if(hasGoodPlayers && hasGoodPlayersInjured) {
                return _hasGoodStrickerInjured(hasGoodPositionBench, levelGoodPositionBench, expGoodBench);
            }
            else if(hasGoodPositionBench){
                return expGoodBench * levelGoodPositionBench;
            }
            else {
                return 1;
            }
        }

        initTeam('team1');
        initExponent('exponent');
        initCalculator();
    }

    angular.module('calculator')
        .controller('CalculatorController', CalculatorController);
})(window.angular);