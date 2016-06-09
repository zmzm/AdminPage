(function () {
    'use strict';
    var moduleName = 'Components';

    class UserDetailController {
        constructor(UserDetailService, $stateParams) {
            var $ctrl = this;
            UserDetailService.findByUsername($stateParams.name)
                .then(function (result) {
                    $ctrl.user = result;
                });
        }
    }

    class UserDetailService {
        constructor($http) {
            this.$http = $http;
        }

        findByUsername(username) {
            var result = {};
            return this.$http.get('./components/database/users.json')
                .then(function handleSuccess(response) {
                    $.map(response.data, function (user) {
                        if (user.userName == username) {
                            result = user;
                        }
                    });
                    return result;
                }, function handleError(response) {
                    return response;
                });
        }
    }

    UserDetailController.$inject = ['UserDetailService', '$stateParams'];

    angular.module(moduleName)
        .service('UserDetailService', UserDetailService)
        .component('userDetail', {
            templateUrl: './components/userDetail/userDetail.html',
            controller: UserDetailController
        })
        .config(config);

    function config($stateProvider) {
        $stateProvider.state('usersDetail', {
            url: '/users/:name',
            template: '<user-detail></user-detail>'
        });
    }
})();