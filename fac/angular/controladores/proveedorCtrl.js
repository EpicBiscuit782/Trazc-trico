var app = angular.module('coeplimApp.proveedorCtrl', []);

	app.controller('proveedorCtrl', ['$scope','$http', '$routeParams', 'Proveedores', 'Notification', function($scope,$http,$routeParams,Proveedores,Notification){

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
		$scope.proveedor = {direccion_elect:""};
		$scope.buscar = true;
		$scope.error = false;
		$scope.creando = false;
        $scope.eviPrev = [];

        $scope.eviUpload = function(event){
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
			$scope.proveedor = {direccion_elect:""};
		}
		else{
			Proveedores.buscar(id).then(function(){

				$scope.creando = true;
				$scope.buscar = false;
				$scope.proveedor = Proveedores.proveedores[0];
				//console.log($scope.proveedor);


				if ($scope.proveedor == undefined) {

					window.location = '#/proveedores';
					return;
				}


			});
		}



		$scope.guardarProveedor = function( proveedor ){

			if ($scope.creando) { //new
                
                var uploadForm = new FormData();
                angular.forEach($scope.filesEvi, function(file){
                    uploadForm.append('fileEvi[]', file);
                });
                        
				var data = JSON.stringify($scope.proveedor);
                uploadForm.append('data', data);                                                
                
				Proveedores.guardar( uploadForm ).then( function(){
                    $scope.guardando = true;
				    if (Proveedores.err) {
				        $scope.guardando = false;
				        Notification.error({
				            message: 'Ocurrió un error.',
				            title: 'El proveedor no se registró correctamente. Por favor inténtelo nuevamente.',
				            delay: 3000
				        });
				        $scope.$apply();
				    } else {
				        $scope.guardando = false;
				        Notification.success({
				            message: 'El proveedor se registró correctamente.',
				            delay: 3000
				        });
				        window.location = '#/proveedores';
				    }
			});
			}else{ //update
                
                var uploadForm = new FormData();
                angular.forEach($scope.filesEvi, function(file){
                    uploadForm.append('fileEvi[]', file);
                });
                        
				var data = JSON.stringify($scope.proveedor);
                uploadForm.append('data', data); 
                
				Proveedores.guardar( uploadForm ).then( function(){
                    $scope.guardando = true;
				    if (Proveedores.err) {
				        $scope.guardando = false;
				        Notification.error({
				            message: 'Ocurrió un error.',
				            title: 'el proveedor no se registró correctamente. Por favor inténtelo nuevamente.',
				            delay: 3000
				        });
				        $scope.$apply();
				    } else {
				        $scope.guardando = false;
				        Notification.success({
				            message: 'El proveedor se registró correctamente.',
				            delay: 3000
				        });
				        window.location = '#/proveedores';
				    }
			});
			}

		}

		$scope.reset = function(frmProv){
			$scope.buscar = true;
			$scope.error = false;
			$scope.proveedor = {
				empresa:"",
				localizacion:"",
				telefono:"",
				direccion_elect:"",
                certificacion:""
			};
			 if (frmProv) {
      			frmProv.$setPristine();
      			frmProv.$setUntouched();
    		}
		}

	}]);
