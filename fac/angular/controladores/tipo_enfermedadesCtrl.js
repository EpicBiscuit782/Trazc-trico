var app = angular.module('coeplimApp.tipo_enfermedadesCtrl', []);

	app.controller('tipo_enfermedadesCtrl', ['$scope', '$routeParams','TipoEnfermedad', function ($scope,$routeParams,TipoEnfermedad) {

		$scope.setActive('mTipoEnfermedad','');

		var pag = 1;
		$scope.buscar;
		$scope.tipo_enfermedad = {};



		$scope.moverA = function(pag){
			TipoEnfermedad.cargarPagina(pag).then(function(){
			$scope.tipo_enfermedad = TipoEnfermedad;
			//console.log($scope.tipo_enfermedad.tipo_enfermedades);
			});
		}
		$scope.moverA(pag);



	}]);
