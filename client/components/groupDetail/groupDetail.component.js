(function () {
    'use strict';

    var moduleName = 'Components';

    class GroupDetailController {
        constructor(GroupDetailService, $stateParams) {
            var $ctrl = this;
            $ctrl.groupDetail = [];
            GroupDetailService.findByGroupName($stateParams.groupName)
                .then(function (result) {
                    $ctrl.groupDetail = result;
                })
        }
    }

    GroupDetailController.$inject = ['GroupDetailService', '$stateParams'];

    class GroupDetailService {
        constructor($http) {
            this.$http = $http;
        }

        findByGroupName(groupName) {
            var result = {};
            console.log("Loading from server .....");
            return this.$http.get('./components/database/groups.json')
                .then(function handleSuccess(response) {
                    $.map(response.data, function (group) {
                        if (group.groupName == groupName) {
                            result = group;
                        }
                    });
                    return result;
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