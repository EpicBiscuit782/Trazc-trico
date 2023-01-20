var app = angular.module('coeplimApp.analisis_foliaresCtrl', []);

	app.controller('analisis_foliaresCtrl', ['$scope', '$routeParams','Analisis_Foliar', function ($scope,$routeParams,Analisis_Foliar) {

		$scope.setActive('mAnalisis_foliar','');

		var pag = 1;
		$scope.buscar;
		$scope.analisis_foliar = {};


		$scope.moverA = function(pag){
			Analisis_Foliar.cargarPagina(pag).then(function(){
			$scope.analisis_foliar = Analisis_Foliar;
			//console.log($scope.analisis_foliar.analisis_foliar);
			});
		}
		$scope.moverA(pag);


	}]);
