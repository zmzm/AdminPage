(function () {
    'use strict';

    var moduleName = 'Components';

    class UserListController {
        constructor(UserListService, $state) {
            var $ctrl = this;
            $ctrl.state = $state;
            $ctrl.userList = [];
            UserListService.getUsers()
                .then(function (response) {
                    $ctrl.userList = response.users;
                });
        }
    }

    UserListController.$inject = ['UserListService', '$state'];

    class UserListService {
        constructor($http) {
            this.$http = $http;
        }

        getUsers() {
            console.log("Loading from server....");
            return this.$http.get('./components/database/users.json')
                .then(function handleSuccess(response) {
                    return {
                        status: response.status,
                        message: response.statusText,
                        users: response.data
                    };
                }, function handleError(response) {
                    return response;
                });
        }
    }
    UserListService.$inject = ['$http'];

    angular.module(moduleName, ['ui.router'])
        .service('UserListService', UserListService)
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