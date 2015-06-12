angular.module('userMgmtApp.user-detail', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        'use strict';

        $routeProvider.when('/users/:id', {
            templateUrl: 'user-detail/user-detail.html',
            controller: 'UserDetailCtrl'
        });
    }])

    .controller('UserDetailCtrl', ['$scope', '$location', '$routeParams', 'uuid4', 'usersFactory', function ($scope, $location, $routeParams, uuid4, usersFactory) {
        'use strict';
        
        $scope.user = usersFactory.get($routeParams.id);
        $scope.tokens = usersFactory.get($routeParams.id).tokens || [];

        $scope.$watch($scope.user, function () {
            usersFactory.set($routeParams.id, $scope.user);
        }, true);
        
        $scope.editUser = function (user) {
            $scope.user.selected = angular.copy(user);
        };

        $scope.updateUser = function (user) {
            $scope.user.selected.updated = new Date();
            usersFactory.set(user.id, $scope.user.selected);
            $scope.user = $scope.user.selected;
        };

        $scope.deleteUser = function (user) {
            var userIds = usersFactory.get('userIds');
            
            userIds.splice(userIds.indexOf(user.id), 1);
            usersFactory.set('userIds', userIds);
            
            usersFactory.remove(user.id);
            
            $location.path('/user');
        };
    }])
    .directive('myTokens', function ($routeParams, uuid4, usersFactory) {
        'use strict';

        return {
            restrict: 'E',
            controller: function ($scope) {
                $scope.addToken = function () {
                    var newValue = uuid4.generate(),
                        newToken;

                    if ($scope.tokens.length === 0) {
                        $scope.user.tokens = [];
                        newToken = 0;
                    } else {
                        newToken = $scope.user.tokens.length;
                    }

                    $scope.user.tokens[newToken] = newValue;
                    usersFactory.set($routeParams.id, $scope.user);

                    $scope.tokens = usersFactory.get($routeParams.id).tokens;
                };

                $scope.deleteToken = function (index) {
                    $scope.tokens.splice(index, 1);
                    $scope.user.tokens = $scope.tokens;
                    usersFactory.set($routeParams.id, $scope.user);
                };
            },
            templateUrl: 'user-detail/my-tokens.html'
        };
    });
