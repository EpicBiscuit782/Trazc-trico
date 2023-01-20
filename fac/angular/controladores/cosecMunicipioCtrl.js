var app = angular.module('coeplimApp.cosecMunicipioCtrl', []);

	app.controller('cosecMunicipioCtrl', ['$scope','$http', 'Cosecha',function($scope,$http,Cosecha){

		$scope.cosecha = [];
		$scope.total = 0;
		$scope.info = {};




		$scope.consulta = function(info){

				$scope.total = 0;
				$scope.myChartObject = {};
				$scope.myChartObjectBarra = {};
				$scope.myChartObject = {};
				$scope.myChartObject.type = "PieChart";
				$scope.myChartObject.data = {"cols": [
							{id: "t", label: "Topping", type: "string"},
							{id: "s", label: "Total", type: "number"}
					], "rows": []};

			$scope.myChartObject.options = {
							'title': 'Cosecha por Municipio'
			};

			$scope.myChartObjectBarra = {};

				$scope.myChartObjectBarra.type = "ColumnChart";
				$scope.myChartObjectBarra.data = {"cols": [
							{id: "t", label: "Topping", type: "string"},
							{id: "s", label: "Total", type: "number"}
					], "rows": []};

			$scope.myChartObjectBarra.options = {
							'title': 'Cosecha por Municipio'
			};

					Cosecha.repCosechaMunicipio(info).then(function(){


							 $scope.cosecha = Cosecha.cosecha;

								 //	console.log($scope.cosecha);
									if ($scope.cosecha.length > 0) {



									for (var i = 0; i < $scope.cosecha.length; i++) {

										$scope.total += parseFloat($scope.cosecha[i].kilos);


										$scope.circular = { c: [
										{ v: $scope.cosecha[i].pcl_municipio },
										{ v: parseFloat($scope.cosecha[i].kilos) }
										]};
										//console.log($scope.json);


										$scope.myChartObject.data.rows.push($scope.circular);

										//console.log($scope.myChartObject.data.rows[i].c);
										//console.log($scope.myChartObject.data.rows);

										$scope.barras = { c: [
										{ v: $scope.cosecha[i].pcl_municipio },
										{ v: parseInt($scope.cosecha[i].kilos) }
										]};
										//console.log($scope.json);


										$scope.myChartObjectBarra.data.rows.push($scope.barras);
									}//fin for

								}
								else {

									if ($scope.myChartObjectBarra.length > 0 ) {
											//$scope.myChartObjectBarra.data.rows = [];
							        //$scope.myChartObject.data.rows = [];
											$scope.myChartObject = {};
											$scope.myChartObjectBarra = {};
											$scope.cosecha = [];
											$scope.total = 0;
										}

										//$scope.info = {};

								}

					 });
			}//fin metodo

function isDefined( variable) { return (typeof(window[variable]) != "undefined");}

}]);
