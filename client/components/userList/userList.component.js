(function () {
    'use strict';

    var moduleName = 'Components';

    class UserListController {
        constructor(UserListService, $state) {
            var ctrl = this;
            ctrl.state = $state;
            ctrl.userList = [];
            UserListService.getUsers()
                .then(function (response) {
                    ctrl.userList = response.users;
                });
        }
    }

    UserListController.$inject = ['UserListService', '$state'];

    angular.module(moduleName)
        .component('userList', {
            templateUrl: './components/userList/userList.html',
            controller: UserListController
        })
        .config(config);

    function config($stateProvider) {
        $stateProvider.state('users', {
            url: '/users',
            template: '<user-list></user-list>' +
            '<div ui-view></div>',
            data: {
                displayName: 'Users'
            }
        });
    }
})();