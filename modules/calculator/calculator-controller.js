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
                back,
                teamShape,
                teamExperience,
                coach,
                history;
            
            $q.all(promises).then(function() {
                strikers = self.calculatePositions('strikers');
                console.log(strikers);

                midfield = self.calculatePositions('midfield');
                console.log(midfield);

                goalkeeper = self.calculatePositions('goalkeeper');
                console.log(goalkeeper);

                back = self.calculatePositions('back');
                console.log(back);

                teamShape = self.calculateTeamShape();
                console.log(teamShape);

                teamExperience = self.calculateTeamExperience();
                console.log(teamExperience);

                coach = self.calculateCoach();
                console.log(coach);

                history = self.calculateHistory(),
                console.log(history);
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
                teamShape = self.team.data.teamShape,
                hasChemistry = teamShape.has.chemistry,
                levelChemistry = teamShape.level.chemistry,
                expChemistry = self.exponent.data.teamShape.exp.chemistry;

            if(hasChemistry) {
                result = levelChemistry * expChemistry;
            }
            return result;
        };

        this.calculateTeamExperience = function() {
            var teamExperience = self.team.data.teamExperience,
                expTeamExperience = self.exponent.data.teamExperience,

                hasExperience = teamExperience.has.experience,
                hasGoodBalance = teamExperience.has.goodBalanceExperienceYouth,
                hasTooMuchOldPlayers = teamExperience.has.tooMuchOldPlayers,

                levelExperience = teamExperience.level.experience,
                levelGoodBalanceExperienceYouth = teamExperience.level.goodBalanceExperienceYouth,

                expExperience = expTeamExperience.exp.experience,
                expGoodBalanceExperienceYouth = expTeamExperience.exp.goodBalanceExperienceYouth;

            if(hasExperience && hasGoodBalance) {
                return levelExperience * expExperience + expGoodBalanceExperienceYouth * levelGoodBalanceExperienceYouth;
            }
            else if(hasExperience && hasTooMuchOldPlayers) {
                return levelExperience * expExperience;
            }
            else {
                return 1;
            }

        };

        this.calculateCoach = function() {
            var teamCoach = self.team.data.coach,
                expCoach = self.exponent.data.coach,

                hasChangedCoachRecently = teamCoach.has.changedCoachRecently,

                levelCoach = teamCoach.level.coachQuality,
                levelCoachWinningHistory = teamCoach.level.coachWinningHistory,

                expCoachQuality = expCoach.exp.coachQuality,
                expCoachWinningHistory = expCoach.exp.coachWinningHistory;

            if(hasChangedCoachRecently) {
                levelCoach = levelCoach / 2;
            }

            return levelCoach * expCoachQuality + levelCoachWinningHistory * expCoachWinningHistory;
        };

        this.calculateHistory = function() {
            var teamHistory = self.team.data.history,
                expHistory = self.exponent.data.history,
                result = 1,

                hasWonRegional = teamHistory.has.wonRegional,
                hasWonLastYear = teamHistory.has.wonLastYear,
                hasWonManyChampionships = teamHistory.has.wonManyChampionships,

                levelWonRegional = teamHistory.level.wonRegional,
                levelWonLastYear = teamHistory.level.wonLastYear,
                levelWonManyChampionships = teamHistory.level.wonManyChampionships,

                expWonRegional = expHistory.exp.wonRegional,
                expWonLastYear = expHistory.exp.wonLastYear,
                expWonManyChampionships = expHistory.exp.wonManyChampionships;

            if(hasWonRegional) {
                result += levelWonRegional * expWonRegional;
            }
            if(hasWonLastYear) {
                result += levelWonLastYear * expWonLastYear;
            }
            if(hasWonManyChampionships) {
                result += levelWonManyChampionships * expWonManyChampionships;
            }

            return result;
        };

        initTeam('team1');
        initExponent('exponent');
        initCalculator();
    }

    angular.module('calculator')
        .controller('CalculatorController', CalculatorController);
})(window.angular);