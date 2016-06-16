(function () {
    'use strict';

    var moduleName = 'Components';

    class AddGroupController {
        constructor(AddGroupService) {
            var ctrl = this;
            ctrl.group = {};
            AddGroupService.createGroup(ctrl.group);
        }
    }

    class AddGroupService {
        constructor($http) {
            this.$http = $http;
        }

        validateUser(group) {
            return false;
        }

        createGroup(group) {
            if (this.validateUser(group)) {
                console.log("User created successfully" + " " + group);
            }
            else {
                console.log("Error");
            }
            /*return this.$http.post('./components/database/users.json', user)
             .then(function handleSuccess(response) {
             return response;
             }, function handleError(response) {
             return response;
             });*/
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