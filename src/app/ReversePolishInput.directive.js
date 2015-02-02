'use strict';

var OPERATORS = /^[+*\-\/]*$/,

/**
 * This dirctive uses explicit operation functions to avoid having to use eval, which
 * would be dangerous, if the any of the calculation functions were made to bypass
 * checking for valid operands and operators. Better safe than sorry.
 */
OPERATIONS = {
    '+': function(operand1, operand2) { return operand1 + operand2; },
    '-': function(operand1, operand2) { return operand1 - operand2; },
    '*': function(operand1, operand2) { return operand1 * operand2; },
    '/': function(operand1, operand2) { return operand1 / operand2; }
};

angular.module('reversePolish')
    .directive('reversePolishInput', function() {

        function simpleOperation(operand1, operand2, operator) {
            // Number(<string not parsable to number>) returns NaN, which evaluates to false
            operand1 = Number(operand1);
            operand2 = Number(operand2);
            //
            operator = OPERATIONS[operator];

            if (operand1 &&
                operand2 &&
                OPERATORS.test(operator)) {

                operand1 = Number(operand1);
                operand2 = Number(operand2);
            } else {
                return;
            }

            return operator(operand1, operand2);
        }

        function castNumbersAndOperationsInArray(stack) {
            return stack.map(function (element) {
                return isNaN(element) ? OPERATIONS[element] : Number(element);
            });
        }

        function doMaths(stack, pending) {

        }

        function countRegexMatches(regex, array) {
            return array.filter(function (element) {
                return regex.test(element);
            }).length;
        }

        function removeIfNotOfType(array, typeString) {
            return array.filter(function (a) { return typeof a === typeString; });
        }

        function calculate(input) {

            var tokens = castNumbersAndOperationsInArray(input.split(' ')),
                numeralCount = removeIfNotOfType(tokens, 'number').length,
                operatorCount = removeIfNotOfType(tokens, 'function').length,
                result;

            /**
             * Ensure the first two tokens are numerics and that
             * there are the correct number of operators
             * compared to operands for the input to be valid;
             * otherwise return undefined
             */
            if (!(!isNaN(tokens[0]) &&
                  !isNaN(tokens[1]) &&
                  numeralCount === operatorCount + 1)){
                return;
            }

            if (tokens && OPERATORS.test(tokens[2])) {
                result = simpleOperation(Number(tokens[0]), Number(tokens[1]), tokens[2]);
            }

            return result;
        }

        function link(scope, elm, attrs, ctrl) {

            ctrl.$validators.reversePolish = function(modelValue, viewValue) {

                if (ctrl.$isEmpty(modelValue)) {
                    // consider empty models to be valid
                    return true;
                }

                // Calculate result and apply to scope
                scope.result = calculate(viewValue);
                if (scope.result) {
                    // it is valid
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
