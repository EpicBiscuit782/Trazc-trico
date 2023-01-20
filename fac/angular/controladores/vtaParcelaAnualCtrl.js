var app = angular.module('coeplimApp.vtaParcelaAnualCtrl', []);

	app.controller('vtaParcelaAnualCtrl', ['$scope','$http', '$routeParams', 'Venta', 'Parcelas',function($scope,$http,$routeParams,Venta,Parcelas){

		$scope.ventas = [];
		$scope.reporte = [];
		$scope.total = 0;
		$scope.info = {};
		$scope.alias="";

		$scope.errorParcela = false;
		$scope.errorYear = false;


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
					}
			}
		}



		$scope.consulta = function(info){

      //validar que parcela este seleccionada
      if($scope.info.id_parcela != undefined){

					if ($scope.info.year != undefined) {

						$scope.ventas = [];
						$scope.reporte = [];
						$scope.total = 0;
						$scope.year = $scope.info.year;

						Venta.report_venta_parcela_anual(info).then(function(){

							buscar();

						 $scope.reporte = Venta.ventAnual;
						 $scope.myChartObject = {};
						 $scope.myChartObject.type = "PieChart";
						 $scope.myChartObject.data = {"cols": [
									 {id: "t", label: "Topping", type: "string"},
									 {id: "s", label: "Total", type: "number"}
							 ], "rows": []};

					 $scope.myChartObject.options = {
									 'title': 'Venta por Parcela'
					 };

					 $scope.myChartObjectBarra = {};

						 $scope.myChartObjectBarra.type = "ColumnChart";
						 $scope.myChartObjectBarra.data = {"cols": [
									 {id: "t", label: "Topping", type: "string"},
									 {id: "s", label: "Total", type: "number"}
							 ], "rows": []};

					 $scope.myChartObjectBarra.options = {
									 'title': 'Venta por Parcela'
					 };


					 	//console.log($scope.reporte);
						if ($scope.reporte.length > 0) {


						//console.log(Venta);
						for (var i = 0; i < $scope.reporte.length; i++) {

							$scope.total += parseFloat($scope.reporte[i].total);


							if ($scope.reporte[i].mes == '01') {
									$scope.vent ={ mes:'ENERO',total:$scope.reporte[i].total}
									$scope.ventas.push($scope.vent);
							}
							else if ($scope.reporte[i].mes == '02') {
									$scope.vent ={ mes:'FEBRERO',total:$scope.reporte[i].total}
									$scope.ventas.push($scope.vent);
							}
							else if ($scope.reporte[i].mes == '03') {
									$scope.vent ={ mes:'MARZO',total:$scope.reporte[i].total}
									$scope.ventas.push($scope.vent);
							}
							else if ($scope.reporte[i].mes == '04') {
									$scope.vent ={ mes:'ABRIL',total:$scope.reporte[i].total}
									$scope.ventas.push($scope.vent);
							}
							else if ($scope.reporte[i].mes == '05') {
									$scope.vent ={ mes:'MAYO',total:$scope.reporte[i].total}
									$scope.ventas.push($scope.vent);
							}
							else if ($scope.reporte[i].mes == '06') {
									$scope.vent ={ mes:'JUNIO',total:$scope.reporte[i].total}
									$scope.ventas.push($scope.vent);
							}
							else if ($scope.reporte[i].mes == '07') {
									$scope.vent ={ mes:'JULIO',total:$scope.reporte[i].total}
									$scope.ventas.push($scope.vent);
							}
							else if ($scope.reporte[i].mes == '08') {
									$scope.vent ={ mes:'AGOSTO',total:$scope.reporte[i].total}
									$scope.ventas.push($scope.vent);
							}
							else if ($scope.reporte[i].mes == '09') {
									$scope.vent ={ mes:'SEPTIEMBRE',total:$scope.reporte[i].total}
									$scope.ventas.push($scope.vent);
							}
							else if ($scope.reporte[i].mes == '10') {
									$scope.vent ={ mes:'OCTUBRE',total:$scope.reporte[i].total}
									$scope.ventas.push($scope.vent);
							}
							else if ($scope.reporte[i].mes == '11') {
									$scope.vent ={ mes:'NOVIEMBRE',total:$scope.reporte[i].total}
									$scope.ventas.push($scope.vent);
							}
							else if ($scope.reporte[i].mes == '12') {
									$scope.vent ={ mes:'DICIEMBRE',total:$scope.reporte[i].total}
									$scope.ventas.push($scope.vent);
							}

							$scope.circular = { c: [
							{ v: $scope.ventas[i].mes },
							{ v: parseFloat($scope.ventas[i].total) }
							]};
							//console.log($scope.json);


							$scope.myChartObject.data.rows.push($scope.circular);

							//console.log($scope.myChartObject.data.rows[i].c);
							//console.log($scope.myChartObject.data.rows);

							$scope.barras = { c: [
							{ v: $scope.ventas[i].mes },
							{ v: parseInt($scope.ventas[i].total) }
							]};
							//console.log($scope.json);


							$scope.myChartObjectBarra.data.rows.push($scope.barras);
						}//fin for

						$scope.info = {};


					}// fin else
					else{
						//console.log($scope.myChartObjectBarra);
						//console.log($scope.myChartObject);

						if ($scope.myChartObjectBarra.length >0) {
							$scope.myChartObjectBarra = {};
							$scope.myChartObject = {};
						}
						$scope.ventas = [];
						$scope.reporte = [];
						$scope.total = 0;

						$scope.info = {};

						$scope.errorParcela = false;
						$scope.errorYear = false;

					}
					 });

					}
					else {
						$scope.errorParcela = true;
					}

			}
			else{
				$scope.errorYear = true;
			}

		}


}]);
