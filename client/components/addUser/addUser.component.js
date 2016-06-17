(function () {
    'use strict';

    var moduleName = 'Components';

    class AddUserController {
        constructor(UserCreateService) {
            var ctrl = this;
            ctrl.UserCreateService = UserCreateService;
        }

        create() {
            var ctrl = this;
            ctrl.UserCreateService.createUser(ctrl.user);
        }
    }

    class AddUserService {
        constructor($http) {
            this.$http = $http;
        }

        createUser(user) {
            if (this.validateUser(user)) {
                console.log("User created successfully" + " " + user);
                this.$http.post('/user/create', user)
                    .then(function handleSuccess(response) {
                        console.log(response);
                        return {
                            status: response.status,
                            message: response.statusText,
                            user: response.data
                        };
                    }, function handleError(response) {
                        return response;
                    });
            }
            else {
                console.log("Error");
            }
        }

        validateUser(user) {
            var usernameRegex = /^[a-z][a-z0-9]*?([-.][a-z0-9]+){0,2}$/i,
                userFirstNameRegex = /^[a-z]*?([\s-][a-z]+){0,2}$/i,
                userLastNameRegex = /^[a-z]{2,20}$/i
                /*userEmailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/*/;
            return !!(user.userName.match(usernameRegex) && user.firstName.match(userFirstNameRegex)
            && user.lastName.match(userLastNameRegex) /*&& user.email.match(userEmailRegex)*/);
        }
    }

    AddUserController.$inject = ['AddUserService', '$stateParams'];

    angular.module(moduleName)
        .service('AddUserService', AddUserService)
        .component('addUser', {
            templateUrl: './components/addUser/addUser.html',
            controller: AddUserController
        });
})();