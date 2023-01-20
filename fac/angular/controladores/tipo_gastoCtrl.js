var app = angular.module('coeplimApp.tipo_gastoCtrl', []);

	app.controller('tipo_gastoCtrl', ['$scope','$http', '$routeParams', 'TipoGasto', function($scope,$http,$routeParams,TipoGasto){

		var id = $routeParams.id;

		$scope.actualizado = false;
		$scope.tipo_gasto = {};

		$scope.creando = false;
		$scope.buscar = true;
		$scope.error = false;

		if (id == 'new') {
			$scope.creando = true;
			$scope.tipo_gasto = {};
		}
		else{
			TipoGasto.buscar(id).then(function(){

				$scope.creando = true;
				$scope.buscar = false;
				$scope.tipo_gasto = TipoGasto.tipo_gasto;
				//console.log($scope.tipo_gasto);

				if ($scope.tipo_gasto == undefined || TipoGasto.tipo_gasto == '') {

					window.location = '#/tipo_gastos';
					return;
				}


			});
		}



		$scope.guardarTipoGasto = function( tipo_gasto ){

			if ($scope.creando) { //new
				TipoGasto.guardar( tipo_gasto ).then( function(){

					if (TipoGasto.err) {
						$scope.error = true;
						setTimeout(function(){
							$scope.error = false;
							$scope.$apply();
						},2000);

						setTimeout(function(){
							window.location = '#/tipo_gastos';
							return;
							$scope.$apply();
						},1000);
					}//fin if
					else {
						$scope.actualizado = true;
						setTimeout(function(){
							$scope.actualizado = false;
							$scope.$apply();
						},2000);

						setTimeout(function(){
							window.location = '#/tipo_gastos';
							return;
							$scope.$apply();
						},1000);
					}




				//frmProductores.autoValidateFormOptions.resetForm();
			});
			}else{ //update
				TipoGasto.guardar( tipo_gasto ).then( function(){
					//console.log(tipo_gasto);
				$scope.actualizado = true;
				setTimeout(function(){
					$scope.actualizado = false;
					$scope.$apply();
				},2000);

				setTimeout(function(){
					window.location = '#/tipo_gastos';
					return;
					$scope.$apply();
				},1000);

				//frmProductores.autoValidateFormOptions.resetForm();
			});
			}

		}

		$scope.reset = function(frmTipGasto){
			$scope.tipo_gasto = {
				tpgst_act_descripcion:""
			};
			 if (frmTipGasto) {
      			frmTipGasto.$setPristine();
      			frmTipGasto.$setUntouched();
    		}
		}

	}]);
