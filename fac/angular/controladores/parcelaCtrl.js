var app = angular.module('coeplimApp.parcelaCtrl', []);

	app.controller('parcelaCtrl', ['$scope','$http', '$routeParams', 'Parcelas', 'Propiedades', 'Productores', 'Notification', function($scope,$http,$routeParams,Parcelas,Propiedades,Productores,Notification){

		var id = $routeParams.id;

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
        
		$scope.guardando = false;
		$scope.actualizado = false;
		$scope.buscar = true;
		$scope.error = false;

		$scope.creando = false;
		$scope.ejido = false;
		$scope.errorPlantacion = false;
		$scope.errorCosecha = false;

    $scope.set_cod = function () {
        Parcelas.total_parcelas().then(function(){
            $scope.total = Parcelas.total;
            var total=(parseInt($scope.total))+1;
            var r = "" + total;
            while (r.length < 2) {
                r = "0" + r;
            }
            if ($scope.parcela.pcl_municipio == 'ARMERÍA') {
                $scope.parcela.cod_parcela = '06/001/'+r;
            } else if ($scope.parcela.pcl_municipio == 'COLIMA') {
                $scope.parcela.cod_parcela = '06/002/'+r;
            } else if ($scope.parcela.pcl_municipio == 'COMALA') {
                $scope.parcela.cod_parcela = '06/003/'+r;
            } else if ($scope.parcela.pcl_municipio == 'COQUIMATLÁN') {
                $scope.parcela.cod_parcela = '06/004/'+r;
            } else if ($scope.parcela.pcl_municipio == 'CUAUHTÉMOC') {
                $scope.parcela.cod_parcela = '06/005/'+r;
            } else if ($scope.parcela.pcl_municipio == 'MANZANILLO') {
                $scope.parcela.cod_parcela = '06/007/'+r;
            } else if ($scope.parcela.pcl_municipio == 'MINATITLÁN') {
                $scope.parcela.cod_parcela = '06/008/'+r;
            } else if ($scope.parcela.pcl_municipio == 'TECOMÁN') {
                $scope.parcela.cod_parcela = '06/009/'+r;
            } else if ($scope.parcela.pcl_municipio == 'VILLA DE ÁLVAREZ') {
                $scope.parcela.cod_parcela = '06/010/'+r;
            }
            });
        }
                                 

		if (id == 'new') {
			$scope.creando = true;
			$scope.parcela = {
				pcl_largo:'',
				pcl_ancho:'',
				pcl_hectareas:''
			};
		}
		else{
			Parcelas.buscar(id).then(function(){
				$scope.creando = true;
				$scope.buscar = false;

				$scope.parcela = Parcelas.parcela;
				//console.log($scope.parcela);
				var fechaPlant = $scope.parcela.pcl_fecha_plantacion.split("-");
				var fechaCosec = $scope.parcela.pcl_primera_cosecha.split("-");
				//console.log(fechaPlant);
				$scope.parcela.pcl_fecha_plantacion = new Date(fechaPlant[0],fechaPlant[1],fechaPlant[2]);
				$scope.parcela.pcl_primera_cosecha = new Date(fechaCosec[0],fechaCosec[1],fechaCosec[2]);

				if ($scope.parcela.pcl_ejido != "") {  // ocupo saber el id_regimen para aparecer ejido
					$scope.ejido = true;
				}
				else {
					$scope.ejido = false;
				}


				if ($scope.parcela == undefined || Parcelas.parcela == '') {

					window.location = '#/parcelas';
					return;
				}


			});
		}

		$scope.isEjido = function(regimen){
			//console.log(regimen);
			//console.log($scope.regim.propiedades);
			if (regimen == "EJIDO") {
				$scope.ejido = true;
			}
			else {
				$scope.ejido = false;
				$scope.parcela.pcl_ejido = "";
			}
			buscar(regimen);
		}

// busca el id_regimen
		function buscar(regimen){
			//busca el nombre del insumo
			for (var i = 0; i < $scope.regim.propiedades.length; i++) {
				//console.log($scope.insumos.insumos[i]);
				if(regimen == $scope.regim.propiedades[i].nombre){
					$scope.parcela.id_regimen = $scope.regim.propiedades[i].id_regimen;
					break;
				}
			}
		}


		$scope.guardarParcela = function( parcela ){

			if ($scope.creando) { //new

					if (angular.isDate($scope.parcela.pcl_fecha_plantacion)) {

							if (angular.isDate($scope.parcela.pcl_primera_cosecha)) {

								Parcelas.guardar( parcela ).then( function(){

                                $scope.guardando = true;
                                if (Parcelas.err) {
                                    $scope.guardando = false;
                                    Notification.error({
                                        message: 'Ocurrió un error.',
                                        title: 'La pafcela no se registró correctamente. Por favor inténtelo nuevamente.',
                                        delay: 3000
                                    });
                                    $scope.$apply();
                                } else {
                                    $scope.guardando = false;
                                    Notification.success({
                                        message: 'La parcela se registró correctamente.',
                                        delay: 3000
                                    });
                                    window.location = '#/parcelas';
                                    $scope.$apply();
                                }

								});
							}
							else {
								$scope.errorCosecha = true;
								setTimeout(function(){
									$scope.errorCosecha = false;
									$scope.$apply();
								},4000);
							}
					}
					else {
						$scope.errorPlantacion = true;
						setTimeout(function(){
							$scope.errorPlantacion = false;
							$scope.$apply();
						},4000);
					}

			}
			else{ //update

				$scope.error = true;
				setTimeout(function(){
					$scope.error = false;
					$scope.$apply();
				},2000);

				setTimeout(function(){
					window.location = '#/parcelas';
					return;
					$scope.$apply();
				},1000);


			}

		}

		/*
			CARGAR COMBO REGIMEN DE PROPIEDAD
		*/

		$scope.regim = {};
		Propiedades.all().then(function(){
			$scope.regim = Propiedades;
		});

		/*
			CARGAR COMBO PRODUCTORES
		*/

		$scope.product = {};
		Productores.all().then(function(){
			$scope.product = Productores;
		});


		$scope.reset = function(frmParcela){

			$scope.creando = true;
			$scope.ejido = false;
			$scope.errorPlantacion = false;
			$scope.errorCosecha = false;

			$scope.parcela = {
				'pcl_alias':"",
				'pcl_localidad':"",
				'pcl_latitud':"",
				'pcl_longitud':"",
				'pcl_fecha_plantacion' : "",
				'pcl_ejido': "",
				'pcl_largo':'',
				'pcl_ancho':'',
				'pcl_hectareas':'',
				'pcl_primera_cosecha':""
			};

			 if (frmParcela) {
      			frmParcela.$setPristine();
      			frmParcela.$setUntouched();
    		}
		}

	}]);
