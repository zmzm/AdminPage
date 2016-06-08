'use strict';

angular
    .module('app', [
        'ngMaterial',
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
        '<li><a ng-link="[\'Users\']">USERS</a></li>\n' +
        '<li><a ng-link="[\'Groups\']">GROUPS</a></li>' +
        '</ul>\n' +
        '</div>\n',
        $routeConfig: [
            {path: '/users', name: 'Users', component: 'userList'},
            {path: '/users/:name', name: 'UserDetail', component: 'userDetail'},
            {path: '/groups/...', name: 'Groups', component: 'groups'}
        ]
    });
angular.module('Services', []);
angular.module('Components', []);