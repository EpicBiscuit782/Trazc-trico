var app = angular.module('coeplimApp.GastosCtrl', []);

	app.controller('GastosCtrl', ['$scope','$http', 'TipoGasto', 'Gastos', 'TipoInsumo', 'Notification', function($scope,$http,TipoGasto, Gastos, TipoInsumo, Notification){
             
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
        $scope.gastos = {
			'id_tipo_gasto': 0,
			'id_ctl_gasto': 0,
			'dt_precio': ''
		};
		
		$scope.guardado = false;
		$scope.ban = true;
		$scope.error = false;
		$scope.errorParc = false;
		$scope.errorCost = false;
		$scope.errorFecha = false;
        $scope.aplicacion = false; 
        $scope.guardando = false; 

		$scope.tipo_gast = {};

		TipoGasto.sinCosecha().then(function(){
			$scope.tipo_gast = TipoGasto;
		});

		$scope.cargaTipo = function(parametro){
			$scope.activ = {};
			TipoGasto.tipos(parametro).then(function(){
				$scope.activ = TipoGasto;
			});
		}
        
        TipoInsumo.all().then(function(){
			$scope.tipo_insumo = TipoInsumo;
		});

		/*
			Busca Gasto
		*/
		function buscar(){
			for (var i = 0; i < $scope.activ.actividades.length; i++) {
				if($scope.gastos.id_ctl_gasto == $scope.activ.actividades[i].id_ctl_gasto){
					$scope.gastos.ctl_descripcion = $scope.activ.actividades[i].ctl_descripcion;
					break;
				}
			}
		}
        
        $scope.setInsumo = function( id_ctl_gasto ){
            if(id_ctl_gasto==11){
                $scope.aplicacion = true; 
            }
            else{
                 $scope.aplicacion = false; 
            }
        };
        
        $scope.eliminarGasto = function (idx, precio) {
            $scope.detalle.splice(idx, 1);
            $scope.total=$scope.total-precio;
        };

		//*******************************************
		//	AGREGAR DETALLE
		//*******************************************
		$scope.detalle = [];
		//console.log($scope.detalle.length)
		$scope.total = 0;
		var x = 0;

		$scope.buscarGasto = function( gasto ){
			$scope.encontrado = false;

		if( gasto.id_ctl_gasto == "" ){
			return;
		}

		if (isNaN($scope.gastos.dt_precio) != true && $scope.gastos.dt_precio > 0) {
			for (var i = 0; i < $scope.detalle.length; i++) {
				if ($scope.gastos.id_ctl_gasto == $scope.detalle[i].id_ctl_gasto) {
					$scope.encontrado = true;
				}
			}

			if(!$scope.encontrado){
					buscar();
						$scope.encontrado = false;
						$scope.detalle.push(gasto);
						$scope.total += parseFloat(gasto.dt_precio);
						$scope.ban = false;
						$scope.errorCost = false;
						$scope.gastos = {
							'id_tipo_gasto': 0,
							'id_ctl_gasto': 0,
							'dt_precio': ''
						};
						$scope.activ = {};
			}
			else{
				setTimeout(function(){
					$scope.encontrado = false;
					$scope.$apply();
				},2000);
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

        $scope.guardarGastos = function(gastos){

		if ($scope.dataParcela.id != 0) {

			if (angular.isDate($scope.hoy)){

				$scope.gastos.id_parcela = $scope.dataParcela.id;
				$scope.gastos.fecha = $scope.hoy;
				$scope.gastos.subtotal = $scope.total;
				$scope.gastos.detalle = $scope.detalle;
						
						
				Gastos.guardar_gastos(gastos).then( function(){
                    $scope.guardando = true;

					if (Gastos.err) {
                        $scope.guardando = false;
                        Notification.error({message: 'Ocurrió un error.', title: 'El registro no se registró correctamente. Por favor inténtelo nuevamente.', delay: 3000});
					}
					else {
                        $scope.guardando = false;
                        Notification.success({message: 'El gasto se registró correctamente.', delay: 3000});
                        window.location = '#/gastosGral';
					}

				});

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


		$scope.reset = function(frmGastos){

			$scope.gastos = {
			'id_tipo_gasto': 0,
			'id_ctl_gasto': 0,
			'dt_precio': '',
			'subtotal':0
		};
		$scope.activ = {};

	
		$scope.hoy = "";
		$scope.guardado = false;
		$scope.guardando = false;
		$scope.ban = true;
		$scope.error = false;
		$scope.errorParc = false;
		$scope.errorCost = false;
		$scope.errorFecha = false;

		$scope.detalle = [];
		$scope.total = 0;
		var x = 0;
			 if (frmGastos) {
      			frmGastos.$setPristine();
      			frmGastos.$setUntouched();
    		}
		}

	}]);