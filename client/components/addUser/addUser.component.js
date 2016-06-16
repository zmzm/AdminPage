(function () {
    'use strict';

    var moduleName = 'Components';

    class UserCreateController {
        constructor(UserCreateService) {
            var ctrl = this;
            ctrl.user = {};
            UserCreateService.createUser(ctrl.user);
        }
    }

    class UserCreateService {
        constructor($http) {
            this.$http = $http;
        }

        createUser(user) {
            if (this.validateUser(user)) {
                console.log("User created successfully" + " " + user);
            }
            else {
                console.log("Error");
            }
            /*return this.$http.post('./components/database/users.json', user)
             .then(function handleSuccess(response) {
             return response;
             }, function handleError(response) {
             return response;
             });*/
        }

        validateUser(user) {
            return false;
        }
    }

    UserCreateController.$inject = ['UserCreateService', '$stateParams'];

    angular.module(moduleName)
        .service('UserCreateService', UserCreateService)
        .component('addUser', {
            templateUrl: './components/addUser/addUser.html',
            controller: UserCreateController
        });
})();