'use strict';

angular
    .module('app', [
        'Services',
        'Components',
        'ngComponentRouter'
    ])
    .config(function ($locationProvider) {
        $locationProvider.html5Mode(true);
    })

    .value('$routerRootComponent', 'app')

    .component('app', {
        template: '<div class="navbar-collapse collapse navbar-right">\n' +
        '<ul class="nav navbar-nav">\n' +
        '<li><a ng-link="[\'USERS\']">USERS</a></li>\n' +
        '<li><a ng-link="[\'GROUPS\']">GROUPS</a></li>' +
        '</ul>\n' +
        '</div>\n',
        $routeConfig: [
            {path: '/user/...', name: 'USERS', component: 'users'},
            {path: '/group/...', name: 'GROUPS', component: 'groups'}
        ]
    });

angular.module('Services', []);
angular.module('Components', []);