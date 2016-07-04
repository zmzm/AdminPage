(function () {
    'use strict';

    var moduleName = 'Services';

    class UserListService {
        constructor($http) {
            var service = this;
            service.$http = $http;
        }

        getUsers() {
            var service = this;
            return service.$http.get('/users')
                .then(function handleSuccess(response) {
                    return {
                        status: response.status,
                        message: response.statusText,
                        users: response.data.users
                    };
                }, function handleError(response) {
                    return response;
                });
        }
    }
    UserListService.$inject = ['$http'];

    angular.module(moduleName)
        .service('UserListService', UserListService);
})();