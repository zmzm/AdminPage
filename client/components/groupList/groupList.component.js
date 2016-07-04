(function () {
    'use strict';

    var moduleName = 'Components';

    class GroupListController {
        constructor(GroupListService, $state) {
            var ctrl = this;
            ctrl.state = $state;
            ctrl.groupList = [];

            if ($state.current.name == 'groups') {
                GroupListService.getGroups()
                    .then(function (result) {
                        ctrl.groupList = result.groups;
                    });
            }

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