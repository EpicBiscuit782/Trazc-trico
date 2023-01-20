var app = angular.module('coeplimApp.manejoCtrl', []);

	app.controller('manejoCtrl', ['$scope','$http','$routeParams', 'Manejo', 'TipoInsumo', 'TipoEnfermedad', 'Enfermedad', 'Responsable', 'Notification', function($scope,$http,$routeParams,Manejo,TipoInsumo,TipoEnfermedad,Enfermedad,Responsable,Notification){

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
        
		$scope.guardado = false;
		$scope.guardando = false;
		$scope.buscar = true;

		$scope.manejo = {};

		$scope.integral = {};

		$scope.fechas = {
			hoy: "",
			inicio: "",
			fin: "",
			siguiente : "",
			fecha_aplicacion : ""
		}


		$scope.errorDosis = false;
		$scope.errorAgua = false;
		$scope.error = false;
		$scope.errorInsumo = false;
		$scope.errorReja = false;
		$scope.errorMetodo = false;
		$scope.errorMedida = false;

		$scope.errorParc = false;
		$scope.errorFecha = false;
		$scope.errorResp = false;
		$scope.errorSig = false;
		$scope.errorFin = false;
		$scope.errorInicio = false;
		$scope.errorFecha_aplicacion = false;
		$scope.errorEnferm = false;


		$scope.tipo_insumos = {};

		/*  carga combo tipo insumos */

		TipoInsumo.all().then(function(){
			$scope.tipo_insumos = TipoInsumo;
		});


		/**
			CARGAR COMBO CATALOGO INSUMOS
		*/

		$scope.getInsumos = function(parametro){

			$scope.insumos = {};
			TipoInsumo.categoria(parametro).then(function(){
			$scope.insumos = TipoInsumo;
			});
		}

		/*  carga combo tipo enfermedad */

		TipoEnfermedad.all().then(function(){
			$scope.tipo_enfermedad = TipoEnfermedad;
		});

		/**
			CARGAR COMBO CATALOGO ENFERMEDADES
		*/

		
		$scope.getEnfermedades = function(parametro){
			$scope.enfermedades = {};
			Enfermedad.tipos(parametro).then(function(){
			$scope.enfermedades = Enfermedad;
			});
		}

		/*  carga combo responsable */
		$scope.responsables ={};

		Responsable.all().then(function(){
			$scope.responsables = Responsable;
		});
        
            $scope.getRecomendados = function (id) {
                $scope.insumos_reco = {};
                Enfermedad.buscar_reco(id).then(function () {
                    $scope.insumos_reco = Enfermedad.recomendados;
                });
            };


		function buscar(){
			//busca el nombre del insumo
			for (var i = 0; i < $scope.insumos.insumos.length; i++) {
				if($scope.manejo.id_insumo == $scope.insumos.insumos[i].id_insumo){
					$scope.manejo.nombre_com = $scope.insumos.insumos[i].nombre_com;
				}
			}
		}

		//*******************************************
		//	AGREGAR DETALLE
		//*******************************************
		$scope.detalle = [];
		var x = 0;
		var cant = 0;
		$scope.agregar = function( manejo ){

			$scope.encontrado = false;

					if (isNaN($scope.manejo.dosis) != true && $scope.manejo.dosis > 0) {

							if (isNaN($scope.manejo.agua) != true && $scope.manejo.agua > 0) {

								if ($scope.manejo.id_insumo != undefined) {

									if ($scope.manejo.metodo != undefined) {

										if ($scope.manejo.medida != undefined) {

												//buscar
												for (var i = 0; i < $scope.detalle.length; i++) {
													if ($scope.manejo.id_insumo == $scope.detalle[i].id_insumo) {
														$scope.encontrado = true;
														break;
													}
												}

												if (!$scope.encontrado) {

													buscar(); //busca el insumo seleccionado para traer su nombre
													$scope.detalle.push(manejo);

													$scope.manejo = {};
													$scope.enfermedades = {};
													$scope.insumos = {};
														
													$scope.errorMetodo = false;
													$scope.errorDosis = false;
													$scope.errorAgua = false;
													$scope.errorInsumo = false;

												}
												else{
													setTimeout(function(){
														$scope.encontrado = false;
														$scope.$apply();
													},5000);
												}

											}
											else{
												$scope.errorMedida = true;
												setTimeout(function(){
													$scope.errorMedida = false;
													$scope.$apply();
												},5000);
											}


											}
											else{
												$scope.errorMetodo = true;
												setTimeout(function(){
													$scope.errorMetodo = false;
													$scope.$apply();
												},5000);
											}
										}
									else {
											$scope.errorInsumo = true;
											setTimeout(function(){
												$scope.errorInsumo = false;
												$scope.$apply();
											},5000);
										}
								}
							 else{
								$scope.errorAgua = true;
								setTimeout(function(){
									$scope.errorAgua = false;
									$scope.$apply();
								},5000);
							 }
						}
						else{
								$scope.errorDosis = true;
								setTimeout(function(){
									$scope.errorDosis = false;
									$scope.$apply();
								},5000);
							}


		}// FIN DETALLE

		$scope.guardarManejo = function(manejo){


			if ($scope.dataParcela.alias != "Parcela") {

				if (angular.isDate($scope.fechas.hoy)) {

					if ($scope.integral.id_enfermedad != undefined) {

						if (angular.isDate($scope.fechas.inicio)) {
                            
						  if (angular.isDate($scope.fechas.fecha_aplicacion)) {

							if (angular.isDate($scope.fechas.fin)) {

								if (angular.isDate($scope.fechas.siguiente)) {

									if ($scope.integral.id_responsable != undefined) {
									
										if ($scope.detalle.length > 0) {

											$scope.manejo.id_parcela = $scope.dataParcela.id;
											$scope.manejo.fecha = $scope.fechas.hoy;
											$scope.manejo.inicio = $scope.fechas.inicio;
											$scope.manejo.fecha_aplicacion = $scope.fechas.fecha_aplicacion;
											$scope.manejo.fin = $scope.fechas.fin;
											$scope.manejo.siguiente = $scope.fechas.siguiente;
											$scope.manejo.id_enfermedad = 	$scope.integral.id_enfermedad;
											$scope.manejo.id_responsable = $scope.integral.id_responsable;
											$scope.manejo.detalle = $scope.detalle;

											Manejo.guardar(manejo).then( function(){

                                            $scope.guardando = true;
                                                if (Manejo.err) {
                                                    $scope.guardando = false;
                                                    Notification.error({message: 'Ocurrió un error.', title: 'El manejo no se registró correctamente. Por favor inténtelo nuevamente.', delay: 3000});
                                                    $scope.$apply();
                                                }
                                                else {
                                                    $scope.guardando = false;
                                                    Notification.success({message: 'El manejo se registró correctamente.', delay: 3000});
                                                    window.location = '#/manejos';
                                                    $scope.$apply();
                                                }

											});
			
												$scope.guardado = true;
												$scope.errorParc = false;
												$scope.errorFecha = false;
												$scope.errorResp = false;
												$scope.errorSig = false;
												$scope.errorFin = false;
												$scope.errorInicio = false;
												$scope.errorFecha_aplicacion = false;
												$scope.errorEnferm = false;
											
										}
											else {
												$scope.errorReja = true;
												setTimeout(function(){
													$scope.errorReja = false;
													$scope.$apply();
												},5000);
											}

																
														}
														else{
															$scope.errorResp = true;
															setTimeout(function(){
																$scope.errorResp = false;
																$scope.$apply();
															},5000);
														}
												}
												else {
													$scope.errorSig = true;
													setTimeout(function(){
														$scope.errorSig = false;
														$scope.$apply();
													},5000);
												}
										}
										else {
											$scope.errorFin = true;
											setTimeout(function(){
												$scope.errorFin = false;
												$scope.$apply();
											},5000);
										}
								}
								else{
									$scope.errorFecha_aplicacion = true;
									setTimeout(function(){
										$scope.errorFecha_aplicacion = false;
										$scope.$apply();
									},5000);
								}
                            }
				            else{
								$scope.errorInicio = true;
								setTimeout(function(){
								    $scope.errorInicio = false;
								    $scope.$apply();
								},5000);
				            }
						}
						else {
							$scope.errorEnferm = true;
							setTimeout(function(){
								$scope.errorEnferm = false;
								$scope.$apply();
							},5000);
						}
				  }
					else{
						$scope.errorFecha = true;
						setTimeout(function(){
							$scope.errorFecha = false;
							$scope.$apply();
						},5000);
					}

			}
			else{
					$scope.errorParc = true;
					setTimeout(function(){
						$scope.errorParc = false;
						$scope.$apply();
					},5000);
			}


		}// fin metodo



		$scope.reset = function(frmManejo){

			$scope.manejo = {};
			$scope.enfermedades = {};
			$scope.insumos = {};

			$scope.detalle = [];

			

			$scope.integral = {};

			$scope.fechas = {
				hoy: "",
				inicio: "",
				fin: "",
				siguiente : "",
				fecha_aplicacion : ""
			};

			 if (frmManejo) {
      			frmManejo.$setPristine();
      			frmManejo.$setUntouched();
    		};
		}

	}]);