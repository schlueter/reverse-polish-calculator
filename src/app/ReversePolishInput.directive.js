'use strict';

var NUMERALS = /^[\d]*$/,
    OPERATORS = /^[+*\-\/]*$/,
    // This dirctive uses explicit operation functions to avoid using eval
    OPERATIONS = {
        '+': function(operand1, operand2) { return operand1 + operand2 },
        '-': function(operand1, operand2) { return operand1 - operand2 },
        '*': function(operand1, operand2) { return operand1 * operand2 },
        '/': function(operand1, operand2) { return operand1 / operand2 }
    };

angular.module('reversePolish')
    .directive('reversePolishInput', function() {

        function simpleOperation(operand1, operand2, operator) {
            if (NUMERALS.test(operand1) &&
                NUMERALS.test(operand2) &&
                OPERATORS.test(operator)) {

                operand1 = Number(operand1);
                operand2 = Number(operand2);
                operator = OPERATIONS[operator];
            } else {
                return;
            }

            return operator(operand1, operand2);
        }

        function countRegexMatches(regex, array) {
            return array.filter(function (element) {
                return regex.test(element);
            }).length;
        }

        function calculate(value) {

            var tokens = value.split(' '),
                numeralCount = countRegexMatches(NUMERALS, tokens),
                operatorCount = countRegexMatches(OPERATORS, tokens),
                result;

            /**
             * Ensure the first two tokens are numerals and that
             * there are the correct number of operators
             * compared to operands for the input to be valid;
             * otherwise return undefined
             */
            if (!(NUMERALS.test(tokens[0]) &&
                  NUMERALS.test(tokens[1]) &&
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
