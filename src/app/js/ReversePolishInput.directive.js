'use strict';

var REVERSE_POLISH_CHARACTERS = /^[0-9+* \-\/]*$/

angular.module('reversePolishCalculator')
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
