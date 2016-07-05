(function () {
    'use strict';

    var moduleName = 'Components';

    class AddUserController {
        constructor(UserCreateService) {
            var ctrl = this;
            ctrl.UserCreateService = UserCreateService;
        }

        create() {
            var ctrl = this;
            ctrl.user.group = ctrl.asyncSelected._id;
            ctrl.UserCreateService.createUser(ctrl.user);
            ctrl.user = {};
        }

        findGroup(value) {
            var ctrl = this;
            console.log(value);
            return ctrl.UserCreateService.autocompleteGroups(value);
        }
    }

    AddUserController.$inject = ['AddUserService'];

    angular.module(moduleName)
        .component('addUser', {
            templateUrl: './components/addUser/addUser.html',
            controller: AddUserController
        });
})();