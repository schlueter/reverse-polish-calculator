'use strict';

angular.module('reversePolish')
    .directive('reversePolishOutput', function () {
        function link(scope, element) {

            function getResult() {
                return scope.result;
            }

            function setElementText() {
                element.text(scope.result);
            }

            function watchEntry() {
                scope.$watch(getResult, setElementText);
            }

            watchEntry();
        }
        return {
            restrict: 'A',
            link: link
        };
    })
