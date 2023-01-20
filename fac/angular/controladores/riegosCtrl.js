var app = angular.module('coeplimApp.riegosCtrl', []);

	app.controller('riegosCtrl', ['$scope', '$routeParams','Riego', function ($scope,$routeParams,Riego) {

		//$scope.setActive('mRiego','');

		var pag = 1;
		//pag = 1;
		$scope.buscar;
		$scope.riegos = {};



		$scope.moverA = function(pag){
			Riego.cargarPagina(pag).then(function(){
			$scope.riegos = Riego;
			//console.log($scope.riegos);
			});
		}
		$scope.moverA(pag);



	}]);
