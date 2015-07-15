(function(angular, _) {
    'use strict';
    
    function CalculatorComponent($q, TeamComponent, ExponentComponent) {
        var promises = [];

        var Calculator = function(options) {
            this.team;
            this.exponent = options.exponent;

            this.initTeam(options.urlTeam);
            
            this.calculation = this.initCalculator();
        };

        Calculator.prototype.initTeam = function(urlTeam) {
            var self = this;

            var configTeam = {
                    url: urlTeam
                };

            this.team = new TeamComponent(configTeam);

            var teamPromise = this.team.promise.then(function(result) {
                self.team.setData(result.data);
            });

            promises.push(teamPromise);
        };

        Calculator.prototype.initCalculator = function() {
            var self = this;

            return $q.all(promises)
                .then(function() {
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
                        generalBad: self.calculateGeneralBadPoints(),
                        standings: self.calculateStandings()
                    };

                    calculation.total = _.reduce(calculation, function(total, n) {
                        return total + n;
                    });

                    calculation.name = self.team.data.name;

                    return calculation;
                });
        };
        

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

        // Methods
        Calculator.prototype.calculatePositions = function(position) {
            var hasGoodPlayers = this.team.data[position].has.goodPlayer,
                hasGoodPlayersInjured = this.team.data[position].has.goodPlayerInjured,
                hasGoodPositionBench = this.team.data[position].has.goodPositionBench,

                levelGoodPlayers = this.team.data[position].level.goodPlayer,
                levelGoodPositionBench = this.team.data[position].level.goodPositionBench,

                expGoodPlayers = this.exponent.data[position].exp.goodPlayer,
                expGoodBench = this.exponent.data[position].exp.goodPositionBench;

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

        Calculator.prototype.calculateTeamShape = function() {
            var result = 1,
                teamShape = this.team.data.teamShape;

            if(teamShape.has.chemistry) {
                result = teamShape.level.chemistry * this.exponent.data.teamShape.exp.chemistry;
            }
            return result;
        };

        Calculator.prototype.calculateTeamExperience = function() {
            var teamExperience = this.team.data.teamExperience,
                expTeamExperience = this.exponent.data.teamExperience,

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

        Calculator.prototype.calculateCoach = function() {
            var teamCoach = this.team.data.coach,
                expCoach = this.exponent.data.coach;

            if(teamCoach.has.changedCoachRecently) {
                teamCoach.level.coachQuality = teamCoach.level.coachQuality / 2;
            }

            return teamCoach.level.coachQuality * expCoach.exp.coachQuality + teamCoach.level.coachWinningHistory * expCoach.exp.coachWinningHistory;
        };

        Calculator.prototype.calculateHistory = function() {
            var teamHistory = this.team.data.history,
                expHistory = this.exponent.data.history,
                result = 0;

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

        Calculator.prototype.calculateGeneralGoodPoints = function() {
            var teamGeneralGood = this.team.data.generalGood,
                expGeneralGood = this.exponent.data.generalGood,
                result = 0;

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

        Calculator.prototype.calculateGeneralBadPoints = function() {
            var teamGeneralBad = this.team.data.generalBad,
                expGeneralBad = this.exponent.data.generalBad,
                result = 0;

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

        Calculator.prototype.calculateStandings = function() {
            var teamStandings = this.team.data.standings,
                expStandings = this.exponent.data.standings.exp;

            return (teamStandings.wins * expStandings.wins) +
                (teamStandings.ties * expStandings.ties) -
                (teamStandings.losses * expStandings.losses) +
                (teamStandings.goesDifference * expStandings.goesDifference);
        };

        return Calculator;
    }

    angular.module('calculator')
        .factory('CalculatorComponent', CalculatorComponent);
})(window.angular, window._);