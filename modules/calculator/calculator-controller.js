(function(angular) {
    'use strick'; 
    
    function CalculatorController($scope, teamComponent, exponentComponent) {
        var configTeam = {url: 'team1'};
        var team = new teamComponent(configTeam);
        console.log(team);

        var configExp = {url: 'exponent'};
        var exponent = new exponentComponent(configExp);
        console.log(exponent);

        /**
         * [_hasGoodStrickerNotInjured description]
         * @param  {Boolean} hasBench              if team has a good forward bench
         * @param  {Number}  levelGoodStrickers    level of its good stricker (1-10)
         * @param  {Number}  expGoodStricker       the exponent for good strickers
         * @param  {Number}  levelGoodForwardBench level of its good forward bench (1-10)
         * @param  {Number}  expGoodBench          the exponent for good forward bench
         * @return {Number}                        calculated value for a good stricker not injured
         */
        function _hasGoodStrickerNotInjured(hasBench, levelGoodStrickers, expGoodStricker, levelGoodForwardBench, expGoodBench) {
            var result = expGoodStricker * levelGoodStrickers
            if(hasBench) {
                result += expGoodBench * levelGoodForwardBench;
            }
            return result;
        }

        /**
         * [_hasGoodStrickerInjured description]
         * @param  {Boolean} hasBench              if team has a good forward bench
         * @param  {[type]}  levelGoodForwardBench level of its good forward bench (1-10)
         * @param  {[type]}  expGoodBench          the exponent for good forward bench
         * @return {Boolean}                       calculated value for a good stricker injured
         */
        function _hasGoodStrickerInjured(hasBench, levelGoodForwardBench, expGoodBench) {
            var exp = levelGoodForwardBench;
            if(hasBench) {
                exp = expGoodBench * levelGoodForwardBench;
            }
            return exp;
        }

        this.calculateStrickers = function() {
            var hasGoodStrickers = team.strikers.has.goodStriker,
                hasGoodStrikerInjured = team.strikers.has.goodStrikerInjured,
                hasGoodForwardBench = team.strikers.has.goodForwardBench,

                levelGoodStrickers = team.strikers.level.goodStriker,
                levelGoodForwardBench = team.strikers.level.goodForwardBench,

                expGoodStricker = exponent.strikers.exp.goodStriker,
                expGoodBench = exponent.strikers.exp.goodForwardBench;

            if(hasGoodStrickers && !hasGoodStrikerInjured) {
                return _hasGoodStrickerNotInjured(hasGoodForwardBench, levelGoodStrickers, expGoodStricker, levelGoodForwardBench, expGoodBench);
            }
            else if(hasGoodStrickers && hasGoodStrikerInjured) {
                return _hasGoodStrickerInjured(hasGoodForwardBench, levelGoodForwardBench, expGoodBench);
            }
            else if(hasGoodForwardBench){
                return expGoodBench * levelGoodForwardBench;
            }
            else {
                return 1;
            }
        }
    }

    angular.module('calculator')
        .controller('CalculatorController', CalculatorController);
})(window.angular);