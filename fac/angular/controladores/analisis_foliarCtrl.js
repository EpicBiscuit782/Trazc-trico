var app = angular.module('coeplimApp.analisis_foliarCtrl', []);

	app.controller('analisis_foliarCtrl', ['$scope','$http', '$routeParams', 'Analisis_Foliar', 'Notification', function($scope,$http,$routeParams,Analisis_Foliar,Notification){

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

		if (id == 'new') {
			$scope.creando = true;
			$scope.analisis = {};
		}
		else{
			Analisis_Foliar.buscar(id).then(function(){

				$scope.creando = true;
				$scope.buscar = false;
				$scope.analisis = Analisis_Foliar.analisis;
				$scope.dataParcela.alias = Analisis_Foliar.analisis.pcl_alias;
				$scope.dataParcela.id = $scope.analisis.id_parcela;
				//console.log($scope.analisis);
				var fecha = $scope.analisis.fecha.split("-");
				//console.log($scope.noticia.fecha);
				$scope.analisis.fecha = new Date(fecha[0],fecha[1]-1,fecha[2]);
				if ($scope.analisis == undefined || Analisis_Foliar.analisis == '') {

					window.location = '#/foliar';
					return;
				}


			});
		}



		$scope.guardarAnalisis = function( analisis ){

			if ($scope.creando) { //new

				if (angular.isDate($scope.analisis.fecha)) {

					if ($scope.dataParcela.id != 0) {

                        var uploadForm = new FormData();
                        angular.forEach($scope.filesEvi, function(file){
                            uploadForm.append('fileEvi[]', file);
                        });
                        var data = JSON.stringify($scope.analisis);
                        uploadForm.append('data', data);
                        uploadForm.append('id_parcela', $scope.dataParcela.id);
                        
				        Analisis_Foliar.guardar(uploadForm).then( function(){

                                $scope.guardando = true;
                                if (Analisis_Foliar.err) {
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
			}else{ //update

				if (angular.isDate($scope.analisis.fecha)) {
                    var uploadForm = new FormData();
                    angular.forEach($scope.filesEvi, function(file){
                        uploadForm.append('fileEvi[]', file);
                    });
                    var data = JSON.stringify($scope.analisis);
                    uploadForm.append('data', data);
                    uploadForm.append('id_parcela', $scope.dataParcela.id);
                    
				    Analisis_Foliar.guardar($scope.analisis, uploadForm).then( function(){
						$scope.guardando = true;
						if (Analisis_Foliar.err) {
						    $scope.guardando = false;
						    Notification.error({
						        message: 'Ocurrió un error.',
						        title: 'El análisis no se actualizó correctamente. Por favor inténtelo nuevamente.',
						        delay: 3000
						    });
						} else {
						    $scope.guardando = false;
						    Notification.success({
						        message: 'El análisis se actualizó correctamente.',
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
				$scope.analisis = {
				fecha:"",
				fosforo:"",
				p:"",
				potasio:"",
				k:"",
				calcio:"",
				ca:"",
				magnesio:"",
				mg:"",
				hierro:"",
				cobre:"",
				manganeso:"",
				zinc:"",
				boro:"",
				sodio:""
			};
			
			$scope.dataParcela.alias = "Parcela";
			$scope.dataParcela.id = 0;
			
			$scope.buscar = true;
			$scope.error = false;
			 if (frmAnalisis) {
      			frmAnalisis.$setPristine();
      			frmAnalisis.$setUntouched();
    		}
		}

	}]);