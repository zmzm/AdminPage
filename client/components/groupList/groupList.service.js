(function () {
    'use strict';

    var moduleName = 'Services';

    class GroupListService {
        constructor($http) {
            var service = this;
            service.$http = $http;
        }

        getGroups() {
            var service = this;
            return service.$http.get('/groups')
                .then(function handleSuccess(response) {
                    return {
                        status: response.status,
                        message: response.statusText,
                        groups: response.data.groups
                    };
                }, function handleError(response) {
                    return response;
                });
        }
    }

    GroupListService.$inject = ['$http'];

    angular.module(moduleName)
        .service('GroupListService', GroupListService);
})();