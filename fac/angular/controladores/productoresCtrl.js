 var app = angular.module('coeplimApp.productoresCtrl', []);

	app.controller('productoresCtrl', ['$scope','Productores','$routeParams', function ($scope,Productores,$routeParams) {

		$scope.setActive('mProductores','');
		var pag = 1;

		$scope.productores = {};
		$scope.productoresSel = {};


		$scope.moverA = function(pag){
      //console.log(pag);
			Productores.cargarPagina(pag).then(function(){
			$scope.productores = Productores;

			//console.log($scope.productores);
			});
		}
		$scope.moverA(pag);


		/*
			Mostrar modal del cliente
		*/

		$scope.mostrarModal = function(productores){

			angular.copy(productores, $scope.productoresSel);
		}


		/*
			guardar cliente
		*/

		$scope.guardar = function( productores, frmProductores){

			Productores.guardar( productores ).then( function(){



				$scope.productoresSel = {};

				//frmProductores.autoValidateFormOptions.resetForm();
			});
		}

	}]);
