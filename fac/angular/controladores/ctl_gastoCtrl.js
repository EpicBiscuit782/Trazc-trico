var app = angular.module('coeplimApp.ctl_gastoCtrl', []);

	app.controller('ctl_gastoCtrl', ['$scope','$http', '$routeParams', 'Ctl_gastos', 'TipoGasto', function($scope,$http,$routeParams,Ctl_gastos,TipoGasto){

		var id = $routeParams.id;

		$scope.actualizado = false;
		$scope.ctl_gasto = {};

		$scope.creando = false;
		$scope.buscar = true;
		$scope.error = false;


		/* INSERTAR O ACTUALIZAR */

		if (id == 'new') {
			$scope.creando = true;
			$scope.ctl_gasto = {};
		}
		else{
			Ctl_gastos.buscar(id).then(function(){

				$scope.creando = true;
				$scope.buscar = false;
				$scope.ctl_gasto = Ctl_gastos.ctl_gasto;
				//console.log($scope.ctl_gasto);

				if ($scope.ctl_gasto == undefined || Ctl_gastos.ctl_gasto == '') {

					window.location = '#/ctl_gastos';
					return;
				}


			});
		}



		$scope.guardarGasto = function( ctl_gasto ){

			if ($scope.creando) { //new
				Ctl_gastos.guardar( ctl_gasto ).then( function(){
							//console.log(ctl_gasto);
						if (Ctl_gastos.err) {
							$scope.error = true;
							setTimeout(function(){
								$scope.error = false;
								$scope.$apply();
							},2000);

							setTimeout(function(){
								window.location = '#/ctl_gastos';
								return;
								$scope.$apply();
							},1000);
						}
						else{
							$scope.actualizado = true;
							setTimeout(function(){
								$scope.actualizado = false;
								$scope.$apply();
							},2000);

							setTimeout(function(){
								window.location = '#/ctl_gastos';
								return;
								$scope.$apply();
							},1000);
						}

				//frmProductores.autoValidateFormOptions.resetForm();
			});
			}else{ //update
				Ctl_gastos.guardar( ctl_gasto ).then( function(){
					//console.log(ctl_gasto);
				$scope.actualizado = true;
				setTimeout(function(){
					$scope.actualizado = false;
					$scope.$apply();
				},2000);

				setTimeout(function(){
					window.location = '#/ctl_gastos';
					return;
					$scope.$apply();
				},1000);

				//frmProductores.autoValidateFormOptions.resetForm();
			});
			}

		}


		/**
			CARGAR COMBO TIPO GASTOS
		*/

		$scope.tipo_gast = {};
		TipoGasto.all().then(function(){
			$scope.tipo_gast = TipoGasto;
			//console.log($scope.tipo_gast);
		});

		/*

				BORRAR DATOS

		 */

		 $scope.reset = function(frmCtl_gasto){
			$scope.ctl_gasto = {
				ctl_descripcion:""
			};
			 if (frmCtl_gasto) {
      			frmCtl_gasto.$setPristine();
      			frmCtl_gasto.$setUntouched();
    		}
		}

	}]);


	/*app.controller('comboCtrl', ['$scope', 'TipoGasto', function ($scope,TipoGasto) {



	}]);*/
