var app = angular.module('coeplimApp.terrenosCtrl', []);

	app.controller('terrenosCtrl', ['$scope', '$routeParams','Terrenos', function ($scope,$routeParams,Terrenos) {
		
		$scope.setActive('mTerrenos','');

		var pag = $routeParams.pag;
		$scope.buscar;
		$scope.terrenos = {};
		
		

		$scope.moverA = function(pag){
			Terrenos.cargarPagina(pag).then(function(){
			$scope.terrenos = Terrenos;
			console.log($scope.terrenos.terrenos);
			});
		}
		$scope.moverA(pag);


	}]);