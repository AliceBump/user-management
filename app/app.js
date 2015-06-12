angular.module('userMgmtApp', [
    'ngRoute',
    'userMgmtApp.user-list',
    'userMgmtApp.user-detail',
    'userMgmtApp.usersFactory',
    'LocalStorageModule',
    'uuid4',
    'ui.utils',
    'smart-table'
]).
    config(['$routeProvider', function ($routeProvider) {
        'use strict';

        $routeProvider.otherwise({
            redirectTo: '/users'
        });
    }]).
    config(['localStorageServiceProvider', function (localStorageServiceProvider) {
        'use strict';

        localStorageServiceProvider.setPrefix('userMgmtApp');
    }]);
