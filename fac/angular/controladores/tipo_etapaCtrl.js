var app = angular.module('coeplimApp.tipo_etapaCtrl', []);

	app.controller('tipo_etapaCtrl', ['$scope','$http', '$routeParams', 'TipoEtapa', function($scope,$http,$routeParams,TipoEtapa){

		var id = $routeParams.id;

		$scope.actualizado = false;
		$scope.tipo_etapa = {};

		$scope.creando = false;
		$scope.buscar = true;
		$scope.error = false;

		if (id == 'new') {
			$scope.creando = true;
			$scope.tipo_etapa = {};
		}
		else{
			TipoEtapa.buscar(id).then(function(){

				$scope.creando = true;
				$scope.buscar = false;
				$scope.tipo_gasto = TipoEtapa.tipo_etapa;
				//console.log($scope.tipo_etapa);

				if ($scope.tipo_etapa == undefined || TipoEtapa.tipo_etapa == '') {

					window.location = '#/tipo_etapas';
					return;
				}


			});
		}



		$scope.guardarTipoEtapa = function( tipo_etapa ){

			if ($scope.creando) { //new
				TipoEtapa.guardar( tipo_etapa ).then( function(){

					if (TipoEtapa.err) {
						$scope.error = true;
						setTimeout(function(){
							$scope.error = false;
							$scope.$apply();
						},2000);

						setTimeout(function(){
							window.location = '#/tipo_etapas';
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
							window.location = '#/tipo_etapas';
							return;
							$scope.$apply();
						},1000);
					}




				//frmProductores.autoValidateFormOptions.resetForm();
			});
			}else{ //update
				TipoEtapa.guardar( tipo_etapa ).then( function(){
					//console.log(tipo_etapa);
				$scope.actualizado = true;
				setTimeout(function(){
					$scope.actualizado = false;
					$scope.$apply();
				},2000);

				setTimeout(function(){
					window.location = '#/tipo_etapas';
					return;
					$scope.$apply();
				},1000);

				//frmProductores.autoValidateFormOptions.resetForm();
			});
			}

		}
//limpiar formulario
		$scope.reset = function(frmTipEtapa){
			$scope.tipo_etapa = {
				tpeta_act_descripcion:""
			};
			 if (frmTipEtapa) {
      			frmTipEtapa.$setPristine();
      			frmTipEtapa.$setUntouched();
    		}
		}

	}]);
