var app = angular.module('coeplimApp.nutricionsCtrl', []);

	app.controller('nutricionsCtrl', ['$scope', '$routeParams','Nutricion', function ($scope,$routeParams,Nutricion) {

		//$scope.setActive('mNutricions','');

		var pag = 1;
		$scope.buscar;
		$scope.nutricions = {};



		$scope.moverA = function(pag){
			Nutricion.cargarPagina(pag).then(function(){
			$scope.nutricions = Nutricion;
			//console.log($scope.nutricions.nutricions);
			});
		}
		$scope.moverA(pag);


	}]);
