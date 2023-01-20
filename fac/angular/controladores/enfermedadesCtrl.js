var app = angular.module('coeplimApp.enfermedadesCtrl', []);

	app.controller('enfermedadesCtrl', ['$scope', '$routeParams','Enfermedad', function ($scope,$routeParams,Enfermedad) {

		$scope.setActive('mEnfermedad','');

		var pag = $routeParams.pag;
		if (pag == undefined) {pag = 1;}
		$scope.buscar;
		$scope.enfermedades = {};



		$scope.moverA = function(pag){
			Enfermedad.cargarPagina(pag).then(function(){
			$scope.enfermedades = Enfermedad;
			//console.log($scope.enfermedades);
			});
		}
		$scope.moverA(pag);



	}]);
