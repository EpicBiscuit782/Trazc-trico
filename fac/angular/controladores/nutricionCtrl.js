var app = angular.module('coeplimApp.nutricionCtrl', []);

	app.controller('nutricionCtrl', ['$scope','$http', 'Nutricion', 'TipoInsumo','Insumos', 'Notification', function($scope,$http,Nutricion,TipoInsumo,Insumos,Notification){

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
		$scope.tipo = 'FOLIAR';
		$scope.nutricion = {};

		$scope.Bsuelo = false;
		$scope.errorParc = false;
		$scope.errorCant = false;
		$scope.errorPlant = false;
		$scope.error = false;
		$scope.errorInsumo = false;
		$scope.errorFecha = false;
		$scope.errorRejilla = false;
		$scope.errorMetodo = false;


		$scope.show = function(){
			if($scope.tipo == 'SUELO'){
				$scope.Bsuelo = true;
				$scope.detalle = [];
			}
			else{
				$scope.Bsuelo = false;
				$scope.detalle = [];
			}
		}

		/*  carga combo tipo insumos */
		$scope.tipo_insumos = {};
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

		function buscar(){
			for (var i = 0; i < $scope.insumos.insumos.length; i++) {
				if($scope.nutricion.id_insumo == $scope.insumos.insumos[i].id_insumo){
					$scope.nutricion.nombre_com = $scope.insumos.insumos[i].nombre_com;
				}
			}
		}

		//*******************************************
		//	AGREGAR DETALLE
		//*******************************************
		$scope.detalle = [];
		//console.log($scope.detalle.length)
		var x = 0;
		var cant = 0;
		$scope.agregar = function( nutricion ){

				$scope.encontrado = false;

				if ($scope.tipo == 'SUELO') {

					if (isNaN($scope.nutricion.cantidad) != true && $scope.nutricion.cantidad > 0) {

							if (isNaN($scope.nutricion.cant_planta) != true && $scope.nutricion.cant_planta > 0) {

								if ($scope.nutricion.id_insumo != undefined) {

									if ($scope.nutricion.medida != undefined) {

										if ($scope.nutricion.metodo != undefined) {

													for (var i = 0; i < $scope.detalle.length; i++) {
														if ($scope.nutricion.id_insumo == $scope.detalle[i].id_insumo) {
															$scope.encontrado = true;
															break;
														}
													}

													if (!$scope.encontrado) {

														buscar();
															$scope.detalle.push(nutricion);

															$scope.nutricion = {};
															$scope.insumos = {};

															$scope.errorCant = false;
															$scope.errorPlanta = false;
															$scope.errorMedida = false;
															$scope.errorInsumo = false;
															$scope.error = false;
															$scope.errorMetodo = false;
													}
													else{
														setTimeout(function(){
															$scope.encontrado = false;
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
												$scope.errorMedida = true;
												setTimeout(function(){
													$scope.errorMedida = false;
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
								$scope.errorPlanta = true;
								setTimeout(function(){
									$scope.errorPlanta = false;
									$scope.$apply();
								},5000);
							}
						}else{
								$scope.errorCant = true;
								setTimeout(function(){
									$scope.errorCant = false;
									$scope.$apply();
								},5000);
							}

					}
					else if($scope.tipo == 'FOLIAR'){
						if (isNaN($scope.nutricion.cantidad) != true && $scope.nutricion.cantidad > 0) {

									if ($scope.nutricion.id_insumo != undefined) {

										if ($scope.nutricion.medida != undefined) {

												for (var i = 0; i < $scope.detalle.length; i++) {
													if ($scope.nutricion.id_insumo == $scope.detalle[i].id_insumo) {
														$scope.encontrado = true;
														break;
													}
												}

												if (!$scope.encontrado) {

														buscar(); //busca el insumo seleccionado para traer su nombre

														$scope.detalle.push(nutricion);

													$scope.nutricion = {};
													$scope.insumos = {};

													$scope.errorCant = false;
													$scope.errorMedida = false;
													$scope.errorInsumo = false;
													$scope.error = false;
											 }
											else{
												setTimeout(function(){
													$scope.encontrado = false;
													$scope.$apply();
												},5000);
											}

										}
										else {
											$scope.errorMedida = true;
											setTimeout(function(){
												$scope.errorMedida = false;
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
								$scope.errorCant = true;
								setTimeout(function(){
									$scope.errorCant = false;
									$scope.$apply();
								},5000);
							}

					}//FIN TIPO APLICACION
					else {
							$scope.error = true; // por si no a seleccionada foliar o al suelo
							setTimeout(function(){
								$scope.error = false;
								$scope.$apply();
							},5000);
					}

	}// FIN DETALLE


		$scope.guardarNutricion = function(nutricion){


			if ($scope.dataParcela.alias != "Parcela") {

				if (angular.isDate($scope.hoy)){

					if ($scope.detalle.length > 0) {

							$scope.nutricion.id_parcela = $scope.dataParcela.id;
							$scope.nutricion.fecha = $scope.hoy;
							$scope.nutricion.tipo = $scope.tipo;
							$scope.nutricion.detalle = $scope.detalle;
							
							Nutricion.guardar(nutricion).then( function(){

                                $scope.guardando = true;
                                if (Nutricion.err) {
                                    $scope.guardando = false;
                                    Notification.error({message: 'Ocurrió un error.', title: 'La aplicación no se registró correctamente. Por favor inténtelo nuevamente.', delay: 3000});
                                }
                                else {
                                    $scope.guardando = false;
                                    Notification.success({message: 'La aplicación se registró correctamente.', delay: 3000});
                                    window.location = '#/nutricions';
                                }
							});

								
					 }
					 else {
					 	$scope.errorRejilla = true;
						setTimeout(function(){
							$scope.errorRejilla = false;
							$scope.$apply();
						},5000);
					 }
				 }
				 else {
				 	$scope.errorFecha = true;
					setTimeout(function(){
						$scope.errorFecha = false;
						$scope.$apply();
					},5000);
				 }

			}else{
					$scope.errorParc = true;
					setTimeout(function(){
						$scope.errorParc = false;
						$scope.$apply();
					},5000);
			}
		}// fin metodo




		$scope.reset = function(frmNutricion){
			$scope.tipo = 'FOLIAR';
			$scope.nutricion = {
				'cantidad': '',
				'cant_planta':'',
				'detalle': []
			};
			$scope.insumos = {};

			$scope.hoy = "";
			$scope.detalle = [];

			$scope.Bsuelo = false; // saber si es foliar o al suelo
			$scope.errorParc = false;
			$scope.errorCant = false;
			$scope.errorPlant = false;
			$scope.error = false;
			$scope.errorInsumo = false;
			$scope.errorFecha = false;
			$scope.errorRejilla = false;
			$scope.errorMetodo = false;


			 if (frmNutricion) {
      			frmNutricion.$setPristine();
      			frmNutricion.$setUntouched();
    		}
		}

	}]);