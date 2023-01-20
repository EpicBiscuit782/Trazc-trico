var app = angular.module('coeplimApp.pccCtrl', []);

	app.controller('pccCtrl', ['$scope', '$routeParams','pcc', function ($scope,$routeParams,pcc) {

		$scope.setActive('mInsumos','');

		var pag = 1;

		$scope.pcc = {};



		$scope.moverA = function(pag){
			pcc.cargarPagina(pag).then(function(){
			$scope.pcc = pcc;
			//console.log($scope.insumos);
			});
		}
		$scope.moverA(pag);




	}]);