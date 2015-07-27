(function(angular) {
    'use strict';

    angular.module('i18n')
        .factory('ptText', function() {
            return {
                'teamboard.position.strikers.title': 'Ataque',
                'teamboard.position.strikers.level': 'Nível dos atacante titulares :',
                'teamboard.position.strikers.injured': 'Melhor atacante esta machucado?',
                'teamboard.position.strikers.has.bench': 'Tem bons atacantes na reserva que podem manter um bom nível no ataque?',
                'teamboard.position.strikers.level.bench': 'Nível dos atacantes reservas :',

                'teamboard.position.attackingMidfield.title': 'Meia-Atacantes',
                'teamboard.position.attackingMidfield.level': 'Nível dos meia-atacantes titulares :',
                'teamboard.position.attackingMidfield.injured': 'Melhor meia-atacantes esta machucado?',
                'teamboard.position.attackingMidfield.has.bench': 'Tem bons meia-atacantes na reserva que podem manter um bom nível no meio-campo?',
                'teamboard.position.attackingMidfield.level.bench': 'Nível dos meia-atacantes reservas :',

                'teamboard.position.defensiveMidfield.title': 'Volantes',
                'teamboard.position.defensiveMidfield.level': 'Nível dos volantes titulares :',
                'teamboard.position.defensiveMidfield.injured': 'Melhor volantes esta machucado?',
                'teamboard.position.defensiveMidfield.has.bench': 'Tem bons volantes na reserva que podem manter um bom nível no meio-campo?',
                'teamboard.position.defensiveMidfield.level.bench': 'Nível dos volantes reservas :',

                'teamboard.position.centralBack.title': 'Zagueiros',
                'teamboard.position.centralBack.level': 'Nível dos zagueiros titulares :',
                'teamboard.position.centralBack.injured': 'Melhor zagueiros esta machucado?',
                'teamboard.position.centralBack.has.bench': 'Tem bons zagueiros na reserva que podem manter um bom nível na zaga?',
                'teamboard.position.centralBack.level.bench': 'Nível dos zagueiros reservas :',

                'teamboard.position.fullBack.title': 'Laterais',
                'teamboard.position.fullBack.level': 'Nível dos laterais titulares :',
                'teamboard.position.fullBack.injured': 'Melhor laterais esta machucado?',
                'teamboard.position.fullBack.has.bench': 'Tem bons laterais na reserva que podem manter um bom nível nas alas?',
                'teamboard.position.fullBack.level.bench': 'Nível dos laterais reservas :',

                'teamboard.position.goalkeeper.title': 'Goleiros',
                'teamboard.position.goalkeeper.level': 'Nível do goleiro titular :',
                'teamboard.position.goalkeeper.injured': 'Goleiro titular esta machucado?',
                'teamboard.position.goalkeeper.has.bench': 'Tem bons goleiros na reserva que podem manter um bom nível no gol?',
                'teamboard.position.goalkeeper.level.bench': 'Nível dos goleiros reservas :',

                'teamboard.extra1': 'Nível dos goleiros reservas :',
                'teamboard.extra4': 'Nível dos goleiros reservas asAS :',
                'teamboard.extra3': 'Nível dos goleiros reservas ASasASAs :'
            };
        });
})(window.angular);