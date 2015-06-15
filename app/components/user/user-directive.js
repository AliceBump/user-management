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
            template: '<button class="btn btn-default btn-xs">Back</button>',
            link: function (scope, element, attrs) {
                element.on('click', function () {
                    history.back();
                    scope.$apply();
                });
            }
        };
    });