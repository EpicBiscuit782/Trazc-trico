var app = angular.module('coeplimApp.noticiaCtrl', []);

	app.controller('noticiaCtrl', ['$scope','$http', '$routeParams', 'Noticia', function($scope,$http,$routeParams,Noticia){

		var id = $routeParams.id;

		$scope.actualizado = false;
		$scope.noticia = {};

		$scope.creando = false;
		$scope.buscar = true;
    $scope.errorFecha = false;
    $scope.error = false;

		if (id == 'new') {
			$scope.creando = true;
			$scope.noticia = {fecha:""};
		}
		else{
			Noticia.buscar(id).then(function(){

				$scope.creando = true;
				$scope.buscar = false;
				$scope.noticia = Noticia.noticia;
				if ($scope.noticia == undefined || Noticia.noticia == '') {

					window.location = '#/noticias';
					return;
				}

				var fecha = $scope.noticia.fecha.split("-");

				//console.log($scope.noticia.fecha);
				$scope.noticia.fecha = new Date(fecha[0],fecha[1]-1,fecha[2]);
				//console.log(new Date(2017,09,01));
				//console.log($scope.noticia);


				


			});
		}



		$scope.guardarNoticia = function( noticia ){

			if ($scope.creando) { //new

				if (angular.isDate(noticia.fecha)) {

        				Noticia.guardar( noticia ).then( function(){

									if (Noticia.err) {

										$scope.error = true;
										setTimeout(function(){
											$scope.error = false;
											$scope.$apply();
										},2000);

										setTimeout(function(){
											window.location = '#/noticias';
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
			        					window.location = '#/noticias';
			        					return;
			        					$scope.$apply();
			        				},1000);
										}
        			});
					}
					else{
						$scope.errorFecha = true;
						setTimeout(function(){
							$scope.errorFecha = false;
							$scope.$apply();
						},4000);
					}

			}else{ //update

				$scope.error = true;
      				setTimeout(function(){
      					$scope.error = false;
      					window.location = '#/noticias';
      					return;
      					$scope.$apply();
      				},1000);

      				//frmProductores.autoValidateFormOptions.resetForm();
      			

			}

		}

		$scope.reset = function(frmNoticia){
			$scope.noticia = {
				titulo:"",
				cuerpo:"",
				fecha: ""
			};
      $scope.errorFecha = false;
			$scope.buscar = true;
			$scope.error = false;

			 if (frmNoticia) {
      			frmNoticia.$setPristine();
      			frmNoticia.$setUntouched();
    		}
		}

	}]);
