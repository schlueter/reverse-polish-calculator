'use strict';

angular.module('reversePolish')
    .directive('reversePolishCalculator', function () {
        return {
            restrict: 'E',
            templateUrl: 'partials/ReversePolishCalculator.html'
        };
    })
