var app = angular.module('coeplimApp.detalle_compraCtrl', []);

	app.controller('detalle_compraCtrl', ['$scope','$http', '$routeParams', 'Insumos',  function($scope,$http,$routeParams,Insumos){


		var id = $routeParams.id;

		$scope.detalle = [];
		$scope.total = 0;

		if(! isNaN(id) ){
		//manejo
  		Insumos.buscarCompra(id).then(function(){
  			$scope.detalle = Insumos.detalle;
        //console.log($scope.detalle[0]);

        for (var i = 0; i < $scope.detalle.length; i++) {
          $scope.total += $scope.detalle[i].precio * $scope.detalle[i].cant_insumos;
        }

				if ($scope.detalle == undefined || Insumos.detalle.length == 0) {
					window.location = '#/compras';
					return;
				}

  		});

		}
		else{
			window.location = '#/compras';
			return;
		}





	}]);
