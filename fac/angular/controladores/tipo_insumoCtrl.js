var app = angular.module('coeplimApp.tipo_insumoCtrl', []);

	app.controller('tipo_insumoCtrl', ['$scope','$http', '$routeParams', 'TipoInsumo', function($scope,$http,$routeParams,TipoInsumo){

		var id = $routeParams.id;

		$scope.actualizado = false;
		$scope.tipo_insumo = {};

		$scope.creando = false;
		$scope.buscar = true;
		$scope.error = false;

		if (id == 'new') {
			$scope.creando = true;
			$scope.tipo_insumo = {};
			//console.log("new");
		}
		else{
			TipoInsumo.buscar(id).then(function(){

				$scope.creando = true;
				$scope.buscar = false;
				$scope.tipo_insumo = TipoInsumo.tipo_insumo;
				//console.log($scope.tipo_insumo);


				if ($scope.tipo_insumo == undefined || TipoInsumo.tipo_insumo == '') {

					window.location = '#/tipo_insumos';
					return;
				}


			});
		}



		$scope.guardarTipoInsumo = function( tipo_insumo ){

			if ($scope.creando) { //new
				TipoInsumo.guardar( tipo_insumo ).then( function(){
					//console.log(tipo_insumo);

					if (TipoInsumo.err) {
						$scope.error = true;
						setTimeout(function(){
							$scope.error = false;
							$scope.$apply();
						},2000);

						setTimeout(function(){
							window.location = '#/tipo_insumos';
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
								window.location = '#/tipo_insumos';
								return;
								$scope.$apply();
							},1000);
						}



				//frmProductores.autoValidateFormOptions.resetForm();
			});
			}else{ //update
				TipoInsumo.guardar( tipo_insumo ).then( function(){
					//console.log(tipo_insumo);
				$scope.actualizado = true;
				setTimeout(function(){
					$scope.actualizado = false;
					$scope.$apply();
				},2000);

				setTimeout(function(){
					window.location = '#/tipo_insumos';
					return;
					$scope.$apply();
				},1000);

				//frmProductores.autoValidateFormOptions.resetForm();
			});
			}

		}

		$scope.reset = function(frmTipInsumo){
			$scope.tipo_insumo = {
				descripcion:""
			};
			 if (frmTipInsumo) {
      			frmTipInsumo.$setPristine();
      			frmTipInsumo.$setUntouched();
    		}
		}

	}]);
