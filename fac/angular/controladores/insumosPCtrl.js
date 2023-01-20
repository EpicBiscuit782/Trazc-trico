var app = angular.module('coeplimApp.insumosPCtrl', []);

	app.controller('insumosPCtrl', ['$scope', '$routeParams','Insumos', function ($scope,$routeParams,Insumos) {

		//$scope.setActive('mInsumos','');

		var pag = 1;

		$scope.insumos = {};

        $scope.negativeValue=function(myValue){
          var num = parseInt(myValue);

          if(num < 50){
            var css = { 'color':'red' };
            return css;
          }
        }

		$scope.moverA = function(pag){
			Insumos.cargarPag(pag).then(function(){
			$scope.insumos = Insumos;
			//console.log($scope.insumos);
			});
		}
		$scope.moverA(pag);




	}]);
