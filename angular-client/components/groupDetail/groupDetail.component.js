(function () {
    'use strict';

    var moduleName = 'Components';

    class GroupDetailController {
        constructor(GroupDetailService, $stateParams) {
            var ctrl = this;
            ctrl.groupDetail = [];
            ctrl.GroupDetailService = GroupDetailService;
            ctrl.GroupDetailService.findByGroupName($stateParams.groupName)
                .then(function (result) {
                    ctrl.groupDetail = result.group;
                    ctrl.groupDetail.users = result.users;
                });
        }

        update() {
            var ctrl = this;
            ctrl.GroupDetailService.updateGroup(ctrl.groupDetail)
                .then(function (result) {
                    //console.log(result);
                });
        }
    }

    GroupDetailController.$inject = ['GroupDetailService', '$stateParams'];

    angular.module(moduleName)
        .component('groupDetail', {
            templateUrl: './components/groupDetail/groupDetail.html',
            controller: GroupDetailController
        })
        .config(config);

    function config($stateProvider) {
        $stateProvider.state('groups.detail', {
            url: '/:groupName',
            template: '<group-detail></group-detail>',
            data: {
                displayName: '{{$stateParams.groupName}}'
            }
        });
    }
})();