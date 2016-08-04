(function () {
    'use strict';

    var moduleName = 'Services';

    class GroupDetailService {
        constructor($http, toastr) {
            var service = this;
            service.$http = $http;
            service.toastr = toastr;
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
                    console.log(response);
                    service.toastr.success(response.data.status);
                    return {
                        status: response.status,
                        message: response.statusText,
                        group: response.data.group,
                        users: response.data.users
                    };
                }, function handleError(response) {
                    console.log(response);
                    service.toastr.error(response.data.status);
                    return response;
                });
        }
    }

    GroupDetailService.$inject = ['$http', 'toastr'];

    angular.module(moduleName)
        .service('GroupDetailService', GroupDetailService);
})();