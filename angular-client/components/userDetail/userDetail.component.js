(function () {
    'use strict';

    var moduleName = 'Components';

    class UserDetailController {
        constructor(UserDetailService, $stateParams) {
            var ctrl = this;
            ctrl.user = {};
            ctrl.UserDetailService = UserDetailService;
            UserDetailService.findByUsername($stateParams.name)
                .then(function (result) {
                    console.log(result);
                    ctrl.user = result.user[0];
                });
        }

        update() {
            var ctrl = this;
            ctrl.UserDetailService.updateUser(ctrl.user)
                .then(function (result) {
                    //console.log(result);
                });
        }

        removeGroup(userId, group) {
            var ctrl = this;
            ctrl.UserDetailService.removeGroup(userId, group)
                .then(function (result) {
                    console.log(result);
                    ctrl.user = result.user;
                });
        }

        findGroup(value) {
            var ctrl = this;
            console.log(value);
            return ctrl.UserDetailService.autocompleteGroups(value);
        }

        addGroup() {
            var ctrl = this;
            ctrl.UserDetailService.addGroup(ctrl.user._id, ctrl.asyncSelected._id)
                .then(function (result) {
                    console.log(result);
                    ctrl.user = result.user;
                });
        }
    }

    UserDetailController.$inject = ['UserDetailService', '$stateParams'];

    angular.module(moduleName)
        .config(config)
        .component('userDetail', {
            templateUrl: './components/userDetail/userDetail.html',
            controller: UserDetailController
        });

    function config($stateProvider) {
        $stateProvider.state('users.detail', {
            url: '/:name',
            template: '<user-detail></user-detail>',
            data: {
                displayName: '{{$stateParams.name}}'
            }
        });
    }
})();