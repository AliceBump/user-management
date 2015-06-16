angular.module('userMgmtApp.user-detail', ['ngRoute'])
    .controller('UserDetailCtrl', ['$scope', '$location', '$routeParams', 'userFactory', 'userService', function ($scope, $location, $routeParams, userFactory, userService) {
        'use strict';
        
        var UDC = this;
        UDC.updating = false;
        UDC.user = userFactory.getUser($routeParams.id);

        // Makes a copy of the user when Edit button is clicked
        UDC.editUser = function () {
            UDC.selectedUser = angular.copy(UDC.user);
            UDC.updating = true;
        };

        // Saves updated user when Save button is clicked
        UDC.updateUser = function () {
            UDC.selectedUser.updated = new Date();
            
            // Save updated user into local storage
            userFactory.updateUser(UDC.selectedUser);
            
            UDC.user = UDC.selectedUser;
            UDC.updating = false;
        };

        // Deletes user
        UDC.deleteUser = function () {
            // Deletes user object from local storage
            userFactory.deleteUser(UDC.user.id);
            
            // Redirects to user list page
            $location.path('/user');
        };
        
        // Checks to see if username is unique
        UDC.uniqueUsername = function (newUsername) {
            if (newUsername) {
                return userService.uniqueUsername(newUsername, UDC.user.username);
            }
            
            return true;
        };
    }]);
