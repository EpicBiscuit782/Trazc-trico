var app = angular.module('coeplimApp.analisis_sueloCtrl', []);

	app.controller('analisis_sueloCtrl', ['$scope','$http', '$routeParams', 'Analisis_Suelo','Notification', function($scope,$http,$routeParams,Analisis_Suelo,Notification){

        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.format = 'dd-MMMM-yyyy';

        $scope.popup1 = {
            opened: false
        };
        
        var id = $routeParams.id;

		$scope.actualizado = false;
		$scope.creando = false;
        $scope.guardando = false;
		$scope.errorFecha = false;
		$scope.errorParcela = false;
		$scope.buscar = true;
		$scope.error = false;
		$scope.id_parcela = "";
        $scope.eviPrev = [];
        
    $scope.eviUpload = function(event){
         var files = event.target.files;
        $scope.eviPrev = [];
         for (var i = 0; i < files.length; i++) {
             var file = files[i];
                 var reader = new FileReader();
                 reader.onload = $scope.eviIsLoaded; 
                 reader.readAsDataURL(file);
         }
    }

    $scope.eviIsLoaded = function(e){
        $scope.$apply(function() {
            $scope.eviPrev.push(e.target.result);
        });
    }

		$scope.tipos = [{
			textura : 'ARENOSO'
		},
		{
			textura : 'ARCILLOSO'
		}

	];

		if (id == 'new') {
			$scope.creando = true;
			$scope.analisis_suelo = {};
			//console.log("hola");
		}
		else{
			Analisis_Suelo.buscar(id).then(function(){
				//console.log("buscar");
				$scope.creando = true;
				$scope.buscar = false;

				$scope.analisis_suelo = Analisis_Suelo.analisis;
				$scope.dataParcela.alias = Analisis_Suelo.analisis.pcl_alias;
				$scope.dataParcela.id = $scope.analisis_suelo.id_parcela;
				//console.log($scope.analisis_suelo);
				var fecha = $scope.analisis_suelo.fecha.split("-");

				//console.log($scope.noticia.fecha);
				$scope.analisis_suelo.fecha = new Date(fecha[0],fecha[1]-1,fecha[2]);

				if ($scope.analisis_suelo == undefined || Analisis_Suelo.analisis == '') {

					window.location = '#/analisis_suelos';
					return;
				}


			});
		}

		$scope.guardar= function( analisis_suelo){
            

			if ($scope.creando) { //new

				if (angular.isDate($scope.analisis_suelo.fecha)) {

					if ($scope.dataParcela.id != 0) {

                        var uploadForm = new FormData();
                        angular.forEach($scope.filesEvi, function(file){
                            uploadForm.append('fileEvi[]', file);
                        });
                        
                        var data = JSON.stringify($scope.analisis_suelo);
                        uploadForm.append('data', data);
                        uploadForm.append('id_parcela', $scope.dataParcela.id);

							Analisis_Suelo.guardar(uploadForm).then( function(){

                                $scope.guardando = true;
                                if (Analisis_Suelo.err) {
                                    $scope.guardando = false;
                                    Notification.error({message: 'Ocurrió un error.', title: 'El análisis no se registró correctamente. Por favor inténtelo nuevamente.', delay: 3000});
                                }
                                else {
                                    $scope.guardando = false;
                                    Notification.success({message: 'El análisis se registró correctamente.', delay: 3000});
                                    window.location = '#/foliar';
                                }

							});
					}
					else {
						$scope.errorParcela = true;
						setTimeout(function(){
							$scope.errorParcela = false;
							$scope.$apply();
						},7000);
					}
				}
				else {
					$scope.errorFecha = true;
					setTimeout(function(){
						$scope.errorFecha = false;
						$scope.$apply();
					},5000);
				}
			}
			else{ //update
				if (angular.isDate($scope.analisis_suelo.fecha)) {
                    var uploadForm = new FormData();
                    angular.forEach($scope.filesEvi, function(file){
                        uploadForm.append('fileEvi[]', file);
                    });
                    var data = JSON.stringify($scope.analisis_suelo);
                    uploadForm.append('data', data);
                    uploadForm.append('id_parcela', $scope.dataParcela.id);
                    
					Analisis_Suelo.guardar(uploadForm).then( function(){
                    $scope.guardando = true;
                    if (Analisis_Suelo.err) {
                        $scope.guardando = false;
                        Notification.error({
                            message: 'Ocurrió un error.',
                            title: 'El análisis no se registró correctamente. Por favor inténtelo nuevamente.',
                            delay: 3000
                        });
                    } else {
                        $scope.guardando = false;
                        Notification.success({
                            message: 'El análisis se registró correctamente.',
                            delay: 3000
                        });
                        window.location = '#/foliar';
                    }

				});
				}
				else {
					$scope.errorFecha = true;
					setTimeout(function(){
						$scope.errorFecha = false;
						$scope.$apply();
					},5000);
				}
			}
		}



		$scope.reset = function(frmAnalisis){
			$scope.actualizado = false;
			$scope.errorFecha = false;
			$scope.errorParcela = false;
			$scope.buscar = true;
			$scope.error = false;
			$scope.tipos = [{
				textura : 'ARENOSO'
			},
			{
				textura : 'ARCILLOSO'
			}];
			$scope.analisis_suelo = {
				fecha:"",
				ph:"",
				materia_org:"",
				nitrogeno:"",
				fosforo:"",
				potasio:"",
				calcio:"",
				magnesio:"",
				sodio:"",
				cobre:"",
				fierro:"",
				manganeso:"",
				zinc:"",
				carbonatos:"",
				arcilla:"",
				arena:"",
				limo:"",
				textura:"",
				capacidad:"",
				humedad:"",
				punto:"",
			};
			
			$scope.dataParcela.alias = "Parcela";
			$scope.dataParcela.id = 0;
			
			 if (frmAnalisis) {
      			frmAnalisis.$setPristine();
      			frmAnalisis.$setUntouched();
    		}
		}

	}]);