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

    AddGroupController.$inject = ['AddGroupService', '$stateParams'];

    angular.module(moduleName)
        .component('addGroup', {
            templateUrl: './components/addGroup/addGroup.html',
            controller: AddGroupController
        });
})();