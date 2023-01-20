var app = angular.module('coeplimApp.huertosCtrl', []);

	app.controller('huertosCtrl', ['$scope', '$routeParams','Huerto', function ($scope,$routeParams,Huerto) {

		//$scope.setActive('mHuerto','');

		var pag = 1;

		$scope.huertos = {};



		$scope.moverA = function(pag){
			Huerto.cargarPagina(pag).then(function(){
			$scope.huertos = Huerto;
			//console.log($scope.huertos);
			});
		}
		$scope.moverA(pag);


	}]);
