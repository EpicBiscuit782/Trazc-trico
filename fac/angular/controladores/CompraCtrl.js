var app = angular.module('coeplimApp.CompraCtrl', []);

	app.controller('CompraCtrl', ['$scope','$http', '$routeParams', 'TipoInsumo', 'Compra', 'Proveedores','Responsable','Notification', function($scope,$http,$routeParams,TipoInsumo,Compra,Proveedores,Responsable,Notification){

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
        
		var id = $routeParams.id;

		$scope.actualizado = false;
		$scope.compra = {
			'id_tipo_insumo': 0,
			'id_proveedor': 0,
            'id_responsable': 0,
			'precio': 0,
			'cantidad': 1,
			'cant_insumos':1
		};

		$scope.guardado = false;
		$scope.buscar = true;
		$scope.ban = true;
		$scope.error = false;
		$scope.errorParc = false;
		$scope.errorCost = false;
		$scope.errorCant = false;
		$scope.errorMedida = false;
		$scope.errorInsumos = false;
		$scope.errorInsumo = false;
		$scope.errorFecha = false;
		$scope.errorProv = false;
		$scope.errorEnc = false;
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
		/**
			CARGAR COMBO TIPO INSUMO
		*/

		$scope.tipo_insumo = {};

		TipoInsumo.all().then(function(){
			$scope.tipo_insumo = TipoInsumo;
		});


		/**
			CARGAR COMBO CATALOGO INSUMO
		*/

		$scope.insumo = {};
		$scope.cargaInsumos = function(parametro){
			$scope.insumo = {};
			//console.log(parametro)
			TipoInsumo.categoria(parametro).then(function(){
				$scope.insumo = TipoInsumo;
			});

		}

		/**
			CARGAR COMBO PROVEEDOR
		*/

		$scope.proveedores = {};

		Proveedores.cbo_proveedor().then(function(){
			$scope.proveedores = Proveedores;
		});
        
        /**
			CARGAR COMBO ENCARGADOS
		*/

		$scope.responsables = {};

		Responsable.all().then(function(){
			$scope.responsables = Responsable;
		});

		function buscar(){
			//busca el nombre del insumo
			for (var i = 0; i < $scope.insumo.insumos.length; i++) {
				if($scope.compra.id_insumo == $scope.insumo.insumos[i].id_insumo){
					$scope.compra.nombre_com = $scope.insumo.insumos[i].nombre_com;
				}
			}
		}

		function buscarProveedor(){
			//busca el nombre del proveedor
			for (var i = 0; i < $scope.proveedores.proveedores.length; i++) {
				if($scope.compra.id_proveedor == $scope.proveedores.proveedores[i].id_proveedor){
					$scope.compra.empresa = $scope.proveedores.proveedores[i].empresa;
				}
			}
		}
        
        function buscarResponsable(){
			//busca el nombre del responsable
			for (var i = 0; i < $scope.responsables.responsables.length; i++) {
				if($scope.compra.id_responsable == $scope.responsables.responsables[i].id_responsable){
					$scope.compra.nombre = $scope.responsables.responsables[i].nombre;
				}
			}
		}


		//*******************************************
		//	AGREGAR DETALLE
		//*******************************************
		$scope.detalle = [];
		$scope.total = 0;
		var x = 0;
		var cant = 0;
		$scope.buscarInsumo = function( compra ){

		if( compra.id_tipo_insumo == "" || compra.id_tipo_insumo == 0 ){
			$scope.errorInsumo = true;
			setTimeout(function(){
				$scope.errorInsumo = false;
				$scope.$apply();
			},5000);
			return;
		}
		$scope.encontrado = false;

		if (compra.id_proveedor != 0) {
            if (compra.id_responsable != 0) {

            
			if (isNaN($scope.compra.precio) != true && $scope.compra.precio > 0) {

				if (isNaN($scope.compra.cantidad) != true && $scope.compra.cantidad > 0) {
					if($scope.compra.medida != undefined) {

						if (isNaN($scope.compra.cant_insumos) != true && $scope.compra.cant_insumos > 0) {

							for (var i = 0; i < $scope.detalle.length; i++) {
								if ($scope.compra.id_insumo == $scope.detalle[i].id_insumo) {
									$scope.encontrado = true;
									break;
								}
						}

						if (!$scope.encontrado) {

								buscar();
								buscarProveedor();
								buscarResponsable();

									Compra.agregar_detalle( compra );
									$scope.detalle.push(compra);
									$scope.total += compra.precio * compra.cant_insumos;

									$scope.compra = {
										'id_tipo_insumo': 0,
										'id_proveedor': 0,
										'precio': 0,
										'cantidad': 1,
										'cant_insumos':1
									};

									$scope.insumo = {};

									$scope.ban = false;
									$scope.errorCost = false;
									$scope.errorCant = false;
									$scope.errorMedida = false;
									$scope.errorInsumos = false;
									$scope.errorProv = false;
									$scope.errorEnc = false;
				}
			else {
				setTimeout(function(){
					$scope.encontrado = false;
					$scope.$apply();
				},5000);
			}
			}
			else {
				$scope.errorInsumos = true;
				setTimeout(function(){
					$scope.errorInsumo = false;
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
			else{
				$scope.errorCant = true;
				setTimeout(function(){
					$scope.errorCant = false;
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
			$scope.errorEnc = true;
			setTimeout(function(){
				$scope.errorEnc = false;
				$scope.$apply();
			},5000);
		}
    }
	else{
			$scope.errorProv = true;
			setTimeout(function(){
				$scope.errorProv = false;
				$scope.$apply();
			},5000);
		}


	}



	/*
		GUARDAR COMPRA
	 */

		$scope.guardarCompra = function(compra){

			if (angular.isDate($scope.hoy)) {
			
				$scope.compra.fecha = $scope.hoy;
				$scope.compra.subtotal = $scope.total;
				$scope.compra.detalle = $scope.detalle;
                
                var uploadForm = new FormData();
                angular.forEach($scope.filesEvi, function(file){
                    uploadForm.append('fileEvi[]', file);
                });
                        
				var data = JSON.stringify($scope.compra);
                uploadForm.append('data', data);                                                

				Compra.guardar_compra(uploadForm).then(function () {
				    $scope.guardando = true;
				    if (Compra.err) {
				        $scope.guardando = false;
				        Notification.error({
				            message: 'Ocurrió un error.',
				            title: 'La compra no se registró correctamente. Por favor inténtelo nuevamente.',
				            delay: 3000
				        });
				    } else {
				        $scope.guardando = false;
				        Notification.success({
				            message: 'La compra se registró correctamente.',
				            delay: 3000
				        });
				        window.location = '#/compras';
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


		$scope.reset = function(frmCompra){
			$scope.compra = {
			'id_tipo_insumo': 0,
			'precio': 0,
			'cantidad': 1,
			'cant_insumos':1
		};
		
		$scope.insumo = {};

		$scope.detalle = [];
		$scope.hoy = "";
		$scope.total = 0;
		var x = 0;
		var cant = 0;

		Compra.nueva_compra();

			 if (frmCompra) {
      			frmCompra.$setPristine();
      			frmCompra.$setUntouched();
    		}
		}

	}]);