(function () {
    'use strict';

    var moduleName = 'Services';

    class UserDetailService {
        constructor($http, toastr) {
            var service = this;
            service.$http = $http;
            service.toastr = toastr;
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
                    service.toastr.success(response.data.status);
                    console.log(response);
                    return {
                        status: response.status,
                        message: response.statusText,
                        user: response.data.user
                    };
                }, function handleError(response) {
                    service.toastr.error(response.data.status);
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
            return service.$http.put('/users/' + userId + '/groups', {group: group})
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

    UserDetailService.$inject = ['$http', 'toastr'];

    angular.module(moduleName)
        .service('UserDetailService', UserDetailService);
})();