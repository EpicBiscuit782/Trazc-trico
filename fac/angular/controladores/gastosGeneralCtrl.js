var app = angular.module('coeplimApp.gastosGeneralCtrl', []);

	app.controller('gastosGeneralCtrl', ['$scope','$http', 'Gastos', function($scope,$http,Gastos){


		$scope.total = 0;
		$scope.gastos = {};



		$scope.myChartObject = {};

    	$scope.myChartObject.type = "PieChart";
    	$scope.myChartObject.data = {"cols": [
		        {id: "t", label: "Topping", type: "string"},
		        {id: "s", label: "Total", type: "number"}
		    ], "rows": []};

		$scope.myChartObject.options = {
		        'title': 'Gastos'
		};

		$scope.myChartObjectBarra = {};

    	$scope.myChartObjectBarra.type = "ColumnChart";
    	$scope.myChartObjectBarra.data = {"cols": [
		        {id: "t", label: "Topping", type: "string"},
		        {id: "s", label: "Total", type: "number"}
		    ], "rows": []};

		$scope.myChartObjectBarra.options = {
		        'title': 'Gastos'
		};


		/* Produccion por Parcelas por Productor */



		Gastos.getGastosGral().then(function(){
			$scope.gastos = Gastos.gastos;
			//console.log($scope.gastos);
			if (Gastos.riegos.costo != null) {
					$scope.gastos.push({costo :Gastos.riegos.costo, ctl_descripcion :'RIEGO'});
			}
			if (Gastos.compras.subtotal != null) {
					$scope.gastos.push({costo :Gastos.compras.subtotal, ctl_descripcion :'COMPRA INSUMOS'});
			}

			for(var i in $scope.gastos){
			//console.log("valor:"+ i);
      $scope.total += parseInt($scope.gastos[i].costo);

			$scope.circular = { c: [
			{ v: $scope.gastos[i].ctl_descripcion },
			{ v: parseInt($scope.gastos[i].costo) }
			]};
			//console.log($scope.json);


			$scope.myChartObject.data.rows.push($scope.circular);

			//console.log($scope.myChartObject.data.rows[i].c);
			//console.log($scope.myChartObject.data.rows);

			$scope.barras = { c: [
			{ v: $scope.gastos[i].ctl_descripcion },
			{ v: parseInt($scope.gastos[i].costo) }
			]};
			//console.log($scope.json);


			$scope.myChartObjectBarra.data.rows.push($scope.barras);

		}//fin del for

		//console.log($scope.myChartObject.data);

	}); //final









	}]);
