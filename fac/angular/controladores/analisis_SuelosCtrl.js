var app = angular.module('coeplimApp.analisis_suelosCtrl', []);

	app.controller('analisis_suelosCtrl', ['$scope', '$routeParams','Analisis_Suelo', function ($scope,$routeParams,Analisis_Suelo) {

		$scope.setActive('mSuelo','');

		var pag = 1;
		$scope.buscar;
		$scope.analisis_suelos = {};

		//console.log("hola");

		$scope.moverA = function(pag){
			Analisis_Suelo.cargarPagina(pag).then(function(){
			$scope.analisis_suelos = Analisis_Suelo;
			//console.log($scope.analisis_suelos.analisis_suelo);
			});
		}
		$scope.moverA(pag);


	}]);
