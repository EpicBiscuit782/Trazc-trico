var app = angular.module('coeplimApp.portainjertoCtrl', []);

	app.controller('portainjertoCtrl', ['$scope','$http', '$routeParams', 'Portainjerto', function($scope,$http,$routeParams,Portainjerto){

		var id = $routeParams.id;

		$scope.actualizado = false;
		$scope.portainjerto = {};

		$scope.creando = false;

		if (id == 'new') {
			$scope.creando = true;
			$scope.portainjerto = {};
		}
		else{
			Portainjerto.buscar(id).then(function(){

				$scope.creando = true;
				$scope.portainjerto = Portainjerto.portainjerto;
				//console.log($scope.portainjerto);

				if ($scope.portainjerto == undefined || Portainjerto.portainjerto == '') {

					window.location = '#/portainjertos';
					return;
				}


			});
		}



		$scope.guardarPortainjerto = function( portainjerto ){

			if ($scope.creando) { //new
				Portainjerto.guardar( portainjerto ).then( function(){

					if (Portainjerto.err) {
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
					else{
							//console.log(portainjerto);
						$scope.actualizado = true;
						setTimeout(function(){
							$scope.actualizado = false;
							$scope.$apply();
						},2000);

						setTimeout(function(){
							window.location = '#/portainjertos';
							return;
							$scope.$apply();
						},1000);
					}

				//frmProductores.autoValidateFormOptions.resetForm();
			});
			}else{ //update
				Portainjerto.guardar( portainjerto ).then( function(){
					//console.log(portainjerto);
				$scope.actualizado = true;
				setTimeout(function(){
					$scope.actualizado = false;
					$scope.$apply();
				},2000);

				setTimeout(function(){
					window.location = '#/portainjertos';
					return;
					$scope.$apply();
				},1000);

				//frmProductores.autoValidateFormOptions.resetForm();
			});
			}

		}

		$scope.reset = function(frmPortainjerto){
			$scope.portainjerto = {
				nom_portainjerto:""
			};
			 if (frmPortainjerto) {
      			frmPortainjerto.$setPristine();
      			frmPortainjerto.$setUntouched();
    		}
		}

	}]);
