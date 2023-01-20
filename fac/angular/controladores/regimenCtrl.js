var app = angular.module('coeplimApp.regimenCtrl', []);

	app.controller('regimenCtrl', ['$scope','$http', '$routeParams', 'Propiedades', function($scope,$http,$routeParams,Propiedades){

		var id = $routeParams.id;

		$scope.actualizado = false;
		$scope.regimen = {};

		$scope.creando = false;
		$scope.buscar = true;
		$scope.error = false;

		if (id == 'new') {
			$scope.creando = true;
			$scope.regimen = {};
		}
		else{
			Propiedades.buscar(id).then(function(){

				$scope.creando = true;
				$scope.buscar = false;
				$scope.regimen = Propiedades.propiedad;
				//console.log($scope.regimen);

				if ($scope.regimen == undefined || Propiedades.propiedad == '') {

					window.location = '#/propiedades';
					return;
				}


			});
		}



		$scope.guardarPropiedad = function( propiedad ){

			if ($scope.creando) { //new
				Propiedades.guardar( propiedad ).then( function(){

						if (Propiedades.err) {
									//console.log(propiedad);
								$scope.error = true;
								setTimeout(function(){
									$scope.error = false;
									$scope.$apply();
								},2000);

								setTimeout(function(){
									window.location = '#/propiedades';
									return;
									$scope.$apply();
								},1000);
						}
						else {
								//console.log(propiedad);
							$scope.actualizado = true;
							setTimeout(function(){
								$scope.actualizado = false;
								$scope.$apply();
							},2000);

							setTimeout(function(){
								window.location = '#/propiedades';
								return;
								$scope.$apply();
							},1000);
						}

				//frmProductores.autoValidateFormOptions.resetForm();
			});
			}else{ //update
				Propiedades.guardar( propiedad ).then( function(){
					//console.log(propiedad);
				$scope.actualizado = true;
				setTimeout(function(){
					$scope.actualizado = false;
					$scope.$apply();
				},2000);

				setTimeout(function(){
					window.location = '#/propiedades';
					return;
					$scope.$apply();
				},1000);

				//frmProductores.autoValidateFormOptions.resetForm();
			});
			}

		}

		$scope.reset = function(frmPropiedad){
			$scope.regimen = {
				nombre:""
			};
			 if (frmPropiedad) {
      			frmPropiedad.$setPristine();
      			frmPropiedad.$setUntouched();
    		}
		}

	}]);
