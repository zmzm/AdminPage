(function () {
    'use strict';
    var moduleName = 'Components';

    class UserDetailController {
        constructor() {
            var $ctrl = this;
            $ctrl.$routerOnActivate = function (next) {
                $ctrl.user = {
                    firstName: next.params.name.split('-')[0],
                    lastName: next.params.name.split('-')[1]
                };
                console.log($ctrl.user);
            };
        }
    }

    class UserDetailService {
        constructor($http) {
            this.$http = $http;
        }
    }

    UserDetailController.$inject = ['UserDetailService'];

    angular.module(moduleName)
        .service('UserDetailService', UserDetailService)
        .component('userDetail', {
            templateUrl: './components/user/userDetail.html',
            bindings: {$router: '<'},
            controller: UserDetailController
        });
})();