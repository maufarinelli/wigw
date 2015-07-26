(function(angular) {
    'use strict';

    angular.module('i18n')
        .factory('ptText', function() {
            return {
                'teamboard.striker.title': 'Ataque',
                'teamboard.striker.level': 'Nível dos atacante titulares :',
                'teamboard.striker.injured': 'Melhor atacante esta machucado?',
                'teamboard.striker.has.bench': 'Tem bons atacantes na reserva que podem manter um bom nível no ataque?',
                'teamboard.striker.level.bench': 'Nível dos atacantes reservas :'

            };
        });
})(window.angular);