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

        // Watch the user object for any changes
        $scope.$watch($scope.user, function () {
            usersFactory.set($routeParams.id, $scope.user);
        });
        
        // Makes a copy of the user when Edit button is clicked
        $scope.editUser = function (user) {
            $scope.user.selected = angular.copy(user);
        };

        // Saves updated user when Save button is clicked
        $scope.updateUser = function (user) {
            $scope.user.selected.updated = new Date();
            usersFactory.set(user.id, $scope.user.selected);
            $scope.user = $scope.user.selected;
        };

        // Deletes user
        $scope.deleteUser = function (user) {
            var userIds = usersFactory.get('userIds');
            
            // Deletes user ID from userIDs array
            userIds.splice(userIds.indexOf(user.id), 1);
            usersFactory.set('userIds', userIds);
            
            // Deletes user object from local storage
            usersFactory.remove(user.id);
            
            // Redirects to user list page
            $location.path('/user');
        };
    }])
    .directive('myTokens', function ($routeParams, uuid4, usersFactory) {
        'use strict';

        return {
            restrict: 'E',
            controller: function ($scope) {
                
                // Adds a random, unique token to the user
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

                // Deletes the token at that index
                $scope.deleteToken = function (index) {
                    $scope.tokens.splice(index, 1);
                    $scope.user.tokens = $scope.tokens;
                    usersFactory.set($routeParams.id, $scope.user);
                };
            },
            templateUrl: 'user-detail/my-tokens.html'
        };
    });
