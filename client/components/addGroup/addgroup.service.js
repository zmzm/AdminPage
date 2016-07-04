(function () {
    'use strict';

    var moduleName = 'Services';

    class AddGroupService {
        constructor($http) {
            var service = this;
            service.$http = $http;
        }

        createGroup(group) {
            var service = this;
            if (service.validateGroup(group)) {
                service.$http.post('/groups', group)
                    .then(function handleSuccess(response) {
                        console.log(response);
                        return {
                            status: response.status,
                            message: response.statusText,
                            group: response.data
                        };
                    }, function handleError(response) {
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

    angular.module(moduleName)
        .service('AddGroupService', AddGroupService)
})();