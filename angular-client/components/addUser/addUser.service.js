(function () {
    'use strict';

    var moduleName = 'Services';

    class AddUserService {
        constructor($http, toastr) {
            var service = this;
            service.$http = $http;
            service.toastr = toastr;
        }

        createUser(user) {
            var service = this;
            if (service.validateUser(user)) {
                service.$http.post('/users', user)
                    .then(function handleSuccess(response) {
                        service.toastr.success(response.data.status);
                        console.log(response);
                        return {
                            status: response.status,
                            message: response.statusText,
                            user: response.data
                        };
                    }, function handleError(response) {
                        service.toastr.error(response.data.status);
                        console.log(response);
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

    AddUserService.$inject = ['$http', 'toastr'];

    angular.module(moduleName)
        .service('AddUserService', AddUserService);
})();