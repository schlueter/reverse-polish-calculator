describe('reversePolishCtrl', function(){
    var scope;

    beforeEach(function() {
        module('reversePolish');

        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            $controller('reversePolishCtrl', {
                $scope: scope
            })
        })
    });

    it('Should initialize entry and result each to \'\' in the scope', function() {
        expect(scope.entry).toBe('');
        expect(scope.result).toBe('');
    });

});
