angular.module('userMgmtApp.user-list', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        'use strict';

        $routeProvider.when('/users', {
            templateUrl: 'user-list/user-list.html',
            controller: 'UserListCtrl'
        });
    }])
    .controller('UserListCtrl', [ '$scope', 'uuid4', 'usersFactory', function ($scope, uuid4, usersFactory) {
        'use strict';
        
        $scope.itemsByPage = 5;
        
        $scope.userIds = usersFactory.get('userIds') || [];
        $scope.users = usersFactory.getAll() || [];
            
        // Watch the array of userIDs, updates the list of users in the scope
        $scope.$watchCollection('userIds', function () {
            usersFactory.set('userIds', $scope.userIds);
            $scope.users = usersFactory.getAll();
        });
        
        $scope.displayedUsers = [].concat($scope.users);
        
        // Checks to see if username is unique
        $scope.uniqueUsername = function (value, index) {
            var idx;

            // If editing an user, the original 
            if (index > -1 && (!value || value === $scope.users[index].username)) {
                return true;
            }

            for (idx = 0; idx < $scope.users.length; idx = idx + 1) {
                if ($scope.users[idx].username === value) {
                    return false;
                }
            }

            return true;
        };
    }])
    .directive('stRatio', function () {
        'use strict';
    
        return {
            link: function (scope, element, attr) {
                var ratio =+ (attr.stRatio);

                element.css('width', ratio + '%');
            }
        };
    })
    .directive('myAddUser', function (uuid4, usersFactory) {
        'use strict';

        return {
            restrict: 'E',
            controller: function ($scope) {
                
                // Adds a new user to local storage
                $scope.addUser = function () {
                    var newId = uuid4.generate(),
                        newUser = { id: newId,
                                   username: $scope.username,
                                   password: $scope.password,
                                   created: (new Date()),
                                   updated: (new Date()) };
                    
                    // Save to local storage
                    usersFactory.set(newId, newUser);

                    // Add new user ID to the array
                    $scope.userIds.push(newId);
                    
                    // Reset the form
                    $scope.username = '';
                    $scope.password = '';
                    $scope.userForm.$setPristine();
                };
            },
            templateUrl: 'user-list/my-add-user.html'
        };
    });