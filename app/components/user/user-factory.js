angular.module('userMgmtApp.userFactory', [])
    .factory('userFactory', function (localStorageService) {
        'use strict';
    
        var userIds = localStorageService.get('userIds') || [];
    
        return {
            // Saves a new user to local storage
            addUser: function (newUser) {
                userIds.push(newUser.id);
                localStorageService.set('userIds', userIds);
                localStorageService.set(newUser.id, newUser);
            },
            
            // Saves editted user to local storage
            updateUser: function (editedUser) {
                localStorageService.set(editedUser.id, editedUser);
            },
            
            // Gets a value from local storage
            getUser: function (userId) {
                return localStorageService.get(userId);
            },
            
            // Gets all users from local storage
            getAll: function () {
                var idx,
                    user,
                    users = [],
                    userIds = localStorageService.get('userIds') || [];
                
                for (idx = 0; idx < userIds.length; idx = idx + 1) {
                    user = localStorageService.get(userIds[idx]);
                    users.push(user);
                }
                
                return users;
            },
            
            // Removes user from local storage
            deleteUser: function (userId) {
                localStorageService.remove(userId);
            }
        };
    });