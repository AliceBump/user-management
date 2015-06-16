angular.module('userMgmtApp.userService', [])
    .service('userService', function (userFactory) {
        'use strict';
    
        // Checks that username is unique
        this.uniqueUsername = function (newUsername, oldUsername) {
            var users = userFactory.getAll(),
                idx;

            // If editing an user, the original value is OK
            if (oldUsername !== null  && (!newUsername || newUsername === oldUsername)) {
                return true;
            }
    
            // Compare with all usernames to uniqueness
            for (idx = 0; idx < users.length; idx = idx + 1) {
                if (users[idx].username === newUsername) {
                    return false;
                }
            }
            
            // Did not match any existing unique, return true
            return true;
        };
    }
            );