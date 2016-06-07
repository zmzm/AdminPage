(function () {
    var moduleName = 'Services';

    class UserService {
        pageName() {
            return 'Users page';
        }
    }

    angular.module(moduleName)
        .service('UserService', UserService);
})();