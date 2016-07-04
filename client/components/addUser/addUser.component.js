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
            ctrl.user.group = ctrl.asyncSelected._id;
            ctrl.UserCreateService.createUser(ctrl.user);
        }

        findGroup(value) {
            var ctrl = this;
            console.log(value);
            return ctrl.UserCreateService.autocompleteGroups(value);
        }
    }

    class AddUserService {
        constructor($http) {
            var service = this;
            service.$http = $http;
        }

        createUser(user) {
            var service = this;
            if (service.validateUser(user)) {
                service.$http.post('/users', user)
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
                userLastNameRegex = /^[a-z]{2,20}$/i;
            return !!(user.username.match(usernameRegex) && user.firstName.match(userFirstNameRegex) && user.lastName.match(userLastNameRegex)
            );
        }

        autocompleteGroups(value) {
            var service = this;
            return service.$http.get('/groups/autocomplete/query?q=' + value)
                .then(function (response) {
                    console.log(response);
                    return response.data.groups.map(function (item) {
                        return item;
                    });
                });
        }
    }

    AddUserController.$inject = ['AddUserService'];

    angular.module(moduleName)
        .service('AddUserService', AddUserService)
        .component('addUser', {
            templateUrl: './components/addUser/addUser.html',
            controller: AddUserController
        });
})();