angular.module('userMgmtApp.userService', [])
    .service('userService', function (userFactory) {
        'use strict';
    
        this.uniqueUsername = function (value, index) {
            var users = userFactory.getAll(),
                idx;

            // If editing an user, the original value is OK
            if (index > -1  && (!value || value === users[index].username)) {
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