var app = angular.module('coeplimApp.cosechaCtrl', []);

	app.controller('cosechaCtrl', ['$scope','$http', 'Compradores','Ctl_gastos','Gastos','Cosecha', 'Venta','Notification', function($scope,$http,Compradores,Ctl_gastos,Gastos,Cosecha,Venta,Notification){

        
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
        
        
		$scope.error = false;
		$scope.errorParc = false;
		$scope.errorCost = false;
		$scope.errorKilos = false;
		$scope.errorRejas = false;
		$scope.errorrPrecio = false;
		$scope.errorkPrecio = false;
		$scope.errorFecha = false;
		$scope.errorComp = false;
		$scope.errorGasto = false;
        $scope.vtatotal = 0;

		$scope.guardado = false;
		$scope.guardando = false;

		$scope.cosecha = {
			'fecha': "",
			'total': 0.0,
			detalle:[]

		};

		$scope.gastos = {};

		/**********************
			CARGAR COMBO COMPRADOR
		***********************/

		$scope.comp = {};
		//console.log(Compradores);
		Compradores.all().then(function(){
			$scope.comp = Compradores;
			//console.log($scope.comp);
		});

		/*******************
			CARGAR COMBO COSECHA
		********************/

		$scope.cboCosecha = {};

		Ctl_gastos.cbo_cosecha().then(function(){
			$scope.cboCosecha = Ctl_gastos;
			//console.log($scope.cboCosecha);
		});

		/*******************
			Busca Gasto
		********************/
		function buscar(){
			//busca el nombre del gasto
			for (var i = 0; i < $scope.cboCosecha.ctl_gastos.length; i++) {
				//console.log($scope.cboCosecha.ctl_gastos[i]);
				if($scope.gastos.id_ctl_gasto == $scope.cboCosecha.ctl_gastos[i].id_ctl_gasto){
					$scope.gastos.ctl_descripcion = $scope.cboCosecha.ctl_gastos[i].ctl_descripcion;
					break;
				}
			}
		}


		//*******************************************
		//	AGREGAR DETALLE
		//*******************************************
		$scope.detalle = [];
		$scope.total = 0;
		$scope.buscarGasto = function( gasto ){

			$scope.encontrado = false;

			if( gasto.id_ctl_gasto == "" || gasto.id_ctl_gasto == undefined ){
				return;
			}

			if (isNaN($scope.gastos.dt_precio) != true && $scope.gastos.dt_precio > 0) {

			//buscar que no este repetido
				for (var i = 0; i < $scope.detalle.length; i++) {
					//$scope.detalle[i]
					if ($scope.gastos.id_ctl_gasto == $scope.detalle[i].id_ctl_gasto) {
						$scope.encontrado = true;
					}
				}

			if(!$scope.encontrado){

					buscar();
					$scope.encontrado = false;
					$scope.detalle.push(gasto);
					$scope.total += parseFloat(gasto.dt_precio);
					$scope.gastos = {};
					$scope.cosecha.detalle = $scope.detalle;

			}
			else {
				setTimeout(function(){
					$scope.encontrado = false;
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
        
    $scope.venta_total = function() {

        if ($scope.cosecha.kilos != undefined && $scope.cosecha.kprecio != undefined) { 
            $scope.vtatotal = 0;
            $scope.vtatotal = parseFloat($scope.cosecha.kprecio) * parseFloat($scope.cosecha.kilos);
        }
                
        else if ($scope.cosecha.rprecio != undefined && $scope.cosecha.rejas != undefined) {
            $scope.vtatotal = 0;
            $scope.vtatotal = parseFloat($scope.cosecha.rprecio) * parseFloat($scope.cosecha.rejas);
        } 
    };

        

	/**************
			GUARDAR
	 *************/


	$scope.guardar = function(cosecha){

		if ($scope.dataParcela.alias != "Parcela") {

			if (angular.isDate($scope.cosecha.fecha)) {

				if (isNaN($scope.cosecha.kilos) != true || $scope.cosecha.kilos > 0 || isNaN($scope.cosecha.rejas) != true || $scope.cosecha.rejas > 0) {

					if (isNaN($scope.cosecha.kprecio) != true || $scope.cosecha.kprecio > 0 || isNaN($scope.cosecha.rprecio) != true || $scope.cosecha.rprecio > 0) {

						if ($scope.cosecha.id_comprador != undefined) {

							if ($scope.detalle.length > 0) {

										// guarda cosecha
										$scope.cosecha.id_parcela = $scope.dataParcela.id;
										$scope.cosecha.total = $scope.vtatotal;
										$scope.cosecha.subtotal = $scope.total;
										$scope.cosecha.detalle = $scope.detalle;
										Cosecha.guardar_cosecha(cosecha).then( function(){
                                            $scope.guardando = true;

											if(Cosecha.err){
                                                $scope.guardando = false;
                                                $scope.guardado = false;
                                                Notification.error({message: 'Ocurrió un error.', title: 'El registro no se registró correctamente. Por favor inténtelo nuevamente.', delay: 3000});
                                                window.location = '#/cosechaGral';
											}
											else {
                                                $scope.guardando = false;
                                                $scope.guardado = true;
                                                Notification.success({message: 'Cosecha registrada correctamente.', delay: 4000});
                                                window.location = '#/cosechaGral';
											}
										});


								}
								else{
									$scope.errorGasto = true;
									setTimeout(function(){
										$scope.errorGasto = false;
										$scope.$apply();
									},5000);
								}
							}
							else {
								$scope.errorComp = true;
								setTimeout(function(){
									$scope.errorComp = false;
									$scope.$apply();
								},5000);
							}
						}
						else{
							$scope.errorrPrecio = true;
							$scope.errorkPrecio = true;
							setTimeout(function(){
								$scope.errorrPrecio = false;
								$scope.errorkPrecio = false;
								$scope.$apply();
							},5000);
						}
					}
					else{
						$scope.errorKilos = true;
						$scope.errorRejas = true;
						setTimeout(function(){
							$scope.errorKilos = false;
							$scope.errorRejas = false;
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
	}
    
    
        $scope.eliminarGasto = function (idx, precio) {
            $scope.detalle.splice(idx, 1);
            $scope.total=$scope.total-precio;
        };
        

		$scope.reset = function(frmCosecha){
			
			$scope.error = false;
			$scope.errorParc = false;
			$scope.errorCost = false;
			$scope.errorKilos = false;
			$scope.errorPrecio = false;
			$scope.errorFecha = false;
			$scope.errorComp = false;
			$scope.errorGasto = false;

			$scope.guardado = false;


			$scope.cosecha = {
				'fecha': "",
				'total': 0.0,
				detalle:[]
			};

			$scope.gastos = {};

			 if (frmCosecha) {
      			frmCosecha.$setPristine();
      			frmCosecha.$setUntouched();
    		}

				$scope.detalle = [];
				$scope.total = 0;
				var x = 0;
		}
	}]);