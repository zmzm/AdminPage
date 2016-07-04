(function () {
    'use strict';

    var moduleName = 'Services';

    class GroupDetailService {
        constructor($http) {
            var service = this;
            service.$http = $http;
        }

        findByGroupName(groupName) {
            var service = this;
            return service.$http.get('/groups/' + groupName)
                .then(function handleSuccess(response) {
                    return {
                        status: response.status,
                        message: response.statusText,
                        group: response.data.group,
                        users: response.data.users
                    };
                }, function handleError(response) {
                    return response;
                });
        }

        updateGroup(group) {
            var service = this;
            return service.$http.put('/groups/' + group._id, {group: group})
                .then(function handleSuccess(response) {
                    return {
                        status: response.status,
                        message: response.statusText,
                        group: response.data.group,
                        users: response.data.users
                    };
                }, function handleError(response) {
                    return response;
                });
        }
    }

    GroupDetailService.$inject = ['$http'];

    angular.module(moduleName)
        .service('GroupDetailService', GroupDetailService);
})();