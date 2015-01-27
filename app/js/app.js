'use strict';

var REVERSE_POLISH_CHARACTERS = /^[0-9+* \-\/]*$/

angular.module('reversePolishCalculator', [])
    .controller('reversePolishCalculatorCtrl', function($scope) {
        $scope.entry = '';
        $scope.result = 'result';
    })
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
    .directive('reversePolishInput', function() {
        function link(scope, elm, attrs, ctrl) {
            ctrl.$validators.reversePolish = function(modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                  // consider empty models to be valid
                  return true;
                }

                if (REVERSE_POLISH_CHARACTERS.test(viewValue)) {
                  // it is valid
                  return true;
                }

                // it is invalid
                return false;
            };
        }
        return {
            require: 'ngModel',
            link: link
        };
    });
