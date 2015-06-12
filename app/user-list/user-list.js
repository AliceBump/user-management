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
            
        $scope.$watchCollection('userIds', function () {
            usersFactory.set('userIds', $scope.userIds);
            $scope.users = usersFactory.getAll();
        });
        
        $scope.displayedUsers = [].concat($scope.users);
        
        $scope.uniqueUsername = function (value, index) {
            var idx;

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
                $scope.addUser = function () {
                    var newId = uuid4.generate(),
                        newUser = { id: newId,
                                   username: $scope.username,
                                   password: $scope.password,
                                   created: (new Date()),
                                   updated: (new Date()) };

                    usersFactory.set(newId, newUser);

                    $scope.userIds.push(newId);
                    
                    $scope.username = '';
                    $scope.password = '';
                    $scope.userForm.$setPristine();
                };
            },
            templateUrl: 'user-list/my-add-user.html'
        };
    });