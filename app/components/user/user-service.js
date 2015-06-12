angular.module('userMgmtApp.usersFactory', [])
    .factory('usersFactory', function (localStorageService) {
        'use strict';
    
        return {
            // Adds a value to local storage
            set: function (key, value) {
                localStorageService.set(key, value);
                return this.getAll();
            },
            
            // Gets a value from local storage
            get: function (key) {
                return localStorageService.get(key);
            },
            
            // Gets all users from local storage
            getAll: function () {
                var i,
                    user,
                    users = [],
                    userIds = localStorageService.get('userIds') || [];
                
                for (i = 0; i < userIds.length; i = i + 1) {
                    user = localStorageService.get(userIds[i]);
                    users.push(user);
                }
                return users;
            },
            
            // Removes user from local storage
            remove: function (userId) {
                localStorageService.remove(userId);
            }
        };
    });