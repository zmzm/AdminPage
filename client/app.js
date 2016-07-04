(function () {
    'use strict';

    angular.module('Components', []);

    angular
        .module('app', [
            'ngMaterial',
            'ui.bootstrap',
            'angularUtils.directives.uiBreadcrumbs',
            'ui.router',
            'Components'
        ])
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('main', {
                    url: '/',
                    templateUrl: 'home.html',
                    data: {
                        displayName: "Home"
                    }
                });
            $urlRouterProvider.otherwise('/');
        });
})();