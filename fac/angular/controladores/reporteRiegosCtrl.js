var app = angular.module('coeplimApp.reporteRiegosCtrl', []);

	app.controller('reporteRiegosCtrl', ['$scope','$http', '$routeParams', 'Riego', function($scope,$http,$routeParams,Riego){


		/* Produccion total de Parcelas por Productor */
		$scope.myChartObject = {};

    	$scope.myChartObject.type = "PieChart";
    	$scope.myChartObject.data = {"cols": [
		        {id: "t", label: "Topping", type: "string"},
		        {id: "s", label: "Agua", type: "number"}
		    ], "rows": []};

		$scope.myChartObject.options = {
		        'title': 'Riego por Parcela'
		};

		$scope.myChartObjectBarra = {};

    	$scope.myChartObjectBarra.type = "ColumnChart";
    	$scope.myChartObjectBarra.data = {"cols": [
		        {id: "t", label: "Topping", type: "string"},
		        {id: "s", label: "Agua", type: "number"}
		    ], "rows": []};

		$scope.myChartObjectBarra.options = {
		        'title': 'Riego por Parcela'
		};


		$scope.riegoTotal = {};
		Riego.totalRieg().then(function(){
			$scope.riegoTotal = Riego.total;
			//$scope.riegoTotal = Parcelas.produccion;
			//console.log($scope.parcProdTotal);
		});

		/* Produccion por Parcelas por Productor */


		$scope.riegoParc = {};
			Riego.riegoParcela().then(function(){
			$scope.riegoParc = Riego;
			//console.log($scope.riegoParc);

			for(var i in Riego.riegos){
			//console.log("valor:"+ i);

			$scope.circular = { c: [
			{ v: Riego.riegos[i].pcl_alias },
			{ v: parseInt(Riego.riegos[i].cantidad) }
			]};
			//console.log($scope.json);


			$scope.myChartObject.data.rows.push($scope.circular);

			//console.log($scope.myChartObject.data.rows[i].c);
			//console.log($scope.myChartObject.data.rows);

			$scope.barras = { c: [
			{ v: Riego.riegos[i].pcl_alias },
			{ v: parseInt(Riego.riegos[i].cantidad) }
			]};
			//console.log($scope.json);


			$scope.myChartObjectBarra.data.rows.push($scope.barras);

		}//fin del for

		//console.log($scope.myChartObject.data);

	}); //final */








	}]);
