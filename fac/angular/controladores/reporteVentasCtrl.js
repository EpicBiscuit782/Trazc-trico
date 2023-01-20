var app = angular.module('coeplimApp.reporteVentasCtrl', []);

	app.controller('reporteVentasCtrl', ['$scope','$http', '$routeParams', 'Venta',  'Productores', function($scope,$http,$routeParams,Venta,Productores){


		$scope.venta = {};


		/* Produccion total de Parcelas por Productor */
		$scope.myChartObject = {};

    	$scope.myChartObject.type = "PieChart";
    	$scope.myChartObject.data = {"cols": [
		        {id: "t", label: "Topping", type: "string"},
		        {id: "s", label: "Total", type: "number"}
		    ], "rows": []};

		$scope.myChartObject.options = {
		        'title': 'Ventas por Comprador'
		};

		$scope.myChartObjectBarra = {};

    	$scope.myChartObjectBarra.type = "ColumnChart";
    	$scope.myChartObjectBarra.data = {"cols": [
		        {id: "t", label: "Topping", type: "string"},
		        {id: "s", label: "Total", type: "number"}
		    ], "rows": []};

		$scope.myChartObjectBarra.options = {
		        'title': 'Ventas por Comprador'
		};

		/*  TOTAL DE VENTAS EN EFECTIVO */


		$scope.VTotal = {};
		Venta.totalV().then(function(){
			$scope.VTotal = Venta.total;
			//console.log($scope.VTotal);
		});

		/* Produccion por Parcelas por Productor */


		$scope.ventaComp = {};
		Venta.totalComp().then(function(){
			$scope.ventaComp = Venta;
			//console.log($scope.ventaComp);

			for(var i in Venta.ventaComp){
			//console.log("valor:"+ i);

			$scope.circular = { c: [
			{ v: Venta.ventaComp[i].cmp_nombre },
			{ v: parseInt(Venta.ventaComp[i].total) }
			]};
			//console.log($scope.json);


			$scope.myChartObject.data.rows.push($scope.circular);

			//console.log($scope.myChartObject.data.rows[i].c);
			//console.log($scope.myChartObject.data.rows);

			$scope.barras = { c: [
			{ v: Venta.ventaComp[i].cmp_nombre },
			{ v: parseInt(Venta.ventaComp[i].total) }
			]};
			//console.log($scope.json);


			$scope.myChartObjectBarra.data.rows.push($scope.barras);

		}//fin del for

		//console.log($scope.myChartObject.data);

	}); //final








	}]);
