var app = angular.module('coeplimApp.tipo_insumosCtrl', []);

	app.controller('tipo_insumosCtrl', ['$scope', '$routeParams','TipoInsumo', function ($scope,$routeParams,TipoInsumo) {

		$scope.setActive('mTipo_Gasto','');

		var pag = 1;

		$scope.tipo_insumos = {};



		$scope.moverA = function(pag){
			TipoInsumo.cargarPagina(pag).then(function(){
			$scope.tipo_insumos = TipoInsumo;
			//console.log($scope.tipo_insumos.tipo_insumos.id_tipo_insumo);
			});
		}
		$scope.moverA(pag);


	}]);
