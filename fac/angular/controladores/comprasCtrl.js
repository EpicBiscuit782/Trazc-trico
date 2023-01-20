var app = angular.module('coeplimApp.comprasCtrl', []);

	app.controller('comprasCtrl', ['$scope', '$routeParams','Insumos', function ($scope,$routeParams,Insumos) {


		var pag = 1;
		//console.log(pag);
		$scope.buscar;
		$scope.compras = {};


		$scope.moverA = function(pag){
			Insumos.allCompras(pag).then(function(){
			$scope.compras = Insumos;
			//console.log($scope.compras);
			});
		}
		$scope.moverA(pag);


	}]);
