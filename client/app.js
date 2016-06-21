(function () {
    'use strict';

    var appRouting = function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'home.html',
                data: {
                    displayName: "Home"
                }
            });
        $urlRouterProvider.otherwise('/');
    };

    angular
        .module('app', [
            'ngMaterial',
            'angucomplete-alt',
            'ui.bootstrap',
            'Components',
            'angularUtils.directives.uiBreadcrumbs',
            'ui.router'
        ])
        .config(appRouting);
})();