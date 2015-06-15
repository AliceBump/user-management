angular.module('userMgmtApp', [
    'ngRoute',
    'userMgmtApp.user-list',
    'userMgmtApp.user-detail',
    'userMgmtApp.userFactory',
    'userMgmtApp.userService',
    'LocalStorageModule',
    'uuid4',
    'ui.utils',
    'smart-table'
]).
    config(['$routeProvider', function ($routeProvider) {
        'use strict';

        $routeProvider.
            when('/users', {
                templateUrl: 'user-list/user-list.html',
                controller: 'UserListCtrl'
            }).
            when('/users/:id', {
                templateUrl: 'user-detail/user-detail.html',
                controller: 'UserDetailCtrl'
            }).
            otherwise({
                redirectTo: '/users'
            });
    }]).
    config(['localStorageServiceProvider', function (localStorageServiceProvider) {
        'use strict';

        localStorageServiceProvider.setPrefix('userMgmtApp');
    }]);
