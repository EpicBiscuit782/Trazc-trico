var app = angular.module('coeplimApp.cosechaParcelaCtrl', []);

	app.controller('cosechaParcelaCtrl', ['$scope','$http', '$routeParams', 'Cosecha', 'Parcelas',function($scope,$http,$routeParams,Cosecha,Parcelas){

		$scope.cosechas = [];
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

				$scope.cosechas = [];
                $scope.reporte = [];
				$scope.total = 0;

				Cosecha.repCosechaParcela(info).then(function(){

				    buscar();

						 $scope.reporte = Cosecha.cosecha;
						 $scope.myChartObject = {};
						 $scope.myChartObject.type = "PieChart";
                         $scope.myChartObject.data = {"cols": [
								    {id: "t", label: "Topping", type: "string"},
								    {id: "s", label: "Kilos", type: "number"}
							 ], "rows": []};

					 $scope.myChartObject.options = {
									 'title': 'Cosecha'
					 };

					 $scope.myChartObjectBarra = {};

						 $scope.myChartObjectBarra.type = "ColumnChart";
						 $scope.myChartObjectBarra.data = {"cols": [
								    {id: "t", label: "Topping", type: "string"},
								    {id: "s", label: "Kilos", type: "number"}
							 ], "rows": []};

					 $scope.myChartObjectBarra.options = {
									 'title': 'Cosecha'
					 };



					 	//console.log($scope.reporte);
						if ($scope.reporte.length > 0) {
                            
							if(info.year==null){
                                $scope.year = 'TODOS';
                            }else{
                                $scope.year = info.year;
                            }


						//console.log(Cosecha);
						for (var i = 0; i < $scope.reporte.length; i++) {

							$scope.total += parseFloat($scope.reporte[i].kilos);


							if ($scope.reporte[i].mes == '01') {
									$scope.vent ={ mes:'ENERO',kilos:$scope.reporte[i].kilos}
									$scope.cosechas.push($scope.vent);
							}
							else if ($scope.reporte[i].mes == '02') {
									$scope.vent ={ mes:'FEBRERO',kilos:$scope.reporte[i].kilos}
									$scope.cosechas.push($scope.vent);
							}
							else if ($scope.reporte[i].mes == '03') {
									$scope.vent ={ mes:'MARZO',kilos:$scope.reporte[i].kilos}
									$scope.cosechas.push($scope.vent);
							}
							else if ($scope.reporte[i].mes == '04') {
									$scope.vent ={ mes:'ABRIL',kilos:$scope.reporte[i].kilos}
									$scope.cosechas.push($scope.vent);
							}
							else if ($scope.reporte[i].mes == '05') {
									$scope.vent ={ mes:'MAYO',kilos:$scope.reporte[i].kilos}
									$scope.cosechas.push($scope.vent);
							}
							else if ($scope.reporte[i].mes == '06') {
									$scope.vent ={ mes:'JUNIO',kilos:$scope.reporte[i].kilos}
									$scope.cosechas.push($scope.vent);
							}
							else if ($scope.reporte[i].mes == '07') {
									$scope.vent ={ mes:'JULIO',kilos:$scope.reporte[i].kilos}
									$scope.cosechas.push($scope.vent);
							}
							else if ($scope.reporte[i].mes == '08') {
									$scope.vent ={ mes:'AGOSTO',kilos:$scope.reporte[i].kilos}
									$scope.cosechas.push($scope.vent);
							}
							else if ($scope.reporte[i].mes == '09') {
									$scope.vent ={ mes:'SEPTIEMBRE',kilos:$scope.reporte[i].kilos}
									$scope.cosechas.push($scope.vent);
							}
							else if ($scope.reporte[i].mes == '10') {
									$scope.vent ={ mes:'OCTUBRE',kilos:$scope.reporte[i].kilos}
									$scope.cosechas.push($scope.vent);
							}
							else if ($scope.reporte[i].mes == '11') {
									$scope.vent ={ mes:'NOVIEMBRE',kilos:$scope.reporte[i].kilos}
									$scope.cosechas.push($scope.vent);
							}
							else if ($scope.reporte[i].mes == '12') {
									$scope.vent ={ mes:'DICIEMBRE',kilos:$scope.reporte[i].kilos}
									$scope.cosechas.push($scope.vent);
							}

							$scope.circular = { c: [
							{ v: $scope.cosechas[i].mes },
							{ v: parseFloat($scope.cosechas[i].kilos) }
							]};
							//console.log($scope.json);


							$scope.myChartObject.data.rows.push($scope.circular);

							//console.log($scope.myChartObject.data.rows[i].c);
							//console.log($scope.myChartObject.data.rows);

							$scope.barras = { c: [
							{ v: $scope.cosechas[i].mes },
							{ v: parseInt($scope.cosechas[i].kilos) }
							]};
							//console.log($scope.json);


							$scope.myChartObjectBarra.data.rows.push($scope.barras);
						}//fin for


					}// fin else
					else{
						//console.log($scope.myChartObjectBarra);
						//console.log($scope.myChartObject);

						if ($scope.myChartObjectBarra  > 0) {
							$scope.myChartObjectBarra = {};
							$scope.myChartObject = {};
						}

						$scope.cosechas = [];
						$scope.reporte = [];
						$scope.total = 0;
                            
                        if(info.year==null){
                            $scope.year = 'Todos';
                        }else{
                            $scope.year = info.year;
                        }

						$scope.errorParcela = false;
						$scope.errorYear = false;

					}
					 });

		}


}]);
