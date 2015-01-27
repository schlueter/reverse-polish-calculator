'use strict';

angular.module('reverse-polish-calculator', [])
    .controller('main', function($scope) {
        $scope.result = 'result';
    })
    .directive('calculator', function () {
        function link() {

        }

        return {
            restrict: 'E',
            link: link,
            templateUrl: 'partials/calculator.html'
        };
    });
