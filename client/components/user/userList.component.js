(function () {
    'use strict';
    var moduleName = 'Components';

    class UserListController {
        constructor(UserListService) {
            var $ctrl = this;
            $ctrl.userList = {};
            UserListService.getUsers()
                .then(function (response) {
                    $ctrl.userList = response.users;
                });
        }
    }

    UserListController.$inject = ['UserListService'];

    class UserListService {
        constructor($http) {
            this.$http = $http;
        }

        getUsers() {
            console.log("Load from server....");
            return this.$http.get('./components/user/users.json')
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

    angular.module(moduleName)
        .service('UserListService', UserListService)
        .component('userList', {
            template: [
                '<div md-whiteframe="20">',
                    '<table class="table table-bordered user-table">',
                        '<thead style="background-color: rgb(63,81,181); color: white">',
                       ' <tr>',
                            '<th>#</th>',
                            '<th>Username</th>',
                            '<th>First Name</th>',
                           ' <th>Last Name</th>',
                            '<th>Email</th>',
                        '</tr>',
                     '</thead>',
                     '<tbody>',
                        '<tr ng-link="[\'UserDetail\', {name: [user.firstName, user.lastName].join(\'-\')}]" ng-repeat="user in $ctrl.userList">',
                            '<th scope="row">{{user.id}}</th>',
                            '<td>{{user.userName}}</td>',
                            '<td>{{user.firstName}}</td>',
                            '<td>{{user.lastName}}</td>',
                            '<td>{{user.email}}</td>',
                        '</tr>',
                       '</tbody>',
                    '</table>',
                '</div>'].join(''),
            controller: UserListController
        });
})();