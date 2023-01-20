var app = angular.module('coeplimApp.enfermedadCtrl', []);

	app.controller('enfermedadCtrl', ['$scope','$http', '$routeParams', 'TipoEnfermedad', 'Enfermedad', function($scope,$http,$routeParams,TipoEnfermedad,Enfermedad){

		var id = $routeParams.id;

		$scope.actualizado = false;
		$scope.enfermedad = {};

		$scope.creando = false;
		$scope.buscar = true;
		$scope.error = false;

		if (id == 'new') {
			$scope.creando = true;
			$scope.enfermedad = {};
		}
		else{
			Enfermedad.buscar(id).then(function(){

				$scope.creando = true;
				$scope.buscar = false;
				$scope.enfermedad = Enfermedad.enfermedad;
				//console.log($scope.enfermedad);

				if ($scope.enfermedad == undefined || Enfermedad.enfermedad == '') {

					window.location = '#/enfermedades';
					return;
				}


			});
		}

		//cargar tipo enfermedad

		$scope.tipo_enfermedad = {};
		TipoEnfermedad.all().then(function(){
			$scope.tipo_enfermedad = TipoEnfermedad;
			//console.log($scope.tipo_enfermedad);
		});



		$scope.guardarEnfermedad = function( enfermedad ){

			if ($scope.creando) { //new
				Enfermedad.guardar( enfermedad ).then( function(){

					if (Enfermedad.err) {
							//console.log(enfermedad);
						$scope.error = true;
						setTimeout(function(){
							$scope.error = false;
							$scope.$apply();
						},2000);

						setTimeout(function(){
							window.location = '#/enfermedades';
							return;
							$scope.$apply();
						},1000);

					}
					else {
						//console.log(enfermedad);
					$scope.actualizado = true;
					setTimeout(function(){
						$scope.actualizado = false;
						$scope.$apply();
					},2000);

					setTimeout(function(){
						window.location = '#/enfermedades';
						return;
						$scope.$apply();
					},1000);

					}


				//frmProductores.autoValidateFormOptions.resetForm();
			});
			}else{ //update
				Enfermedad.guardar( enfermedad ).then( function(){
					//console.log(enfermedad);
				$scope.actualizado = true;
				setTimeout(function(){
					$scope.actualizado = false;
					$scope.$apply();
				},2000);

				setTimeout(function(){
					window.location = '#/enfermedades';
					return;
					$scope.$apply();
				},1000);

				//frmProductores.autoValidateFormOptions.resetForm();
			});
			}

		}

		$scope.reset = function(frmEnfermedad){
			$scope.enfermedad = {
				enfermedad:"",
				descripcion:"",
				agente:"",
				sintomas:"",
				manejo:""
			};
			 if (frmEnfermedad) {
      			frmEnfermedad.$setPristine();
      			frmEnfermedad.$setUntouched();
    		}
		}

	}]);
