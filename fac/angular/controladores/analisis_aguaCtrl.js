var app = angular.module('coeplimApp.analisis_aguaCtrl', []);

	app.controller('analisis_aguaCtrl', ['$scope','$http', '$routeParams', 'Agua','Notification', function($scope,$http,$routeParams,Agua,Notification){

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
		$scope.buscar = true;
		$scope.error = false;
		$scope.errorParcela = false;
        $scope.eviPrev = [];

    $scope.eviAguaUpload = function(event){
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
			$scope.analisis = {
                fecha:"",
				cloruros : 0,
				sulfatos : 0,
				carbonatos : 0,
				bicarbonatos : 0,
				ci : 0,
				so : 0,
				co : 0,
				hco : 0,
				ca : 0,
				mg : 0,
				na : 0,
				k : 0,
				calcio : 0,
				magnesio : 0,
				sodio : 0,
				potasio : 0
			};
		}
		else{
			Agua.buscar(id).then(function(){

				$scope.creando = true;
				$scope.buscar = false;
				$scope.analisis = Agua.analisis;
				
					$scope.analisis.ph = parseFloat($scope.analisis.ph);
					$scope.analisis.conductividad = parseFloat($scope.analisis.conductividad);
					$scope.analisis.ras = parseFloat($scope.analisis.ras);
					$scope.analisis.psi = parseFloat($scope.analisis.psi);
					$scope.analisis.csr = parseFloat($scope.analisis.csr);
					$scope.analisis.salpot = parseFloat($scope.analisis.salpot);
					$scope.analisis.salefect = parseFloat($scope.analisis.salefect);
					$scope.analisis.boro = parseFloat($scope.analisis.boro);
					$scope.analisis.dureza = parseFloat($scope.analisis.dureza);
					$scope.analisis.solidos = parseFloat($scope.analisis.solidos);
					$scope.analisis.cloruros = parseFloat($scope.analisis.cloruros);
					$scope.analisis.sulfatos = parseFloat($scope.analisis.sulfatos);
					$scope.analisis.carbonatos = parseFloat($scope.analisis.carbonatos);
					$scope.analisis.bicarbonatos = parseFloat($scope.analisis.bicarbonatos);
					$scope.analisis.ci = parseFloat($scope.analisis.ci);
					$scope.analisis.so = parseFloat($scope.analisis.so);
					$scope.analisis.co = parseFloat($scope.analisis.co);
					$scope.analisis.hco = parseFloat($scope.analisis.hco);
					$scope.analisis.ca = parseFloat($scope.analisis.ca);
					$scope.analisis.mg = parseFloat($scope.analisis.mg);
					$scope.analisis.na = parseFloat($scope.analisis.na);
					$scope.analisis.k = parseFloat($scope.analisis.k);
					$scope.analisis.calcio = parseFloat($scope.analisis.calcio);
					$scope.analisis.magnesio = parseFloat($scope.analisis.magnesio);
					$scope.analisis.sodio = parseFloat($scope.analisis.sodio);
					$scope.analisis.potasio = parseFloat($scope.analisis.potasio);
				
				$scope.dataParcela.alias = $scope.analisis.pcl_alias;
				$scope.dataParcela.id = $scope.analisis.id_parcela;

				
				var fecha = $scope.analisis.fecha.split("-");
				//console.log($scope.noticia.fecha);
				$scope.analisis.fecha = new Date(fecha[0],fecha[1]-1,fecha[2]);

				if ($scope.analisis == undefined || Agua.analisis == '') {

					window.location = '#/agua';
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
                                                
				            Agua.guardar(uploadForm).then( function(){
                                    
                                $scope.guardando = true;
                                if (Agua.err) {
                                    $scope.guardando = false;
                                    Notification.error({message: 'Ocurrió un error.', title: 'El análisis no se registró correctamente. Por favor inténtelo nuevamente.', delay: 3000});
                                }
                                else {
                                    $scope.guardando = false;
                                    Notification.success({message: 'El análisis se registró correctamente.', delay: 3000});
                                    window.location = '#/agua';
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
					$scope.analisis.id_parcela = $scope.dataParcela.id;
                    var uploadForm = new FormData();
                    angular.forEach($scope.filesEvi, function(file){
                        uploadForm.append('fileEvi[]', file);
                    });
						Agua.guardar($scope.analisis, uploadForm).then( function(){
						$scope.guardando = true;
						if (Agua.err) {
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
						    window.location = '#/agua';
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
		};

		$scope.reset = function(frmAnalisis){

			$scope.actualizado = false;
			$scope.errorFecha = false;
			$scope.buscar = true;
			$scope.error = false;
			$scope.errorParcela = false;
			

			$scope.analisis = {
				fecha:"",
				fuente:"",
				ph:"",
				conductividad:"",
				ras:"",
				psi:"",
				csr:"",
				salpot:"",
				salefect:"",
				clasificacion:"",
				boro:"",
				dureza:"",
				solidos:"",
				cloruros : 0,
				sulfatos : 0,
				carbonatos : 0,
				bicarbonatos : 0,
				ci : 0,
				so : 0,
				co : 0,
				hco : 0,
				ca : 0,
				mg : 0,
				na : 0,
				k : 0,
				calcio : 0,
				magnesio : 0,
				sodio : 0,
				potasio : 0
			};

            $scope.dataParcela.alias = "Parcela";
			$scope.dataParcela.id = 0;

			 if (frmAnalisis) {
      			frmAnalisis.$setPristine();
      			frmAnalisis.$setUntouched();
    		}
		}

	}]);