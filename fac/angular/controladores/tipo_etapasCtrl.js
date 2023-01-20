var app = angular.module('coeplimApp.tipo_etapasCtrl', []);

	app.controller('tipo_etapasCtrl', ['$scope', '$routeParams','TipoEtapa', function ($scope,$routeParams,TipoEtapa) {

		$scope.setActive('mTipo_Etapa','');

		var pag = 1;

		$scope.tipo_etapa = {};



		$scope.moverA = function(pag){
			TipoEtapa.cargarPagina(pag).then(function(){
			$scope.tipo_etapas = TipoEtapa;
			//console.log($scope.tipo_etapas);
			});
		}
		$scope.moverA(pag);


	}]);