(function(angular, _) {
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
            $q.all(promises).then(function() {
                var calculation = {
                    strikers: self.calculatePositions('strikers'),
                    midfield: self.calculatePositions('midfield'),
                    goalkeeper: self.calculatePositions('goalkeeper'),
                    back: self.calculatePositions('back'),
                    teamShape: self.calculateTeamShape(),
                    teamExperience: self.calculateTeamExperience(),
                    coach: self.calculateCoach(),
                    history: self.calculateHistory(),
                    generalGood: self.calculateGeneralGoodPoints(),
                    generalBad: self.calculateGeneralBadPoints()
                };

                calculation.total = _.reduce(calculation, function(total, n) {
                    return total + n;
                });

                return calculation;
            });
        }
        

        /**
         * Get calculation of good player not injured
         * @param  {Boolean} hasBench               if team has a good player bench
         * @param  {Number}  levelGoodPlayers       level of its good players (1-10)
         * @param  {Number}  expGoodPlayers         the exponent for good players
         * @param  {Number}  levelGoodPositionBench level of its good forward bench (1-10)
         * @param  {Number}  expGoodBench           the exponent for good player bench
         * @return {Number}                         calculated value for a good player not injured
         */
        function _getGoodPlayerNotInjuredCalculate(hasBench, levelGoodPlayers, expGoodPlayers, levelGoodPositionBench, expGoodBench) {
            var result = expGoodPlayers * levelGoodPlayers;
            if(hasBench) {
                result += expGoodBench * levelGoodPositionBench;
            }
            return result;
        }

        /**
         * Get calculation of good player injured
         * @param  {Boolean} hasBench               if team has a good players bench
         * @param  {Number}  levelGoodPositionBench level of its good players bench (1-10)
         * @param  {Number}  expGoodBench           the exponent for good players bench
         * @return {Boolean}                        calculated value for a good players injured
         */
        function _getGoodPlayerInjuredCalculate(hasBench, levelGoodPositionBench, expGoodBench) {
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
            var hasGoodPlayers = self.team.data[position].has.goodPlayer,
                hasGoodPlayersInjured = self.team.data[position].has.goodPlayerInjured,
                hasGoodPositionBench = self.team.data[position].has.goodPositionBench,

                levelGoodPlayers = self.team.data[position].level.goodPlayer,
                levelGoodPositionBench = self.team.data[position].level.goodPositionBench,

                expGoodPlayers = self.exponent.data[position].exp.goodPlayer,
                expGoodBench = self.exponent.data[position].exp.goodPositionBench;

            if(hasGoodPlayers && !hasGoodPlayersInjured) {
                return _getGoodPlayerNotInjuredCalculate(hasGoodPositionBench, levelGoodPlayers, expGoodPlayers, levelGoodPositionBench, expGoodBench);
            }
            else if(hasGoodPlayers && hasGoodPlayersInjured) {
                return _getGoodPlayerInjuredCalculate(hasGoodPositionBench, levelGoodPositionBench, expGoodBench);
            }
            else if(hasGoodPositionBench){
                return expGoodBench * levelGoodPositionBench;
            }
            else {
                return 1;
            }
        };

        this.calculateTeamShape = function() {
            var result = 1,
                teamShape = self.team.data.teamShape;

            if(teamShape.has.chemistry) {
                result = teamShape.level.chemistry * self.exponent.data.teamShape.exp.chemistry;
            }
            return result;
        };

        this.calculateTeamExperience = function() {
            var teamExperience = self.team.data.teamExperience,
                expTeamExperience = self.exponent.data.teamExperience,

                hasExperience = teamExperience.has.experience,
                levelExperience = teamExperience.level.experience,
                expExperience = expTeamExperience.exp.experience;

            if(hasExperience && teamExperience.has.goodBalanceExperienceYouth) {
                return levelExperience * expExperience + expTeamExperience.exp.goodBalanceExperienceYouth * teamExperience.level.goodBalanceExperienceYouth;
            }
            else if(hasExperience && teamExperience.has.tooMuchOldPlayers) {
                return levelExperience * expExperience;
            }
            else {
                return 1;
            }

        };

        this.calculateCoach = function() {
            var teamCoach = self.team.data.coach,
                expCoach = self.exponent.data.coach;

            if(teamCoach.has.changedCoachRecently) {
                teamCoach.level.coachQuality = teamCoach.level.coachQuality / 2;
            }

            return teamCoach.level.coachQuality * expCoach.exp.coachQuality + teamCoach.level.coachWinningHistory * expCoach.exp.coachWinningHistory;
        };

        this.calculateHistory = function() {
            var teamHistory = self.team.data.history,
                expHistory = self.exponent.data.history,
                result = 1;

            if(teamHistory.has.wonRegional) {
                result += teamHistory.level.wonRegional * expHistory.exp.wonRegional;
            }
            if(teamHistory.has.wonLastYear) {
                result += teamHistory.level.wonLastYear * expHistory.exp.wonLastYear;
            }
            if(teamHistory.has.wonManyChampionships) {
                result += teamHistory.level.wonManyChampionships * expHistory.exp.wonManyChampionships;
            }

            return result;
        };

        this.calculateGeneralGoodPoints = function() {
            var teamGeneralGood = self.team.data.generalGood,
                expGeneralGood = self.exponent.data.generalGood,
                result = 1;

            if(teamGeneralGood.has.goodQuantityOfPlayers) {
                result += teamGeneralGood.level.goodQuantityOfPlayers * expGeneralGood.exp.goodQuantityOfPlayers;
            }
            if(teamGeneralGood.has.solidPreSeason) {
                result += teamGeneralGood.level.solidPreSeason * expGeneralGood.exp.solidPreSeason;
            }
            if(teamGeneralGood.has.officialSupporterProgram) {
                result += teamGeneralGood.level.officialSupporterProgram * expGeneralGood.exp.officialSupporterProgram;
            }
            if(teamGeneralGood.has.strengthPlayingHome) {
                result += teamGeneralGood.level.strengthPlayingHome * expGeneralGood.exp.strengthPlayingHome;
            }

            return result;
        };

        this.calculateGeneralBadPoints = function() {
            var teamGeneralBad = self.team.data.generalBad,
                expGeneralBad = self.exponent.data.generalBad,
                result = -1;

            if(teamGeneralBad.has.notPayingWagesOnTime) {
                result -= teamGeneralBad.level.notPayingWagesOnTime * expGeneralBad.exp.notPayingWagesOnTime;
            }
            if(teamGeneralBad.has.playingOtherChampionship) {
                result -= teamGeneralBad.level.playingOtherChampionship * expGeneralBad.exp.playingOtherChampionship;
            }
            if(teamGeneralBad.has.internalClubProblems) {
                result -= teamGeneralBad.level.internalClubProblems * expGeneralBad.exp.internalClubProblems;
            }
            return result;
        };

        initTeam('team1');
        initExponent('exponent');
        initCalculator();
    }

    angular.module('calculator')
        .controller('CalculatorController', CalculatorController);
})(window.angular, window._);