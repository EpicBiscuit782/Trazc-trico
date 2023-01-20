var app = angular.module('coeplimApp.detalle_cosechaCtrl', ['mgcrea.ngStrap']);

	app.controller('detalle_cosechaCtrl', ['$scope','$http', '$routeParams','Notification', 'Cosecha','Compradores', 'Ctl_gastos','Parcelas', function($scope,$http,$routeParams,Notification,Cosecha,Compradores,Ctl_gastos,Parcelas){
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
        
        $scope.error = false;
		$scope.errorParc = false;
		$scope.errorCost = false;
		$scope.errorFecha = false;
		$scope.errorComp = false;
		$scope.errorGasto = false;
		$scope.guardado = false;
		$scope.eliminando = false;
		$scope.editando = false;


		$scope.gastos = {};
        $scope.cosecha = {};
        $scope.vtatotal = 0;
        $scope.total = 0;
        
        $scope.comp = {};
		Compradores.all().then(function(){
			$scope.comp = Compradores;
		});
        		
        $scope.cboCosecha = {};
		Ctl_gastos.cbo_cosecha().then(function(){
			$scope.cboCosecha = Ctl_gastos;
		});
        
                
        $scope.parcelas = {};
        Parcelas.all().then(function(){
            $scope.parcelas = Parcelas.parcelas;
		});
        
        
        function buscar(){
			for (var i = 0; i < $scope.cboCosecha.ctl_gastos.length; i++) {
				if($scope.gastos.id_ctl_gasto == $scope.cboCosecha.ctl_gastos[i].id_ctl_gasto){
					$scope.gastos.ctl_descripcion = $scope.cboCosecha.ctl_gastos[i].ctl_descripcion;
					break;
				}
			}
		}
        
        if(! isNaN(id) ){
  		Cosecha.getCosecha(id).then(function(){
  			$scope.cosecha = Cosecha.produccion;
  			$scope.detalle = Cosecha.gastosCosec;
            var fecha = $scope.cosecha.pdc_fecha.split("-");
            $scope.cosecha.pdc_fecha = new Date(fecha[0],fecha[1]-1,fecha[2]);
  			
  			for (var i = 0; i < $scope.detalle.length; i++) {
					$scope.total += parseFloat($scope.detalle[i].dt_precio);
					$scope.gastos.id_gasto = $scope.cosecha.id_gasto;
				}

		        if ($scope.cosecha.pdc_kilos != "0") {
		            $scope.vtatotal = parseFloat($scope.cosecha.vt_precio_kg) * parseFloat($scope.cosecha.pdc_kilos);
		        }
		        else {
		          $scope.vtatotal = parseFloat($scope.cosecha.vt_precio_reja) * parseFloat($scope.cosecha.pdc_rejas);
		        }

				if ($scope.cosecha == undefined || Cosecha.produccion == '') {
					window.location = '#/cosechaGral';
					return;
				}

  		});

		}
		else{
			window.location = '#/cosechaGral';
			return;
		}
        
        $scope.venta_total = function() {
            if ($scope.cosecha.pdc_kilos != undefined && $scope.cosecha.vt_precio_kg != undefined) {
                $scope.vtatotal = parseFloat($scope.cosecha.vt_precio_kg) * parseFloat($scope.cosecha.pdc_kilos);
            }
            else if ($scope.cosecha.pdc_rejas != undefined && $scope.cosecha.vt_precio_reja != undefined) {
                $scope.vtatotal = parseFloat($scope.cosecha.vt_precio_reja) * parseFloat($scope.cosecha.pdc_rejas);
            }
        };
        
        //*******************************************
		//	AGREGAR DETALLE
		//*******************************************
		$scope.detalle = [];
		$scope.buscarGasto = function( gasto ){

			$scope.encontrado = false;

			if( gasto.id_ctl_gasto == "" || gasto.id_ctl_gasto == undefined ){
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
					$scope.gastos = {};
					$scope.cosecha.detalle = $scope.detalle;
                
                                
                Cosecha.editar_gasto(gasto).then(function () { 
                if (Cosecha.err) {
                    Notification.error({message: 'No es posible registrar el gasto, por favor inténtelo nuevamente.', title: 'Ocurrió un error', delay: 2000});
                }
                else {
                    Notification.clearAll();
                    Notification.success({message: 'Gasto registrado correctamente.', title: 'Registro insertado', delay: 3000});
                }
                });

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
        
    $scope.editarCosecha = function (cosecha) {

        $scope.cosecha.id_parcela = $scope.cosecha.id_parcela;
        $scope.cosecha.total = $scope.vtatotal;
        $scope.cosecha.subtotal = $scope.total;
        $scope.cosecha.total = $scope.vtatotal;
        Cosecha.editar_cosecha(cosecha).then(function () {
        $scope.editando = true;

            if (Cosecha.err) {
                
                Notification.error({message: 'Ocurrió un error.', title: 'El registro no se editó correctamente.', delay: 3000});
            }
            else {
                $scope.editando = false;
                Notification.success({message: 'Registro editado correctamente.', delay: 4000});
                
                window.location = '#/cosechaGral';

            }

        });
    }
        
        $scope.eliminarGasto = function (id_gasto, id, precio) {
            Cosecha.eliminar_det_gasto(id_gasto).then(function () {
                if (Cosecha.err) {
                    Notification.error({message: 'Ocurrió un error al borrar el registro. Por favor inténtelo nuevamente.', delay: 4000});
                }
                else {
                    $scope.detalle.splice(id, 1);
                    $scope.total = $scope.total - precio;
                    Notification.success({message: 'Registro eliminado correctamente.', delay: 4000});
                }
            });

        };
        
        
        $scope.eliminarConfirm = function () {
            $scope.eliminando = true;
            $scope.nTitle = "¿Realmente quiere eliminar la cosecha?";
            $scope.nTitle2 = "Los datos se eliminarán para siempre";
            Notification.success({message: "Datos de Cosecha a eliminar:", templateUrl: "custom_template.html", scope: $scope, delay: null, closeOnClick: false, positionX: "right", positionY: "bottom",replaceMessage:true});
        };
        
        $scope.close_noti = function () {
            $scope.eliminando = false;
            Notification.clearAll();
        };
        
        
        $scope.eliminarCosecha = function (cosecha) {
            Cosecha.eliminar_cosecha(cosecha).then(function () {
                if (Cosecha.err) {
                    $scope.error = true;
                    Notification.error({message: 'No es posible eliminar el registro, por favor inténtelo nuevamente.', title: 'Ocurrió un error', delay: 2000});

                    window.location = '#/cosechaGral';
                }
                else {
                    $scope.eliminado = true;
                    Notification.clearAll();
                    Notification.success({message: 'Cosecha eliminada correctamente.', title: 'Registro borrado', delay: 3000});
                    
                    window.location = '#/cosechaGral';

                }
            });
        };
        
        
	}]);