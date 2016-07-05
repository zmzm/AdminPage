(function () {
    'use strict';

    var moduleName = 'Services';

    class AddGroupService {
        constructor($http, toastr) {
            var service = this;
            service.$http = $http;
            service.toastr = toastr;
        }

        createGroup(group) {
            var service = this;
            if (service.validateGroup(group)) {
                service.$http.post('/groups', group)
                    .then(function handleSuccess(response) {
                        service.toastr.success(response.data.status);
                        console.log(response);
                        return {
                            status: response.status,
                            message: response.statusText,
                            group: response.data
                        };
                    }, function handleError(response) {
                        service.toastr.error(response.data.status);
                        return response;
                    });
            }
            else {
                console.log("Error");
            }
        }

        validateGroup(group) {
            var groupNameRegex = /^[a-z][a-z0-9]*?([-.][a-z0-9]+){0,2}$/i,
                groupTitleRegex = /^[a-z]{2,20}$/i;
            return !!(group.groupName.match(groupNameRegex) && group.title.match(groupTitleRegex));
        }
    }

    AddGroupService.$inject = ['$http', 'toastr'];

    angular.module(moduleName)
        .service('AddGroupService', AddGroupService)
})();