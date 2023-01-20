var app = angular.module('coeplimApp.ctl_gastosCtrl', []);

	app.controller('ctl_gastosCtrl', ['$scope', '$routeParams','Ctl_gastos', function ($scope,$routeParams,Ctl_gastos) {

		$scope.setActive('mGastos','');

		var pag = 1;

		$scope.ctl_gastos = {};



		$scope.moverA = function(pag){
			Ctl_gastos.cargarPagina(pag).then(function(){
			$scope.ctl_gastos = Ctl_gastos;
			//console.log($scope.ctl_gastos.ctl_gastos);
			});
		}
		$scope.moverA(pag);


	}]);
