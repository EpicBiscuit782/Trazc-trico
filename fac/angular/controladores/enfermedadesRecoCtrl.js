var app = angular.module('coeplimApp.enfermedadesRecoCtrl', []);

	app.controller('enfermedadesRecoCtrl', ['$scope', '$routeParams','Enfermedad', function ($scope,$routeParams,Enfermedad) {

		$scope.setActive('mEnfermedad','');

		var pag = $routeParams.pag;
		if (pag == undefined) {pag = 1;}
		$scope.buscar;
		$scope.enfermedades = {};



		$scope.moverA = function(pag){
			Enfermedad.cargarPagina(pag).then(function(){
			$scope.enfermedades = Enfermedad;
			});
		}
		$scope.moverA(pag);



	}]);