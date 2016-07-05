(function () {
    'use strict';

    var moduleName = 'Components';

    class GroupListController {
        constructor(GroupListService, $state) {
            var ctrl = this;
            ctrl.state = $state;
            ctrl.currentPage = 1;
            ctrl.itemsPerPage = 5;
            ctrl.groupList = [];
            ctrl.GroupListService = GroupListService;

            if ($state.current.name == 'groups') {
                ctrl.getGroups(ctrl.currentPage);
            }

        }

        getGroups(page) {
            var ctrl = this;
            ctrl.GroupListService.getGroupsByPage(page)
                .then(function (response) {
                    ctrl.groupList = response.groups;
                    ctrl.totalItems = response.totalCount;
                });
        }

        changePage() {
            var ctrl = this;
            ctrl.getGroups(ctrl.currentPage);
        }
    }

    GroupListController.$inject = ['GroupListService', '$state'];

    angular.module(moduleName)
        .component('groupList', {
            templateUrl: './components/groupList/groupList.html',
            controller: GroupListController
        })
        .config(config);

    function config($stateProvider) {
        $stateProvider.state('groups', {
            url: '/groups',
            template: '<group-list></group-list>' +
            '<div ui-view></div>',
            data: {
                displayName: 'Groups'
            }
        });
    }
})();