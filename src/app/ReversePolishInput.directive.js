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
                 * functions.
                 */
                return (NaNCount === operatorCount &&
                        /**
                         * Numeral count should be equal to the number of operators
                         * plus one so that there is an operator to operate on each
                         * pair of numbers or to combine those simple operations.
                         */
                        numeralCount === operatorCount + 1);
            }

            return validateTokens(tokens) ? tokens : undefined;

        }

        function countType(array, typeString) {
            return array.filter(function (e) { return typeof e === typeString; }).length;
        }

        function simpleOperation(operand1, operand2, operator) {
            return operator(operand1, operand2);
        }

        function calculate(tokens) {

        }

        function setResult(input) {

            var tokens = castTokens(input);

            if (tokens === undefined) {
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

                // setResult result and apply to scope
                scope.result = setResult(viewValue);
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
