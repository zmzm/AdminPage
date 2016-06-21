(function () {
    'use strict';

    var moduleName = 'Components';

    class AddGroupController {
        constructor(AddGroupService) {
            var ctrl = this;
            ctrl.AddGroupService = AddGroupService;
        }

        create() {
            var ctrl = this;
            ctrl.AddGroupService.createGroup(ctrl.group);
        }
    }

    class AddGroupService {
        constructor($http) {
            this.$http = $http;
        }

        createGroup(group) {
            if (this.validateGroup(group)) {
                this.$http.post('/groups/create', group)
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

    AddGroupController.$inject = ['AddGroupService', '$stateParams'];

    angular.module(moduleName)
        .service('AddGroupService', AddGroupService)
        .component('addGroup', {
            templateUrl: './components/addGroup/addGroup.html',
            controller: AddGroupController
        });
})();