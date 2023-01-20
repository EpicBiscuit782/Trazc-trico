var app = angular.module('coeplimApp.huertoCtrl', []);

	app.controller('huertoCtrl', ['$scope','$http', '$routeParams', 'Huerto', 'Variedad', 'Portainjerto', 'Responsable', 'Proveedores', 'Notification', function($scope,$http,$routeParams,Huerto,Variedad,Portainjerto,Responsable,Proveedores,Notification){
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
		$scope.borrado = false;
		$scope.buscar = true;
		$scope.error = false;
		$scope.errorParcela = false;
		$scope.guardando = false;

		$scope.huerto = {
		};
		$scope.riego = [{
			tipo : 'GRAVEDAD'
		},
		{
			tipo : 'MICROASPERSION'
		}

	];


		$scope.creando = false;


		/* INSERTAR O ACTUALIZAR */

		if (id == 'new') {
			$scope.creando = true;
			$scope.huerto = {
			};
		}
		else{
			Huerto.buscar(id).then(function(){

				$scope.creando = true;
				$scope.eliminar = true;
				$scope.buscar = false;
				$scope.huerto = Huerto.huerto;
				if ($scope.huerto == undefined || Huerto.huerto == '') {

					window.location = '#/huertos';
					return;
				}
				$scope.dataParcela.id = $scope.huerto.id_parcela;
				$scope.dataParcela.alias = $scope.huerto.pcl_alias;
				var fecha = $scope.huerto.fecha.split("-");
				$scope.huerto.fecha = new Date(fecha[0],fecha[1]-1,fecha[2]);

			});
		}


		$scope.guardarHuerto = function (huerto) {

		    if ($scope.creando) { //new

		        if (angular.isDate(huerto.fecha)) {
		            if ($scope.dataParcela.id != 0) {

		                $scope.huerto.id_parcela = $scope.dataParcela.id;
                        $scope.guardando = true;
		                Huerto.guardar(huerto).then(function () {
                            
                        if (Huerto.err) {
                            Notification.error({message: 'Ocurrió un error.', title: 'El huerto no se insertó correctamente. Por favor inténtelo nuevamente.', delay: 3000});
                            window.location = '#/huertos';
                        }
                        else {
                            Notification.success({message: 'El huerto se insertó correctamente.', delay: 3000});
                            window.location = '#/huertos';
                        }

		                });
		            } else {
		                $scope.errorParcela = true;
		                setTimeout(function () {
		                    $scope.errorParcela = false;
		                    $scope.$apply();
		                }, 4000);
		            }
		        } else {
		            $scope.errorFecha = true;
		            setTimeout(function () {
		                $scope.errorFecha = false;
		                $scope.$apply();
		            }, 4000);
		        }
		    } else { //update

		        $scope.error = true;
		        setTimeout(function () {
		            $scope.error = false;
		            $scope.$apply();
		        }, 2000);

		        setTimeout(function () {
		            window.location = '#/huertos';
		            return;
		            $scope.$apply();
		        }, 1000);
		    }
		}
        
        
        $scope.eliminarHuerto = function (huerto) {

            if ($scope.dataParcela.id != 0) {

                $scope.huerto.id_parcela = $scope.dataParcela.id;

                Huerto.eliminar(huerto).then(function () {
                    
                        if (Huerto.err) {
                            Notification.error({message: 'Ocurrió un error.', title: 'El huerto no se eliminó correctamente. Por favor inténtelo nuevamente.', delay: 3000});
                            window.location = '#/huertos';
                        }
                        else {
                            Notification.success({message: 'El huerto se borró correctamente.', delay: 3000});
                            window.location = '#/huertos';
                        }

                });
            } else {
                $scope.errorParcela = true;
                setTimeout(function () {
                    $scope.errorParcela = false;
                    $scope.$apply();
                }, 4000);
            }

        }

		Variedad.all().then(function(){
			$scope.variedades = Variedad;
		});

		Portainjerto.all().then(function(){
			$scope.portainjertos = Portainjerto;
		});		
        

		Responsable.all().then(function(){
			$scope.responsables = Responsable;
		});		
        

		Proveedores.cbo_proveedor().then(function(){
			$scope.proveedores = Proveedores;
		});


		 $scope.reset = function(frmHuerto){
			 $scope.buscar = true;
	 		$scope.error = false;
			$scope.huerto = {fecha:""};
			$scope.dataParcela.id = 0;
			$scope.dataParcela.alias = "Parcela";
			 if (frmHuerto) {
      			frmHuerto.$setPristine();
      			frmHuerto.$setUntouched();
    		}
		}

	}]);