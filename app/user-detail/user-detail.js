angular.module('userMgmtApp.user-detail', ['ngRoute'])
    .controller('UserDetailCtrl', ['$scope', '$location', '$routeParams', 'userFactory', 'userService', function ($scope, $location, $routeParams, userFactory, userService) {
        'use strict';
        
        var UDC = this;
        
        UDC.user = userFactory.get($routeParams.id);

        // Watch the user object for any changes
//        $scope.$watch(UDC.user, function () {
//            userFactory.set($routeParams.id, UDC.user);
//        });
        
        // Watch the user object for any changes
//        $scope.$watch(function () {
//            return this.user;
//        }, function (newVal, oldVal) {
//            userFactory.set($routeParams.id, newVal);
//        });
        
        // Makes a copy of the user when Edit button is clicked
        UDC.editUser = function (user) {
            UDC.selectedUser = angular.copy(user);
        };

        // Saves updated user when Save button is clicked
        UDC.updateUser = function (user) {
            UDC.selectedUser.updated = new Date();
            userFactory.set(user.id, UDC.selectedUser);
            UDC.user = UDC.selectedUser;
        };

        // Deletes user
        UDC.deleteUser = function (user) {
            var userIds = userFactory.get('userIds');
            
            // Deletes user ID from userIDs array
            userIds.splice(userIds.indexOf(user.id), 1);
            userFactory.set('userIds', userIds);
            
            // Deletes user object from local storage
            userFactory.remove(user.id);
            
            // Redirects to user list page
            $location.path('/user');
        };
        
        // Checks to see if username is unique
        UDC.uniqueUsername = function (value, newUser) {
            return userService.uniqueUsername(value, UDC.user.username);
        };
    }])
    .directive('myTokens', function ($routeParams, uuid4, userFactory) {
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
                    userFactory.set($routeParams.id, $scope.user);

                    $scope.tokens = userFactory.get($routeParams.id).tokens;
                };

                // Deletes the token at that index
                $scope.deleteToken = function (index) {
                    $scope.tokens.splice(index, 1);
                    $scope.user.tokens = $scope.tokens;
                    userFactory.set($routeParams.id, $scope.user);
                };
            },
            templateUrl: 'user-detail/my-tokens.html'
        };
    });
