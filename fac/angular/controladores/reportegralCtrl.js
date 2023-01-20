var app = angular.module('coeplimApp.reportegralCtrl', []);

	app.controller('reportegralCtrl', ['$scope','$http', 'Cosecha', function($scope,$http,Cosecha){

		$scope.reportes = {};
		$scope.repGastCosec = {};
		$scope.repGral = {
			'inicio': new Date(),
			'fin': new Date()
		};

		$scope.totalRejas = 0;
		$scope.totalPrecioRej = 0;
		$scope.totalKilos = 0;
		$scope.totalPrecioKg = 0;
		$scope.subTotal = 0;
		$scope.totalGastos = 0;
		$scope.totalGastosVar = 0;
		$scope.totalGastosCos = 0;
		$scope.total = 0;
		$scope.ganancias = 0;

		$scope.errorInicio = false;
		$scope.errorFin = false;

		$scope.sumar = function(valores){
			var suma = 0;
			valores.forEach(function(v){
				suma += parseFloat(v);
			});
			return suma;
		}

		//falta validar fechas
		$scope.consultar = function(reporte){

			$scope.totalRejas = 0;
			$scope.totalPrecioRej = 0;
			$scope.totalKilos = 0;
			$scope.totalPrecioKg = 0;
			$scope.subTotal = 0;
			$scope.ganancias = 0;
			var total = 0
			var gastos = 0
			var ventas = 0

			if ( angular.isDate($scope.repGral.inicio) ) {

				if ( angular.isDate($scope.repGral.fin) ) {

					Cosecha.reporte_gral( reporte ).then( function(){

						$scope.reportes = Cosecha.cosecha;
						$scope.repGastCosec = Cosecha.gastosCosec;
						$scope.repGastVarios = Cosecha.gastosVarios;
							//console.log($scope.reportes);
							console.log($scope.repGastCosec);
							//console.log(Cosecha.gastosVarios);
							//console.log(Cosecha.riego);
							//console.log(Cosecha.compra);
						/***************** Riego y Compras     *****************/
						if (Cosecha.riego.fecha != null) {
							console.log("entro riego");
							$scope.repGastVarios.push({gst_fecha:Cosecha.riego.fecha, tipo_actividad:"MANTENIMIENTO",costo :Cosecha.riego.costo, actividad :'RIEGO'});
						}
						if (Cosecha.compra.fecha != null) {
							$scope.repGastVarios.push({gst_fecha:Cosecha.compra.fecha, tipo_actividad:"VARIABLES", costo :Cosecha.compra.subtotal, actividad :'COMPRA INSUMOS'});
						}
							console.log(Cosecha.gastosVarios);
						$scope.matrix = new Multidimensional($scope.repGastCosec,["id_parcela","gasto","gst_fecha"]);
							//var gastos = matrix.getDimensionValues('gasto').sort();
						$scope.gastos = $scope.matrix.getDimensionValues('gasto').sort();
							//console.log(gastos);

							$scope.matrix_varios = new Multidimensional($scope.repGastVarios,["tipo_actividad","actividad","gst_fecha"]);
							//var gastos = matrix.getDimensionValues('gasto').sort();
							$scope.tipos_actividad = $scope.matrix_varios.getDimensionValues('tipo_actividad').sort();
							$scope.actividades = $scope.matrix_varios.getDimensionValues('actividad').sort();
							$scope.fechas_varios = $scope.matrix_varios.getDimensionValues('gst_fecha').sort();
							//console.log(gastos);



							for (var i = 0; i < $scope.reportes.length; i++) {
								$scope.totalRejas += parseFloat($scope.reportes[i].rejas);
								$scope.totalPrecioRej += parseFloat($scope.reportes[i].preja);
								$scope.totalKilos += parseFloat($scope.reportes[i].kilos);
								$scope.totalPrecioKg += parseFloat($scope.reportes[i].pkilo);
								$scope.subTotal += parseFloat($scope.reportes[i].subtotal);
							}

							for (var i = 0; i < $scope.repGastCosec.length; i++) {
								$scope.totalGastosCos += parseFloat($scope.repGastCosec[i].dt_precio);
								console.log($scope.totalGastosCos);
							}

							for (var i = 0; i < $scope.repGastVarios.length; i++) {
								$scope.totalGastosVar += parseFloat($scope.repGastVarios[i].costo);
								//console.log($scope.repGastVarios[i].costo);
								console.log($scope.totalGastosVar);
							}

							$scope.total = $scope.totalGastosCos + $scope.totalGastosVar;

					});


				}
				else {
					$scope.errorFin = true;
					setTimeout(function(){
						$scope.errorFin = false;
						$scope.$apply();
					},5000);
				}
			 }
			 else {
				 $scope.errorInicio = true;
 				setTimeout(function(){
 					$scope.errorInicio = false;
 					$scope.$apply();
 				},5000);
			 }

		}




}]);