(function () {
    'use strict';

    var moduleName = 'Components';

    class GroupListController {
        constructor(GroupListService, $state) {
            var ctrl = this;
            ctrl.state = $state;
            ctrl.groupList = [];
            GroupListService.getGroups()
                .then(function (result) {
                    ctrl.groupList = result.groups;
                    console.log(ctrl.groupList);
                })
        }
    }

    GroupListController.$inject = ['GroupListService', '$state'];

    class GroupListService {
        constructor($http) {
            var service = this;
            service.$http = $http;
        }

        getGroups() {
            var service = this;
            return service.$http.get('/groups')
                .then(function handleSuccess(response) {
                    return {
                        status: response.status,
                        message: response.statusText,
                        groups: response.data.groups
                    };
                }, function handleError(response) {
                    return response;
                });
        }
    }

    GroupListService.$inject = ['$http'];

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
            template: '<group-list></group-list>' +
            '<div ui-view></div>',
            data: {
                displayName: 'Groups'
            }
        });
    }
})();