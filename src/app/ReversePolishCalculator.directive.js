'use strict';

angular.module('reversePolishCalculator')
    .directive('reversePolishCalculator', function () {
        function link(scope) {

            function calculate(input) {
                return input;
            }

            function getEntry() {
                return scope.entry;
            }

            function setResult() {
                scope.result = calculate(scope.entry);
            }

            function watchEntry() {
                scope.$watch(getEntry, setResult);
            }

            watchEntry();
        }
        return {
            restrict: 'E',
            link: link,
            templateUrl: 'partials/calculator.html'
        };
    })