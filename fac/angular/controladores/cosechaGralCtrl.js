var app = angular.module('coeplimApp.cosechaGralCtrl', []);

	app.controller('cosechaGralCtrl', ['$scope', '$routeParams','Cosecha', function ($scope,$routeParams,Cosecha) {

		$scope.setActive('mCosecha','');

		var pag = 1;
		$scope.buscar;
		$scope.cosechas = {};


		$scope.moverA = function(pag){
			Cosecha.general(pag).then(function(){
			$scope.cosechas = Cosecha;
			//console.log($scope.cosechas);
			});
		}
		$scope.moverA(pag);

		//console.log("hola");
	}]);
