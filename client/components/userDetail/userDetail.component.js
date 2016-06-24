(function () {
    'use strict';
    var moduleName = 'Components';

    class UserDetailController {
        constructor(UserDetailService, $stateParams) {
            var ctrl = this;
            ctrl.user = {};
            UserDetailService.findByUsername($stateParams.name)
                .then(function (result) {
                    ctrl.user = result.user[0];
                    console.log(ctrl.user);
                });
        }
    }

    class UserDetailService {
        constructor($http) {
            var service = this;
            service.$http = $http;
        }

        findByUsername(username) {
            var service = this;
            return service.$http.get('/users/' + username)
                .then(function handleSuccess(response) {
                    return {
                        status: response.status,
                        message: response.statusText,
                        user: response.data.user
                    };
                }, function handleError(response) {
                    return response;
                });
        }
    }

    UserDetailController.$inject = ['UserDetailService', '$stateParams'];

    angular.module(moduleName)
        .config(config)
        .service('UserDetailService', UserDetailService)
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