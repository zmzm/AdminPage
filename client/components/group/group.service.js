(function () {
    var moduleName = 'Services';

    class GroupService {
        pageName() {
            return 'Groups page';
        }
    }

    angular.module(moduleName)
        .service('GroupService', GroupService);
})();