angular.module('userMgmtApp.userDirective', [])
    .directive('stRatio', function () {
        'use strict';

        return {
            link: function (scope, element, attr) {
                var ratio =+ (attr.stRatio);

                element.css('width', ratio + '%');
            }
        };
    });