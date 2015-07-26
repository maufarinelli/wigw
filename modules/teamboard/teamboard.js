(function(angular) {
    'use strict';

    angular.module('teamboard', ['pascalprecht.translate', 'i18n'])
        .config(function($translateProvider, ptTextProvider) {
            $translateProvider.translations('pt', ptTextProvider.$get());
            $translateProvider.preferredLanguage('pt');
        });
})(window.angular);