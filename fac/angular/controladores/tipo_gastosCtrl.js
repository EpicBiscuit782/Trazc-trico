var app = angular.module('coeplimApp.tipo_gastosCtrl', []);

	app.controller('tipo_gastosCtrl', ['$scope', '$routeParams','TipoGasto', function ($scope,$routeParams,TipoGasto) {

		$scope.setActive('mTipo_Gasto','');

		var pag = 1;

		$scope.tipo_gasto = {};



		$scope.moverA = function(pag){
			TipoGasto.cargarPagina(pag).then(function(){
			$scope.tipo_gastos = TipoGasto;
			//console.log($scope.tipo_gastos);
			});
		}
		$scope.moverA(pag);


	}]);
