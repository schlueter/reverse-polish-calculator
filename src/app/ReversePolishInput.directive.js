'use strict';

var REVERSE_POLISH_CHARACTERS = /^[0-9+* \-\/]*$/,
    NUMERALS = /^[0-9]*$/,
    OPERATORS = /^[+* \-\/]*$/;


angular.module('reversePolishCalculator')
    .directive('reversePolishInput', function() {
        function parsable(value) {
            function countRegexMatches(regex) {
                return function(count, nextValue) {
                    return count + (regex.test(nextValue) ? 1 : 0);
                }
            }

            var tokens = value.split(' '),
                numeralCount = tokens.reduce(countRegexMatches(NUMERALS), 0),
                operatorCount = tokens.reduce(countRegexMatches(OPERATORS), 0)

            return NUMERALS.test(tokens[0]) &&
                   NUMERALS.test(tokens[1]) &&
                   numeralCount === operatorCount + 1;
        }

        function link(scope, elm, attrs, ctrl) {
            ctrl.$validators.reversePolish = function(modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                  // consider empty models to be valid
                  return true;
                }

                if (REVERSE_POLISH_CHARACTERS.test(viewValue) && parsable(viewValue)) {
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
