var app = angular.module('coeplimApp.compradoresCtrl', []);

	app.controller('compradoresCtrl', ['$scope', '$routeParams','Compradores','Session', function ($scope,$routeParams,Compradores,Session) {

		$scope.setActive('mCompradores','');

		var pag = 1;
		//console.log(pag);
		$scope.buscar;
		$scope.compradores = {};





		$scope.moverA = function(pag){
			Compradores.cargarPagina(pag).then(function(){
			$scope.compradores = Compradores;
			//console.log($scope.compradores);
			});
		}
		$scope.moverA(pag);

	
	}]);
