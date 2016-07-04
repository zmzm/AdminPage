(function () {
    'use strict';
    var moduleName = 'Components';

    class UserDetailController {
        constructor(UserDetailService, $stateParams) {
            var ctrl = this;
            ctrl.user = {};
            ctrl.UserDetailService = UserDetailService;
            UserDetailService.findByUsername($stateParams.name)
                .then(function (result) {
                    console.log(result);
                    ctrl.user = result.user[0];
                });
        }

        update() {
            var ctrl = this;
            ctrl.UserDetailService.updateUser(ctrl.user)
                .then(function (result) {
                    console.log(result);
                });
        }

        removeGroup(userId, group) {
            var ctrl = this;
            ctrl.UserDetailService.removeGroup(userId, group)
                .then(function (result) {
                    console.log(result);
                    ctrl.user = result;
                });
        }

        findGroup(value) {
            var ctrl = this;
            console.log(value);
            return ctrl.UserDetailService.autocompleteGroups(value);
        }

        addGroup() {
            var ctrl = this;
            ctrl.UserDetailService.addGroup(ctrl.user._id, ctrl.asyncSelected._id)
                .then(function (result) {
                    console.log(result);
                });
        }
    }

    class UserDetailService {
        constructor($http) {
            var service = this;
            service.$http = $http;
        }

        findByUsername(username) {
            var service = this;
            return service.$http.get('/users/' + username)
                .then(function handleSuccess(response) {
                    return {
                        status: response.status,
                        message: response.statusText,
                        user: response.data.user
                    };
                }, function handleError(response) {
                    return response;
                });
        }

        updateUser(user) {
            var service = this;
            return service.$http.put('/users/' + user._id, {user: user})
                .then(function handleSuccess(response) {
                    return {
                        status: response.status,
                        message: response.statusText,
                        user: response.data.user
                    };
                }, function handleError(response) {
                    return response;
                });
        }

        removeGroup(userId, group) {
            var service = this;
            return service.$http.delete('/users/' + userId + '/groups/' + group._id)
                .then(function handleSuccess(response) {
                    return {
                        status: response.status,
                        message: response.statusText,
                        user: response.data.user
                    };
                }, function handleError(response) {
                    return response;
                });
        }

        autocompleteGroups(value) {
            var service = this;
            return service.$http.get('/groups/autocomplete/query?q=' + value)
                .then(function (response) {
                    console.log(response);
                    return response.data.groups.map(function (item) {
                        return item;
                    });
                });
        }

        addGroup(userId, group) {
            var service = this;
            return service.$http.put('/users/' + userId + '/groups', {group:group})
                .then(function handleSuccess(response) {
                    return {
                        status: response.status,
                        message: response.statusText,
                        user: response.data.user
                    };
                }, function handleError(response) {
                    return response;
                });
        }
    }

    UserDetailController.$inject = ['UserDetailService', '$stateParams'];

    angular.module(moduleName)
        .config(config)
        .service('UserDetailService', UserDetailService)
        .component('userDetail', {
            templateUrl: './components/userDetail/userDetail.html',
            controller: UserDetailController
        });

    function config($stateProvider) {
        $stateProvider.state('users.detail', {
            url: '/:name',
            template: '<user-detail></user-detail>',
            data: {
                displayName: '{{$stateParams.name}}'
            }
        });
    }
})();