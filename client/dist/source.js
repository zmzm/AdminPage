(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function () {
    'use strict';

    angular.module('Components', []);

    angular.module('app', ['ngMaterial', 'ui.bootstrap', 'angularUtils.directives.uiBreadcrumbs', 'ui.router', 'Components']).config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('main', {
            url: '/',
            templateUrl: 'home.html',
            data: {
                displayName: "Home"
            }
        });
        $urlRouterProvider.otherwise('/');
    });
})();

},{}],2:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
    'use strict';

    var moduleName = 'Components';

    var AddGroupController = (function () {
        function AddGroupController(AddGroupService) {
            _classCallCheck(this, AddGroupController);

            var ctrl = this;
            ctrl.AddGroupService = AddGroupService;
        }

        AddGroupController.prototype.create = function create() {
            var ctrl = this;
            ctrl.AddGroupService.createGroup(ctrl.group);
        };

        return AddGroupController;
    })();

    var AddGroupService = (function () {
        function AddGroupService($http) {
            _classCallCheck(this, AddGroupService);

            var service = this;
            service.$http = $http;
        }

        AddGroupService.prototype.createGroup = function createGroup(group) {
            var service = this;
            if (service.validateGroup(group)) {
                service.$http.post('/groups', group).then(function handleSuccess(response) {
                    console.log(response);
                    return {
                        status: response.status,
                        message: response.statusText,
                        group: response.data
                    };
                }, function handleError(response) {
                    return response;
                });
            } else {
                console.log("Error");
            }
        };

        AddGroupService.prototype.validateGroup = function validateGroup(group) {
            var groupNameRegex = /^[a-z][a-z0-9]*?([-.][a-z0-9]+){0,2}$/i,
                groupTitleRegex = /^[a-z]{2,20}$/i;
            return !!(group.groupName.match(groupNameRegex) && group.title.match(groupTitleRegex));
        };

        return AddGroupService;
    })();

    AddGroupController.$inject = ['AddGroupService', '$stateParams'];

    angular.module(moduleName).service('AddGroupService', AddGroupService).component('addGroup', {
        templateUrl: './components/addGroup/addGroup.html',
        controller: AddGroupController
    });
})();

},{}],3:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
    'use strict';

    var moduleName = 'Components';

    var AddUserController = (function () {
        function AddUserController(UserCreateService) {
            _classCallCheck(this, AddUserController);

            var ctrl = this;
            ctrl.UserCreateService = UserCreateService;
        }

        AddUserController.prototype.create = function create() {
            var ctrl = this;
            ctrl.user.group = ctrl.asyncSelected._id;
            ctrl.UserCreateService.createUser(ctrl.user);
        };

        AddUserController.prototype.findGroup = function findGroup(value) {
            var ctrl = this;
            console.log(value);
            return ctrl.UserCreateService.autocompleteGroups(value);
        };

        return AddUserController;
    })();

    var AddUserService = (function () {
        function AddUserService($http) {
            _classCallCheck(this, AddUserService);

            var service = this;
            service.$http = $http;
        }

        AddUserService.prototype.createUser = function createUser(user) {
            var service = this;
            if (service.validateUser(user)) {
                service.$http.post('/users', user).then(function handleSuccess(response) {
                    console.log(response);
                    return {
                        status: response.status,
                        message: response.statusText,
                        user: response.data
                    };
                }, function handleError(response) {
                    return response;
                });
            } else {
                console.log("Error");
            }
        };

        AddUserService.prototype.validateUser = function validateUser(user) {
            var usernameRegex = /^[a-z][a-z0-9]*?([-.][a-z0-9]+){0,2}$/i,
                userFirstNameRegex = /^[a-z]*?([\s-][a-z]+){0,2}$/i,
                userLastNameRegex = /^[a-z]{2,20}$/i;
            return !!(user.username.match(usernameRegex) && user.firstName.match(userFirstNameRegex) && user.lastName.match(userLastNameRegex));
        };

        AddUserService.prototype.autocompleteGroups = function autocompleteGroups(value) {
            var service = this;
            return service.$http.get('/groups/autocomplete/query?q=' + value).then(function (response) {
                console.log(response);
                return response.data.groups.map(function (item) {
                    return item;
                });
            });
        };

        return AddUserService;
    })();

    AddUserController.$inject = ['AddUserService'];

    angular.module(moduleName).service('AddUserService', AddUserService).component('addUser', {
        templateUrl: './components/addUser/addUser.html',
        controller: AddUserController
    });
})();

},{}],4:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
    'use strict';

    var moduleName = 'Components';

    var GroupDetailController = (function () {
        function GroupDetailController(GroupDetailService, $stateParams) {
            _classCallCheck(this, GroupDetailController);

            var ctrl = this;
            ctrl.groupDetail = [];
            ctrl.GroupDetailService = GroupDetailService;
            ctrl.GroupDetailService.findByGroupName($stateParams.groupName).then(function (result) {
                ctrl.groupDetail = result.group;
                ctrl.groupDetail.users = result.users;
            });
        }

        GroupDetailController.prototype.update = function update() {
            var ctrl = this;
            ctrl.GroupDetailService.updateGroup(ctrl.groupDetail).then(function (result) {
                console.log(result);
            });
        };

        return GroupDetailController;
    })();

    GroupDetailController.$inject = ['GroupDetailService', '$stateParams'];

    var GroupDetailService = (function () {
        function GroupDetailService($http) {
            _classCallCheck(this, GroupDetailService);

            var service = this;
            service.$http = $http;
        }

        GroupDetailService.prototype.findByGroupName = function findByGroupName(groupName) {
            var service = this;
            return service.$http.get('/groups/' + groupName).then(function handleSuccess(response) {
                return {
                    status: response.status,
                    message: response.statusText,
                    group: response.data.group,
                    users: response.data.users
                };
            }, function handleError(response) {
                return response;
            });
        };

        GroupDetailService.prototype.updateGroup = function updateGroup(group) {
            var service = this;
            return service.$http.put('/groups/' + group._id, { group: group }).then(function handleSuccess(response) {
                return {
                    status: response.status,
                    message: response.statusText,
                    group: response.data.group,
                    users: response.data.users
                };
            }, function handleError(response) {
                return response;
            });
        };

        return GroupDetailService;
    })();

    GroupDetailService.$inject = ['$http'];

    angular.module(moduleName).service('GroupDetailService', GroupDetailService).component('groupDetail', {
        templateUrl: './components/groupDetail/groupDetail.html',
        controller: GroupDetailController
    }).config(config);

    function config($stateProvider) {
        $stateProvider.state('groups.detail', {
            url: '/:groupName',
            template: '<group-detail></group-detail>',
            data: {
                displayName: '{{$stateParams.groupName}}'
            }
        });
    }
})();

},{}],5:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
    'use strict';

    var moduleName = 'Components';

    var GroupListController = function GroupListController(GroupListService, $state) {
        _classCallCheck(this, GroupListController);

        var ctrl = this;
        ctrl.state = $state;
        ctrl.groupList = [];

        if ($state.current.name == 'groups') {
            GroupListService.getGroups().then(function (result) {
                ctrl.groupList = result.groups;
            });
        }
    };

    GroupListController.$inject = ['GroupListService', '$state'];

    var GroupListService = (function () {
        function GroupListService($http) {
            _classCallCheck(this, GroupListService);

            var service = this;
            service.$http = $http;
        }

        GroupListService.prototype.getGroups = function getGroups() {
            var service = this;
            return service.$http.get('/groups').then(function handleSuccess(response) {
                return {
                    status: response.status,
                    message: response.statusText,
                    groups: response.data.groups
                };
            }, function handleError(response) {
                return response;
            });
        };

        return GroupListService;
    })();

    GroupListService.$inject = ['$http'];

    angular.module(moduleName).service('GroupListService', GroupListService).component('groupList', {
        templateUrl: './components/groupList/groupList.html',
        controller: GroupListController
    }).config(config);

    function config($stateProvider) {
        $stateProvider.state('groups', {
            url: '/groups',
            template: '<group-list></group-list>' + '<div ui-view></div>',
            data: {
                displayName: 'Groups'
            }
        });
    }
})();

},{}],6:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
    'use strict';
    var moduleName = 'Components';

    var UserDetailController = (function () {
        function UserDetailController(UserDetailService, $stateParams) {
            _classCallCheck(this, UserDetailController);

            var ctrl = this;
            ctrl.user = {};
            ctrl.UserDetailService = UserDetailService;
            UserDetailService.findByUsername($stateParams.name).then(function (result) {
                console.log(result);
                ctrl.user = result.user[0];
            });
        }

        UserDetailController.prototype.update = function update() {
            var ctrl = this;
            ctrl.UserDetailService.updateUser(ctrl.user).then(function (result) {
                console.log(result);
            });
        };

        UserDetailController.prototype.removeGroup = function removeGroup(userId, group) {
            var ctrl = this;
            ctrl.UserDetailService.removeGroup(userId, group).then(function (result) {
                console.log(result);
                ctrl.user = result;
            });
        };

        UserDetailController.prototype.findGroup = function findGroup(value) {
            var ctrl = this;
            console.log(value);
            return ctrl.UserDetailService.autocompleteGroups(value);
        };

        UserDetailController.prototype.addGroup = function addGroup() {
            var ctrl = this;
            ctrl.UserDetailService.addGroup(ctrl.user._id, ctrl.asyncSelected._id).then(function (result) {
                console.log(result);
            });
        };

        return UserDetailController;
    })();

    var UserDetailService = (function () {
        function UserDetailService($http) {
            _classCallCheck(this, UserDetailService);

            var service = this;
            service.$http = $http;
        }

        UserDetailService.prototype.findByUsername = function findByUsername(username) {
            var service = this;
            return service.$http.get('/users/' + username).then(function handleSuccess(response) {
                return {
                    status: response.status,
                    message: response.statusText,
                    user: response.data.user
                };
            }, function handleError(response) {
                return response;
            });
        };

        UserDetailService.prototype.updateUser = function updateUser(user) {
            var service = this;
            return service.$http.put('/users/' + user._id, { user: user }).then(function handleSuccess(response) {
                return {
                    status: response.status,
                    message: response.statusText,
                    user: response.data.user
                };
            }, function handleError(response) {
                return response;
            });
        };

        UserDetailService.prototype.removeGroup = function removeGroup(userId, group) {
            var service = this;
            return service.$http['delete']('/users/' + userId + '/groups/' + group._id).then(function handleSuccess(response) {
                return {
                    status: response.status,
                    message: response.statusText,
                    user: response.data.user
                };
            }, function handleError(response) {
                return response;
            });
        };

        UserDetailService.prototype.autocompleteGroups = function autocompleteGroups(value) {
            var service = this;
            return service.$http.get('/groups/autocomplete/query?q=' + value).then(function (response) {
                console.log(response);
                return response.data.groups.map(function (item) {
                    return item;
                });
            });
        };

        UserDetailService.prototype.addGroup = function addGroup(userId, group) {
            var service = this;
            return service.$http.put('/users/' + userId + '/groups', { group: group }).then(function handleSuccess(response) {
                return {
                    status: response.status,
                    message: response.statusText,
                    user: response.data.user
                };
            }, function handleError(response) {
                return response;
            });
        };

        return UserDetailService;
    })();

    UserDetailController.$inject = ['UserDetailService', '$stateParams'];

    angular.module(moduleName).config(config).service('UserDetailService', UserDetailService).component('userDetail', {
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

},{}],7:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
    'use strict';

    var moduleName = 'Components';

    var UserListController = function UserListController(UserListService, $state) {
        _classCallCheck(this, UserListController);

        var ctrl = this;
        ctrl.state = $state;
        ctrl.userList = [];
        UserListService.getUsers().then(function (response) {
            ctrl.userList = response.users;
        });
    };

    UserListController.$inject = ['UserListService', '$state'];

    var UserListService = (function () {
        function UserListService($http) {
            _classCallCheck(this, UserListService);

            var service = this;
            service.$http = $http;
        }

        UserListService.prototype.getUsers = function getUsers() {
            var service = this;
            return service.$http.get('/users').then(function handleSuccess(response) {
                return {
                    status: response.status,
                    message: response.statusText,
                    users: response.data.users
                };
            }, function handleError(response) {
                return response;
            });
        };

        return UserListService;
    })();

    UserListService.$inject = ['$http'];

    angular.module(moduleName).service('UserListService', UserListService).component('userList', {
        templateUrl: './components/userList/userList.html',
        controller: UserListController
    }).config(config);

    function config($stateProvider) {
        $stateProvider.state('users', {
            url: '/users',
            template: '<user-list></user-list>' + '<div ui-view></div>',
            data: {
                displayName: 'Users'
            }
        });
    }
})();

},{}]},{},[1,2,3,4,5,6,7]);
