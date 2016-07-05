(function () {
    'use strict';

    var moduleName = 'Services';

    class UserListService {
        constructor($http) {
            var service = this;
            service.$http = $http;
        }

        getUsersByPage(page) {
            var service = this;
            return service.$http.get('/users/page/' + page)
                .then(function handleSuccess(response) {
                    return {
                        status: response.status,
                        message: response.statusText,
                        users: response.data.users,
                        totalCount: response.data.totalCount
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