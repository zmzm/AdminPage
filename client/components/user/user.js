(function () {
    'use strict';
    var moduleName = 'Components',
        SERVICE = new WeakMap();

    class UserController {
        constructor(UserService) {
            SERVICE.set(this, UserService);
        }

        page() {
            return SERVICE.get(this).pageName();
        }
    }

    UserController.$inject = ['UserService'];

    angular.module(moduleName)
        .component('users', {
            template: '<ng-outlet></ng-outlet>',
            $routeConfig: [
                {path: '/', name: 'UserList', component: 'userList', useAsDefault: true}
            ]
        })
        .component('userList', {
            templateUrl: './components/user/userList.html',
            controller: UserController
        });
})();