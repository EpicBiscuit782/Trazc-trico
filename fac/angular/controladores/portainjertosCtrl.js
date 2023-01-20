var app = angular.module('coeplimApp.portainjertosCtrl', []);

	app.controller('portainjertosCtrl', ['$scope', '$routeParams','Portainjerto', function ($scope,$routeParams,Portainjerto) {

		$scope.setActive('mPortainjetos','');

		var pag = 1;
		$scope.buscar;

		$scope.portainjertos = {};

		$scope.moverA = function(pag){
			Portainjerto.cargarPagina(pag).then(function(){
			$scope.portainjertos = Portainjerto;
			//console.log($scope.portainjertos);
			});
		}
		$scope.moverA(pag);


	}]);
