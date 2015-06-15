angular.module('userMgmtApp.userDirective', [])
    .directive('stRatio', function () {
        'use strict';

        return {
            link: function (scope, element, attr) {
                var ratio =+ (attr.stRatio);

                element.css('width', ratio + '%');
            }
        };
    })
    .directive('backButton', function () {
        'use strict';

        return {
            restrict: 'E',
            template: '<button class="btn btn-default btn-sm">Back</button>',
            link: function (scope, element, attrs) {
                element.on('click', function () {
                    history.back();
                    scope.$apply();
                });
            }
        };
    })
    .directive('myTokens', function ($routeParams, uuid4, userFactory) {
        'use strict';

        return {
            restrict: 'E',
            controller: function ($scope) {
                var user = userFactory.get($routeParams.id);
                $scope.tokens = userFactory.get($routeParams.id).tokens;
                
                // Adds a random, unique token to the user
                $scope.addToken = function () {
                    var newValue = uuid4.generate(),
                        numToken;

                    numToken = user.tokens.length;

                    user.tokens[numToken] = newValue;
                    userFactory.set($routeParams.id, user);

                    $scope.tokens = userFactory.get($routeParams.id).tokens;
                };

                // Deletes the token at that index
                $scope.deleteToken = function (index) {
                    $scope.tokens.splice(index, 1);
                    user.tokens = $scope.tokens;
                    userFactory.set($routeParams.id, user);
                };
            },
            templateUrl: 'components/user/my-tokens.html'
        };
    });