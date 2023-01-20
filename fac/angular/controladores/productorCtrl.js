var app = angular.module('coeplimApp.productorCtrl', []);

	app.controller('productorCtrl', ['$scope','$http', '$routeParams', 'Productores', function($scope,$http,$routeParams,Productores){

		var id = $routeParams.id;

		$scope.actualizado = false;
		$scope.productor = {};
		$scope.existe = false;
		$scope.email = false;
		$scope.correo = "";

		$scope.creando = false;
		$scope.buscar = true;
		$scope.error = false;

		if (id == 'new') {
			$scope.creando = true;
			$scope.productor = {};
		}
		else{
			Productores.buscar(id).then(function(){

				$scope.creando = true;
				$scope.buscar = false;
				$scope.productor = Productores.productor;
				$scope.correo = Productores.productor.pdt_email;
				//console.log($scope.productor);
				if ($scope.productor == undefined) {

					window.location = '#/productores';
					return;
				}

			});
		}


		$scope.guardarProductor = function( productor ){

			if ($scope.creando) { //new

				if ($scope.correo != productor.pdt_email) {
					Productores.buscarEmail(productor.pdt_email).then( function(){
						$scope.existe = Productores.existeEmail;



					if ($scope.existe) {
						Productores.guardar( productor ).then( function(){
							//console.log(productores);
							if (Productores.err) {

									$scope.error = true;
									setTimeout(function(){
										$scope.error = false;
										$scope.$apply();
									},2000);

									setTimeout(function(){
										window.location = '#/productores';
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
									window.location = '#/productores';
									return;
									$scope.$apply();
								},1000);
							}
						});
					}
					else {
						$scope.email = true;
						setTimeout(function(){
							$scope.email = false;
							$scope.$apply();
						},5000);
					}


				});
			}
			else {
				Productores.guardar( productor ).then( function(){
					//console.log(productores);
					if (Productores.err) {

							$scope.error = true;
							setTimeout(function(){
								$scope.error = false;
								$scope.$apply();
							},2000);

							setTimeout(function(){
								window.location = '#/productores';
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
							window.location = '#/productores';
							return;
							$scope.$apply();
						},1000);
					}
				});
			}
			

		}//fin if
			else{ //update

						Productores.guardar( productor ).then( function(){
							console.log(productores);
						$scope.actualizado = true;
						setTimeout(function(){
							$scope.actualizado = false;
							$scope.$apply();
						},2000);

						setTimeout(function(){
							window.location = '#/productores';
							return;
							$scope.$apply();
						},1000);
					});


			}

		}

		$scope.reset = function(frmProductor){
			$scope.productor = {
				pdt_nombre_completo:"",
				pdt_curp:"",
				pdt_rfc:"",
				pdt_domicilio_completo:"",
				pdt_telefono:"",
				pdt_email:"",
				pdt_password:"",
				pdt_activo:"",
			};
			 if (frmProductor) {
      			  frmProductor.$setPristine();
      			  frmProductor.$setUntouched();
    		}
		}

	}]);
