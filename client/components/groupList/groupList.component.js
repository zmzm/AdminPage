(function () {
    'use strict';
    var moduleName = 'Components';

    class GroupListController {
        constructor(GroupListService) {
            var $ctrl = this;
            $ctrl.pageName = GroupListService.pageName();
        }
    }

    class GroupListService {
        pageName() {
            return 'Groups page';
        }
    }

    GroupListController.$inject = ['GroupListService'];

    angular.module(moduleName)
        .service('GroupListService', GroupListService)
        .component('groupList', {
            templateUrl: './components/groupList/groupList.html',
            controller: GroupListController
        })
        .config(config);

    function config($stateProvider) {
        $stateProvider.state('groups', {
            url: '/groups',
            template: '<group-list></group-list>'
        });
    }
})();