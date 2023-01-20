var app = angular.module('coeplimApp.parcelasCtrl', []);

	app.controller('parcelasCtrl', ['$scope', '$routeParams','Parcelas', function ($scope,$routeParams,Parcelas) {

		$scope.setActive('mParcelas','');

		var pag = 1;

		$scope.parcelas = {};



		$scope.moverA = function(pag){
			Parcelas.cargarPagina(pag).then(function(){
			$scope.parcelas = Parcelas;
			//console.log($scope.parcelas.parcelas[0]);
			});
		}
		$scope.moverA(pag);




	}]);
