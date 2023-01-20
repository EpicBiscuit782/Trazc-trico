var app = angular.module('coeplimApp.regimensCtrl', []);

	app.controller('regimensCtrl', ['$scope', '$routeParams','Propiedades', function ($scope,$routeParams,Propiedades) {

		$scope.setActive('mCompradores','');

		var pag = 1;

		$scope.propiedades = {};



		$scope.moverA = function(pag){
			Propiedades.cargarPagina(pag).then(function(){
			$scope.propiedades = Propiedades;
			//console.log($scope.propiedades.propiedades);
			});
		}
		$scope.moverA(pag);


	}]);
