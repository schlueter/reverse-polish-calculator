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

        function castTokens(stack) {
            return stack.map(function (element) {
                return element in OPERATIONS ? OPERATIONS[element] : Number(element);
            });
        }

        function countType(array, typeString) {
            return array.filter(function (a) { return typeof a === typeString; }).length;
        }

        function simpleOperation(operand1, operand2, operator) {
            return operator(operand1, operand2);
        }

        function calculate(input) {

            var tokens = castTokens(input.split(' ')),
                numeralCount = countType(tokens, 'number'),
                operatorCount = countType(tokens, 'function'),
                result;

            /**
             * Ensure there are the correct number of operators
             * compared to operands for the input to be valid;
             * otherwise return undefined
             */
            if (numeralCount !== operatorCount + 1) {
                return;
            }

            /**
             * Ensure the first two tokens are numbers and
             * the third is a function. It will have already been checked
             * to ensure it is a valid operator by the castTokens call.
             */
            if (!(typeof tokens[0] === 'number' &&
                  typeof tokens[1] === 'number' &&
                  typeof tokens[2] === 'function')) {
                return;
            }

            return simpleOperation(tokens[0], tokens[1], tokens[2]);
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
