(function(angular, _) {
    'use strict';
    
    function CalculatorComponent(TeamComponent) {
        var self;

        var Calculator = function(options) {
            self = this;

            this.exponent = options.exponent;
            this.team;

            this.initTeam(options.urlTeam);
            this.calculation = this.initCalculator();
        };

        Calculator.prototype.initTeam = function(urlTeam) {
            var configTeam = {
                    url: urlTeam
                };

            self.team = new TeamComponent(configTeam);
        };

        Calculator.prototype.initCalculator = function() {
            var self = this;

            return self.team.then(function(team) {
                    var calculation = {
                        strikers: self.calculatePositions('strikers', team.data),
                        attackingMidfield: self.calculatePositions('attackingMidfield', team.data),
                        defensiveMidfield: self.calculatePositions('defensiveMidfield', team.data),
                        goalkeeper: self.calculatePositions('goalkeeper', team.data),
                        centralBack: self.calculatePositions('centralBack', team.data),
                        fullBack: self.calculatePositions('fullBack', team.data),
                        teamShape: self.calculateTeamShape(team.data),
                        teamExperience: self.calculateTeamExperience(team.data),
                        coach: self.calculateCoach(team.data),
                        history: self.calculateHistory(team.data),
                        generalGood: self.calculateGeneralGoodPoints(team.data),
                        generalBad: self.calculateGeneralBadPoints(team.data),
                        standings: self.calculateStandings(team.data)
                    };

                    calculation.total = _.reduce(calculation, function(total, n) {
                        return total + n;
                    });

                    calculation.name = team.data.name;

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
        Calculator.prototype.calculatePositions = function(position, team) {
            var hasGoodPlayersInjured = team[position].has.goodPlayerInjured,
                hasGoodPositionBench = team[position].has.goodPositionBench,

                levelGoodPlayers = team[position].level.goodPlayers,
                levelGoodPositionBench = team[position].level.goodPositionBench,

                expGoodPlayers = this.exponent[position].exp.goodPlayers,
                expGoodBench = this.exponent[position].exp.goodPositionBench;

            if(!hasGoodPlayersInjured) {
                return _getGoodPlayerNotInjuredCalculate(hasGoodPositionBench, levelGoodPlayers, expGoodPlayers, levelGoodPositionBench, expGoodBench);
            }
            else if(hasGoodPlayersInjured) {
                return _getGoodPlayerInjuredCalculate(hasGoodPositionBench, levelGoodPositionBench, expGoodBench);
            }
            else if(hasGoodPositionBench){
                return expGoodBench * levelGoodPositionBench;
            }
            else {
                return 1;
            }
        };

        Calculator.prototype.calculateTeamShape = function(team) {
            return team.teamShape.level.chemistry * this.exponent.teamShape.exp.chemistry;
        };

        Calculator.prototype.calculateTeamExperience = function(team) {
            var teamExperience = team.teamExperience,
                expTeamExperience = this.exponent.teamExperience;

            return teamExperience.level.experience * expTeamExperience.exp.experience +
                expTeamExperience.exp.goodBalanceExperienceYouth * teamExperience.level.goodBalanceExperienceYouth;
        };

        Calculator.prototype.calculateCoach = function(team) {
            var teamCoach = team.coach,
                expCoach = this.exponent.coach;

            if(teamCoach.has.changedCoachRecently) {
                teamCoach.level.coachQuality = teamCoach.level.coachQuality / 2;
            }

            return teamCoach.level.coachQuality * expCoach.exp.coachQuality + teamCoach.level.coachWinningHistory * expCoach.exp.coachWinningHistory;
        };

        Calculator.prototype.calculateHistory = function(team) {
            var teamHistory = team.history,
                expHistory = this.exponent.history,
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

        Calculator.prototype.calculateGeneralGoodPoints = function(team) {
            var teamGeneralGood = team.generalGood,
                expGeneralGood = this.exponent.generalGood,
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

        Calculator.prototype.calculateGeneralBadPoints = function(team) {
            var teamGeneralBad = team.generalBad,
                expGeneralBad = this.exponent.generalBad,
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

        Calculator.prototype.calculateStandings = function(team) {
            var teamStandings = team.standings,
                expStandings = this.exponent.standings.exp;

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