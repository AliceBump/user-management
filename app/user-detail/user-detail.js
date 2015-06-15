angular.module('userMgmtApp.user-detail', ['ngRoute'])
    .controller('UserDetailCtrl', ['$scope', '$location', '$routeParams', 'userFactory', 'userService', function ($scope, $location, $routeParams, userFactory, userService) {
        'use strict';
        
        var UDC = this;
        UDC.updating = false;
        
        UDC.user = userFactory.get($routeParams.id);

        // Makes a copy of the user when Edit button is clicked
        UDC.editUser = function () {
            UDC.selectedUser = angular.copy(UDC.user);
            
            UDC.updating = true;
        };

        // Saves updated user when Save button is clicked
        UDC.updateUser = function () {
            // Set the updated time
            UDC.selectedUser.updated = new Date();
            
            // Save updated user into local storage
            userFactory.set(UDC.user.id, UDC.selectedUser);
            
            UDC.user = UDC.selectedUser;
            
            UDC.updating = false;
        };

        // Deletes user
        UDC.deleteUser = function () {            
            // Remove ID from list of UserIds
            userFactory.removeId(UDC.user.id);
            
            // Deletes user object from local storage
            userFactory.remove(UDC.user.id);
            
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
