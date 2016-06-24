(function () {
    'use strict';

    var moduleName = 'Components';

    class GroupDetailController {
        constructor(GroupDetailService, $stateParams) {
            var ctrl = this;
            ctrl.groupDetail = [];
            GroupDetailService.findByGroupName($stateParams.groupName)
                .then(function (result) {
                    ctrl.groupDetail = result.group;
                })
        }
    }

    GroupDetailController.$inject = ['GroupDetailService', '$stateParams'];

    class GroupDetailService {
        constructor($http) {
            var service = this;
            service.$http = $http;
        }

        findByGroupName(groupName) {
            var service = this;
            return service.$http.get('/groups/' + groupName)
                .then(function handleSuccess(response) {
                    return {
                        status: response.status,
                        message: response.statusText,
                        group: response.data.group
                    };
                }, function handleError(response) {
                    return response;
                });
        }
    }

    GroupDetailService.$inject = ['$http'];

    angular.module(moduleName)
        .service('GroupDetailService', GroupDetailService)
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