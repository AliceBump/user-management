angular.module('userMgmtApp.user-list', ['ngRoute'])
    .controller('UserListCtrl', [ '$scope', 'uuid4', 'userFactory', 'userService', function ($scope, uuid4, userFactory, userService) {
        'use strict';
        
        var ULC = this;
        
        ULC.itemsByPage = 5;
    
        ULC.users = userFactory.getAll();
        ULC.displayedUsers = [].concat(ULC.users);
        
        // Adds a new user to local storage
        ULC.addUser = function () {
            var newId = uuid4.generate(),
                newUser = { id: newId,
                           username: ULC.username, password: ULC.password,
                           created: (new Date()), updated: (new Date()),
                           tokens: [] };

            // Save to local storage
            userFactory.addUser(newUser);

            // Get all users into scope
            ULC.users = userFactory.getAll();
            
            // Reset the form
            ULC.username = '';
            ULC.password = '';
            $scope.userForm.$setPristine();
        };
        
        // Checks to see if username is unique
        ULC.uniqueUsername = function (newUsername) {
            if (newUsername) {
                return userService.uniqueUsername(newUsername, null);
            }
            
            return true;
        };
    }]);