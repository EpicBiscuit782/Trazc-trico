var app = angular.module('coeplimApp.variedadCtrl', []);

	app.controller('variedadCtrl', ['$scope','$http', '$routeParams', 'Variedad', function($scope,$http,$routeParams,Variedad){

		var id = $routeParams.id;

		$scope.actualizado = false;
		$scope.variedad = {};

		$scope.creando = false;
		$scope.buscar = true;
		$scope.error = false;

		if (id == 'new') {
			$scope.creando = true;
			$scope.variedad = {};
		}
		else{
			Variedad.buscar(id).then(function(){

				$scope.creando = true;
				$scope.buscar = false;
				$scope.variedad = Variedad.variedad;
				//console.log($scope.terreno);

				if ($scope.variedad == undefined || Variedad.variedad == '') {

					window.location = '#/variedades';
					return;
				}


			});
		}



		$scope.guardarVariedad = function( variedad ){

			if ($scope.creando) { //new
				Variedad.guardar( variedad ).then( function(){

					if (Variedad.err) {
						$scope.error = true;
						setTimeout(function(){
							$scope.error = false;
							$scope.$apply();
						},2000);

						setTimeout(function(){
							window.location = '#/variedades';
							return;
							$scope.$apply();
						},1000);
					}
					else{
							//console.log(variedad);
						$scope.actualizado = true;
						setTimeout(function(){
							$scope.actualizado = false;
							$scope.$apply();
						},2000);

						setTimeout(function(){
							window.location = '#/variedades';
							return;
							$scope.$apply();
						},1000);
			   }


				//frmProductores.autoValidateFormOptions.resetForm();
			});
			}else{ //update
				Variedad.guardar( variedad ).then( function(){
					//console.log(variedad);
				$scope.actualizado = true;
				setTimeout(function(){
					$scope.actualizado = false;
					$scope.$apply();
				},2000);

				setTimeout(function(){
					window.location = '#/variedades';
					return;
					$scope.$apply();
				},1000);

				//frmProductores.autoValidateFormOptions.resetForm();
			});
			}

		}

		$scope.reset = function(frmVariedad){
			$scope.variedad = {
				variedad:""
			};
			 if (frmVariedad) {
      			frmVariedad.$setPristine();
      			frmVariedad.$setUntouched();
    		}
		}

	}]);
