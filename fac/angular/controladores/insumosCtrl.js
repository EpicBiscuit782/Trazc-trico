var app = angular.module('coeplimApp.insumosCtrl', []);

	app.controller('insumosCtrl', ['$scope', '$routeParams','Insumos', function ($scope,$routeParams,Insumos) {

		$scope.setActive('mInsumos','');

		var pag = 1;

		$scope.insumos = {};



		$scope.moverA = function(pag){
			Insumos.cargarPagina(pag).then(function(){
			$scope.insumos = Insumos;
			//console.log($scope.insumos);
			});
		}
		$scope.moverA(pag);




	}]);
