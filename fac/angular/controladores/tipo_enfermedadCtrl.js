var app = angular.module('coeplimApp.tipo_enfermedadCtrl', []);

	app.controller('tipo_enfermedadCtrl', ['$scope','$http', '$routeParams', 'TipoEnfermedad', function($scope,$http,$routeParams,TipoEnfermedad){

		var id = $routeParams.id;

		$scope.actualizado = false;
		$scope.buscar = true;
		$scope.tipo_enfermedad = {};

		$scope.creando = false;
		$scope.error = false;

		if (id == 'new') {
			$scope.creando = true;
			$scope.tipo_enfermedad = {};
		}
		else{
			TipoEnfermedad.buscar(id).then(function(){

				$scope.creando = true;
				$scope.buscar = false;
				$scope.tipo_enfermedad = TipoEnfermedad.tipo_enfermedad;
				//console.log($scope.tipo_enfermedad);

				if ($scope.tipo_enfermedad == undefined || TipoEnfermedad.tipo_enfermedad == '') {

					window.location = '#/tipo_enfermedades';
					return;
				}


			});
		}



		$scope.guardarTipoEnfermedad = function( tipo_enfermedad ){

			if ($scope.creando) { //new
				TipoEnfermedad.guardar( tipo_enfermedad ).then( function(){

					if (TipoEnfermedad.err) {
							//console.log(tipo_enfermedad);
						$scope.error = true;
						setTimeout(function(){
							$scope.error = false;
							$scope.$apply();
						},2000);

						setTimeout(function(){
							window.location = '#/tipo_enfermedades';
							return;
							$scope.$apply();
						},1000);

					}
					else {
							//console.log(tipo_enfermedad);
						$scope.actualizado = true;
						setTimeout(function(){
							$scope.actualizado = false;
							$scope.$apply();
						},2000);

						setTimeout(function(){
							window.location = '#/tipo_enfermedades';
							return;
							$scope.$apply();
						},1000);

					}

				//frmProductores.autoValidateFormOptions.resetForm();
			});
			}else{ //update
				TipoEnfermedad.guardar( tipo_enfermedad ).then( function(){
					//console.log(tipo_enfermedad);
				$scope.actualizado = true;
				setTimeout(function(){
					$scope.actualizado = false;
					$scope.$apply();
				},2000);

				setTimeout(function(){
					window.location = '#/tipo_enfermedades';
					return;
					$scope.$apply();
				},1000);

				//frmProductores.autoValidateFormOptions.resetForm();
			});
			}

		}

		$scope.reset = function(frmTipoEnf){
			$scope.tipo_enfermedad = {
				tipo_enfermedad:""
			};
			 if (frmTipoEnf) {
      			frmTipoEnf.$setPristine();
      			frmTipoEnf.$setUntouched();
    		}
		}

	}]);
