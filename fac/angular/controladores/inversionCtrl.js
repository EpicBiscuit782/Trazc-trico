var app = angular.module('coeplimApp.inversionCtrl', []);

	app.controller('inversionCtrl', ['$scope','$http', 'Gastos','Parcelas', function($scope,$http,Gastos,Parcelas){

    //console.log("inversion");
		$scope.reportes = {};
		$scope.info = {
      'id_parcela':0,
			'inicio': new Date(),
			'fin': new Date()
		};

    $scope.alias = "";
    $scope.parcela = false;
    $scope.aux = "";

		$scope.subTotal = 0;
		$scope.totalGastos = 0;
		$scope.ganancias = 0;


    $scope.parcelas = {};
		//console.log(Compradores);
    Parcelas.all().then(function(){
    $scope.parcelas = Parcelas.parcelas;
			//console.log($scope.parcelas);
		});

		function buscar(){
			for (var i = 0; i < $scope.parcelas.length; i++) {
					if($scope.info.id_parcela == 	$scope.parcelas[i].id_parcela){
						$scope.alias = $scope.parcelas[i].pcl_alias;
						//console.log($scope.alias);
					}
			}
		}

		//falta validar fechas
		$scope.consultar = function(info){

			$scope.subTotal = 0;
			$scope.totalGastos = 0;
      //console.log($scope.info);

      if ($scope.info.id_parcela > 0) {
        $scope.parcela = true;
      }
      else {
        $scope.parcela = false;
      }

			if ( angular.isDate($scope.info.inicio) ) {

				if ( angular.isDate($scope.info.fin) ) {

						Gastos.getGastos( info ).then( function(){

							$scope.reportes = Gastos.gastosGral;
							$scope.subTotal = Gastos.ventaTot.total;
		          //console.log(Gastos);
							//console.log($scope.reportes);
							var costo = parseFloat(Gastos.riegos.costo)
		          //console.log(costo);
							if (!isNaN(costo)) {
									$scope.reportes.push({costo :Gastos.riegos.costo, ctl_descripcion :'RIEGO'});
							}
							if (Gastos.compras != null) {
									$scope.reportes.push({costo :Gastos.compras.subtotal, ctl_descripcion :'COMPRA INSUMOS'});
							}

				          buscar();

									for (var i = 0; i < $scope.reportes.length; i++) {

										$scope.totalGastos += parseFloat($scope.reportes[i].costo);
									}



		          $scope.info.id_parcela = 0;

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

			/*Cosecha.reporte_cosecha(info).then(function(){

					$scope.totalGastos = 0;
				  $scope.repGastCosec = Cosecha.gastosCosec;

					for (var i = 0; i < $scope.repGastCosec.length; i++) {
						$scope.totalGastos += parseFloat($scope.repGastCosec[i].dt_precio);
					}

			});*/

		}


}]);