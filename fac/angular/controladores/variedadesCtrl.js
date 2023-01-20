var app = angular.module('coeplimApp.variedadesCtrl', []);

	app.controller('variedadesCtrl', ['$scope', '$routeParams','Variedad', function ($scope,$routeParams,Variedad) {

		$scope.setActive('mvariedades','');

		var pag = 1;
		$scope.buscar;
		$scope.variedades = {};



		$scope.moverA = function(pag){
			Variedad.cargarPagina(pag).then(function(){
			$scope.variedades = Variedad;
			//console.log($scope.variedades);
			});
		}
		$scope.moverA(pag);



	}]);
