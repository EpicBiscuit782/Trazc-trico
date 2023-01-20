var app = angular.module('coeplimApp.responsablesCtrl', []);

	app.controller('responsablesCtrl', ['$scope', '$routeParams','Responsable', function ($scope,$routeParams,Responsable) {

		$scope.setActive('mResponsables','');

		var pag = 1;

		$scope.responsables = {};


		$scope.moverA = function(pag){
			Responsable.cargarPagina(pag).then(function(){
			$scope.responsables = Responsable;
			//console.log($scope.responsables);
			});
		}
		$scope.moverA(pag);


	}]);
