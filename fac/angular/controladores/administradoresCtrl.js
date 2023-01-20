var app = angular.module('coeplimApp.administradoresCtrl', []);

	app.controller('administradoresCtrl', ['$scope', '$routeParams','Admin', function ($scope,$routeParams,Admin) {


		var pag = 1;
		//console.log(pag);
		$scope.buscar;
		$scope.administradores = {};

    //console.log("admin");


		$scope.moverA = function(pag){
			Admin.cargarPagina(pag).then(function(){
			$scope.administradores = Admin;
			//console.log($scope.administradores);
			});
		}
		$scope.moverA(pag);


	}]);
