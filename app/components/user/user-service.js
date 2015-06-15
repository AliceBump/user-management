angular.module('userMgmtApp.userService', [])
    .service('userService', function (userFactory) {
        'use strict';
    
        this.uniqueUsername = function (value, username) {
            var users = userFactory.getAll(),
                idx;

            // If editing an user, the original value is OK
            if (username !== 1  && (!value || value === username)) {
                return true;
            }
    
            for (idx = 0; idx < users.length; idx = idx + 1) {
                if (users[idx].username === value) {
                    return false;
                }
            }
            
            return true;
        };
    }
            );