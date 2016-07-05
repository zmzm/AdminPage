(function () {
    'use strict';

    var moduleName = 'Components';

    class UserListController {
        constructor(UserListService, $state) {
            var ctrl = this;
            ctrl.state = $state;
            ctrl.UserListService = UserListService;
            ctrl.currentPage = 1;
            ctrl.itemsPerPage = 5;
            ctrl.userList = [];
            ctrl.getUsers(ctrl.currentPage);
        }

        getUsers(page) {
            var ctrl = this;
            ctrl.UserListService.getUsersByPage(page)
                .then(function (response) {
                    ctrl.userList = response.users;
                    ctrl.totalItems = response.totalCount;
                });
        }

        changePage() {
            var ctrl = this;
            ctrl.getUsers(ctrl.currentPage);
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