var app = angular.module('coeplimApp.analisis_aguasCtrl', []);

	app.controller('analisis_aguasCtrl', ['$scope', '$routeParams','Agua', function ($scope,$routeParams,Agua) {

		$scope.setActive('mAnalisis_agua','');

		var pag = 1;
		$scope.buscar;
		$scope.analisis_agua = {};



		$scope.moverA = function(pag){
			Agua.cargarPagina(pag).then(function(){
			$scope.analisis_agua = Agua;
			//console.log($scope.analisis_agua);
			});
		}
		$scope.moverA(pag);


	}]);
