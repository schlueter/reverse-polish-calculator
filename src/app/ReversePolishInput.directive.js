'use strict';

/**
 * This dirctive uses explicit operation functions to avoid having to use eval, which
 * would be dangerous, if the any of the calculation functions were made to bypass
 * checking for valid operands and operators. Better safe than sorry.
 */
var OPERATIONS = {
    '+': function(operand1, operand2) { return operand1 + operand2; },
    '-': function(operand1, operand2) { return operand1 - operand2; },
    '*': function(operand1, operand2) { return operand1 * operand2; },
    '/': function(operand1, operand2) { return operand1 / operand2; }
};

angular.module('reversePolish')
    .directive('reversePolishInput', function() {

        function castTokens(input) {

            // Split by spaces and remove empty strings
            var tokens = input.split(' ').filter(function (e) { return e !== ''; });

            tokens = tokens.map(function (element) {
                return element in OPERATIONS ? OPERATIONS[element] : Number(element);
            });

            function validateTokens(tokens) {
                var NaNCount = tokens.filter(function (e) { return isNaN(e); }).length,
                    operatorCount = countType(tokens, 'function'),
                    numeralCount = countType(tokens, 'number');

                /**
                 * NaNCount should equal operatorCount since operatorCount is a
                 * count of functions, which are NaN, and if there are more NaN
                 * than operators, there are additional NaN values besides
                 * functions. If there are fewer, the javascript implementation
                 * this is executing on probably has a bug.
                 */
                return (NaNCount === operatorCount &&
                        numeralCount === operatorCount + 1);
            }

            return validateTokens(tokens) ? tokens : undefined;

        }

        function countType(array, typeString) {
            return array.filter(function (e) { return typeof e === typeString; }).length;
        }

        function calculate(tokens) {
            var stack = [],
                token;

            while (tokens) {
                token = tokens.shift();

                if (typeof token === 'number') {
                    stack.push(token);
                } else if (stack.length >= 2) {
                    // All currently supported operations require exactly 2 operands
                    stack.push(token(stack.pop(), stack.pop()));
                } else {
                    return;
                }
                if (stack.length === 1 && tokens.length === 0) {
                    return stack.pop();
                }
                // Otherwise, undefined will be returned
            }
        }

        function getResult(input) {

            var tokens = castTokens(input);

            return calculate(tokens);
        }

        function link(scope, elm, attrs, ctrl) {

            ctrl.$validators.reversePolish = function(modelValue, viewValue) {

                if (ctrl.$isEmpty(modelValue)) {
                    // consider empty models to be valid
                    return true;
                }

                scope.result = getResult(viewValue);
                if (scope.result !== undefined) {
                    // it was able to be calculated
                    return true;
                }

                // it is invalid
                scope.result = '';
                return false;
            };
        }

        return {
            restrict: 'A',
            require: 'ngModel',
            link: link
        };
    });
