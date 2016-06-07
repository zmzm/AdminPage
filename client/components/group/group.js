(function () {
    'use strict';
    var moduleName = 'Components',
        SERVICE = new WeakMap();

    class GroupController {
        constructor(GroupService) {
            SERVICE.set(this, GroupService);
        }

        page() {
            return SERVICE.get(this).pageName();
        }
    }

    GroupController.$inject = ['GroupService'];

    angular.module(moduleName)
        .component('groups', {
            template: '<ng-outlet></ng-outlet>',
            $routeConfig: [
                {path: '/', name: 'GroupList', component: 'groupList', useAsDefault: true}
            ]
        })
        .component('groupList', {
            templateUrl: './components/group/groupList.html',
            controller: GroupController
        });
})();