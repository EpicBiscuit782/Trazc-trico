var app = angular.module('coeplimApp.gastosRepCtrl', []);

	app.controller('gastosRepCtrl', ['$scope','$http', '$routeParams', 'Parcelas', 'Gastos','TipoGasto', 'Productores', 'TipoInsumo', 'Notification', function($scope,$http,$routeParams,Parcelas,Gastos,TipoGasto,Productores,TipoInsumo,Notification){

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
		var pag = 1;

		$scope.actualizado = false;
		$scope.gastosGral = {};
		$scope.total = 0;
        $scope.eliminado = false;

		$scope.moverA = function(pag){
		Gastos.gastosProductor(pag).then(function(){
			$scope.gastosGral = Gastos;
		});
	}
	$scope.moverA(pag);


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
        
                
        $scope.parcelas = {};
        Parcelas.all().then(function(){
            $scope.parcelas = Parcelas.parcelas;
		});
        
        if(! isNaN(id)){
			$scope.gastos = {};
			Gastos.gastoProductor(id).then(function(){
				$scope.gastos = Gastos.gasto;
				if ($scope.gastos == undefined || Gastos.gasto == '') {
					window.location = '#/gastosGral';
					return;
				}

			});

			Gastos.detalleGastosProductor(id).then(function(){
				$scope.detalle = Gastos;

				var total = 0;
				for(var i = 0; i < $scope.detalle.gastos.length; i++){
						var gast = $scope.detalle.gastos[i];
						$scope.total += parseInt(gast.dt_precio);
			}
			});
		}
		else{
			window.location = '#/gastosGral';
			return;
		}
        
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
        
        $scope.eliminarGasto = function (id_det,idx,precio) {
            $scope.detalle.gastos.splice(idx, 1);
            $scope.total=$scope.total-precio;
            
                Gastos.eliminar_gasto(id_det).then( function(){

					if (Gastos.err) {
                        Notification.error({message: 'Ocurrió un error.', title: 'El gasto no se eliminó correctamente. Por favor inténtelo nuevamente.', delay: 3000});
					}
					else {
                        Notification.success({message: 'El gasto se eliminó correctamente.', delay: 3000});
					}
				});
        };
        
 
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
						$scope.detalle.gastos.push(gasto);
						$scope.total += parseFloat(gasto.dt_precio);
						$scope.ban = false;
						$scope.errorCost = false;
						$scope.gastos = {
							'id_tipo_gasto': 0,
							'id_ctl_gasto': 0,
							'dt_precio': ''
						};
						$scope.activ = {};
            
            Gastos.guardar_gasto(gasto).then( function(){

					if (Gastos.err) {
                        Notification.error({message: 'Ocurrió un error.', title: 'El gasto no se registró correctamente. Por favor inténtelo nuevamente.', delay: 3000});
					}
					else {
                        Notification.success({message: 'El gasto se registró correctamente.', delay: 3000});
					}

				});
                
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
    
        $scope.eliminarConfirm = function () {
            $scope.eliminando = true;
            $scope.nTitle = "¿Realmente quiere eliminar los gastos?";
            $scope.nTitle2 = "Los datos se eliminarán para siempre";
            Notification.success({message: "Datos de los gastos a eliminar:", templateUrl: "custom_template.html", scope: $scope, delay: null, closeOnClick: false, positionX: "right", positionY: "bottom",replaceMessage:true});
        };
        
        $scope.close_noti = function () {
            $scope.eliminando = false;
            Notification.clearAll();
        };
        
        
        $scope.eliminarGastos = function () {
        if(! isNaN(id)){
            Gastos.eliminar_gastos(id).then(function () {
                if (Gastos.err) {
                    $scope.error = true;
                    Notification.error({message: 'No es posible eliminar el registro, por favor inténtelo nuevamente.', title: 'Ocurrió un error', delay: 2000});

                    window.location = '#/gastosGral';
                }
                else {
                    $scope.eliminado = true;
                    Notification.clearAll();
                    Notification.success({message: 'Gasto eliminado correctamente.', title: 'Registro borrado', delay: 3000});
                    
                    window.location = '#/gastosGral';

                }
            })

        }else{
			window.location = '#/gastosGral';
			return;
		}
        };

	}]);
