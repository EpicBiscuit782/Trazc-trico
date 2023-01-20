var app = angular.module('coeplimApp.riegoCtrl', []);

	app.controller('riegoCtrl', ['$scope','$http', 'Riego','Notification', function($scope,$http,Riego,Notification){

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
        
		$scope.riego = {};


		//$scope.hoy = new Date();
		$scope.guardado = false;
		$scope.guardando = false;
        $scope.buscar = true;
		$scope.ban = true;
		$scope.error = false;
		$scope.errorParc = false;
		$scope.errorCant = false;
		$scope.errorCost = false;
		$scope.errorTipo = false;
		$scope.errorFecha = false;

		/*
			NEW RIEGO
		*/



		//*******************************************
		//	AGREGAR DETALLE
		//*******************************************
		$scope.detalle = [];
		//console.log($scope.detalle.length)
		$scope.total = 0;
		$scope.total_costo = 0;
		var x = 0;
		var cant = 0;
		$scope.agregar = function( riego ){

			$scope.encontrado = false;

		if ($scope.dataParcela.alias != "Parcela") {

			if (isNaN($scope.riego.cantidad) != true && $scope.riego.cantidad > 0) {

					if (isNaN($scope.riego.costo) != true && $scope.riego.costo > 0) {

						if ($scope.riego.tipo_riego != undefined) {

										$scope.riego.alias = $scope.dataParcela.alias;
										$scope.riego.id_parcela = $scope.dataParcela.id;

										//buscar
										for (var i = 0; i < $scope.detalle.length; i++) {
											if ($scope.riego.id_parcela == $scope.detalle[i].id_parcela) {
												$scope.encontrado = true;
												break;
											}
										}

										if (!$scope.encontrado) {
											$scope.detalle.push(riego);

											$scope.total += parseFloat($scope.riego.cantidad);
											$scope.total_costo += parseFloat($scope.riego.costo);
											$scope.riego = {
											};

											$scope.ban = false;
											$scope.errorParc = false;
											$scope.errorCant = false;
											$scope.errorCost = false;
											$scope.errorTipo = false;
										}
										else{
											setTimeout(function(){
												$scope.encontrado = false;
												$scope.$apply();
											},3000);
										}
							}
							else {
								$scope.errorTipo = true;
								setTimeout(function(){
									$scope.errorTipo = false;
									$scope.$apply();
								},5000);
							}

					}
					else{
						$scope.errorCost = true;
						setTimeout(function(){
							$scope.errorCost = false;
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
		}
		else{
			$scope.errorParc = true;
			setTimeout(function(){
				$scope.errorParc = false;
				$scope.$apply();
			},5000);

		}



	}



	/*
		GUARDAR RIEGO
	 */

		$scope.guardarRiego = function(riego){

			if (angular.isDate($scope.hoy)){


				$scope.riego.fecha = $scope.hoy;
				$scope.riego.total = $scope.total;
				$scope.riego.detalle = $scope.detalle;

				
				Riego.guardar_riegos(riego).then(function () {
				    $scope.guardando = true;
				    if (Riego.err) {
				        $scope.guardando = false;
				        Notification.error({
				            message: 'Ocurrió un error.',
				            title: 'El riego no se registró correctamente. Por favor inténtelo nuevamente.',
				            delay: 3000
				        });
				    } else {
				        $scope.guardando = false;
				        Notification.success({
				            message: 'El riego se registró correctamente.',
				            delay: 3000
				        });
				        window.location = '#/riegos';
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


		$scope.reset = function(frmRiego){
			$scope.riego = {
				'cantidad': '',
				'costo': '',
				'total':0,
				'detalle':[]
			};

			$scope.hoy = "";
			$scope.guardado = false;
			$scope.ban = true;
			$scope.error = false;
			$scope.errorParc = false;
			$scope.errorCant = false;
			$scope.errorCost = false;
			$scope.errorTipo = false;
			$scope.errorFecha = false;

			$scope.total_costo = 0;
			var x = 0;
			var cant = 0;

			$scope.detalle = [];
			$scope.total = 0;

			 if (frmRiego) {
      			frmRiego.$setPristine();
      			frmRiego.$setUntouched();
    		}
		}

	}]);