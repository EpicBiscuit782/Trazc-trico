var app = angular.module('coeplimApp.insumoCtrl', []);

	app.controller('insumoCtrl', ['$scope','$http', '$routeParams', 'Insumos', 'TipoInsumo', function($scope,$http,$routeParams,Insumos,TipoInsumo){

		var id = $routeParams.id;

		$scope.actualizado = false;
		$scope.insumo = {};
		//$scope.proveedores = {};
		$scope.tipo_insumo = {};

		$scope.creando = false;
		$scope.error = false;
		$scope.buscar = true;


		/*
		//	cargar cbo PROVEDORES
		//
		*/

		/*Proveedores.cbo_proveedor().then(function(){
			$scope.proveedores = Proveedores;
			console.log($scope.proveedores);
		});*/

		/*
		//	cargar cbo tipo insumo
		//
		*/

		TipoInsumo.all().then(function(){
			$scope.tipo_insumo = TipoInsumo;
			//console.log($scope.tipo_insumo.tipo_insumos);
		});




		if (id == 'new') {
			$scope.creando = true;
			$scope.insumo = {};
		}
		else{
			Insumos.buscar(id).then(function(){

				$scope.creando = true;
				$scope.buscar = false;
				$scope.insumo = Insumos.insumo;
				//console.log($scope.insumo);


				if ($scope.insumo == undefined || Insumos.insumo == '') {

					window.location = '#/insumos';
					return;
				}


			});
		}



		$scope.guardarInsumo = function( insumo ){

			if ($scope.creando) { //new

				Insumos.guardar( insumo ).then( function(){

					if (Insumos.err) {
							$scope.error = true;
							setTimeout(function(){
								$scope.error = false;
								$scope.$apply();
							},2000);

							setTimeout(function(){
								window.location = '#/insumos';
								return;
								$scope.$apply();
							},1000);
					}
					else {
							$scope.actualizado = true;
							setTimeout(function(){
								$scope.actualizado = false;
								$scope.$apply();
							},2000);

							setTimeout(function(){
								window.location = '#/insumos';
								return;
								$scope.$apply();
							},1000);
					}
					//console.log(insumo);
				//frmProductores.autoValidateFormOptions.resetForm();
			});
			}else{ //update
				Insumos.guardar( insumo ).then( function(){
					//console.log(insumo);
					$scope.actualizado = true;
				setTimeout(function(){
					$scope.actualizado = false;
					$scope.$apply();
				},2000);

				setTimeout(function(){
					window.location = '#/insumos';
					return;
					$scope.$apply();
				},1000);

				//frmProductores.autoValidateFormOptions.resetForm();
			});
			}

		}

		$scope.reset = function(frmInsumo){
			$scope.insumo = {
				nombre_com:"",
				ingrediente_act:""
			};
			 if (frmInsumo) {
      			frmInsumo.$setPristine();
      			frmInsumo.$setUntouched();
    		}
		}

	}]);
