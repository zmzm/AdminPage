(function () {
    'use strict';

    var moduleName = 'Services';

    class GroupListService {
        constructor($http) {
            var service = this;
            service.$http = $http;
        }

        getGroupsByPage(page) {
            var service = this;
            return service.$http.get('/groups/page/' + page)
                .then(function handleSuccess(response) {
                    return {
                        status: response.status,
                        message: response.statusText,
                        groups: response.data.groups,
                        totalCount: response.data.totalCount
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