var app = angular.module('coeplimApp.controlesCtrl', []);

	app.controller('controlesCtrl', ['$scope', '$routeParams','Control', function ($scope,$routeParams,Control) {

		$scope.setActive('mControles','');

		var pag = 1;
		//var pag = 1;
		$scope.buscar;
		$scope.controles = {};



		$scope.moverA = function(pag){
			Control.cargarPagina(pag).then(function(){
			$scope.controles = Control;
			//console.log($scope.controles.controles);
			});
		}
		$scope.moverA(pag);


	}]);
