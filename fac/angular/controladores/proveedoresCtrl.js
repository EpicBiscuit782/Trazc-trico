var app = angular.module('coeplimApp.proveedoresCtrl', []);

	app.controller('proveedoresCtrl', ['$scope', '$routeParams','Proveedores','Session', function ($scope,$routeParams,Proveedores,Session) {



		var pag = 1;
		$scope.isUser;
		$scope.proveedores = {};



			$scope.moverA = function(pag){
				Proveedores.cargarPagina(pag).then(function(){
				$scope.proveedores = Proveedores;
				//console.log($scope.proveedores);
				});
			}
			$scope.moverA(pag);



	}]);
