var app = angular.module('coeplimApp.parcelasRepCtrl', []);

	app.controller('parcelasRepCtrl', ['$scope','$http', '$routeParams', 'Parcelas', 'Propiedades', 'Productores', function($scope,$http,$routeParams,Parcelas,Propiedades,Productores){


		$scope.actualizado = false;
		$scope.parcelas = {};




		Parcelas.parcelaProductor().then(function(){
			$scope.parcelas = Parcelas;
			//console.log($scope.parcelas);
		});

		/* Produccion total de Parcelas por Productor */
		$scope.myChartObject = {};

    	$scope.myChartObject.type = "PieChart";
    	$scope.myChartObject.data = {"cols": [
		        {id: "t", label: "Topping", type: "string"},
		        {id: "s", label: "Kilos", type: "number"}
		    ], "rows": []};

		$scope.myChartObject.options = {
		        'title': 'Producción en Kilogramos'
		};

		$scope.myChartObjectBarra = {};

    	$scope.myChartObjectBarra.type = "ColumnChart";
    	$scope.myChartObjectBarra.data = {"cols": [
		        {id: "t", label: "Topping", type: "string"},
		        {id: "s", label: "Kilos", type: "number"}
		    ], "rows": []};

		$scope.myChartObjectBarra.options = {
		        'title': 'Producción en Kilogramos'
		};


		$scope.parcProdTotal = {};
		Parcelas.parcelaProduccion().then(function(){
			$scope.parcProdTotal = Parcelas.produccion;
			//console.log($scope.parcProdTotal);
		});

		/* Produccion por Parcelas por Productor */


		$scope.parcProdInd = {};
		Parcelas.parcelaProduccionInd().then(function(){
			$scope.parcProdInd = Parcelas;
			//console.log($scope.parcProdInd);

			for(var i in Parcelas.produccion){
			//console.log("valor:"+ i);

			$scope.circular = { c: [
			{ v: Parcelas.produccion[i].pcl_alias },
			{ v: parseInt(Parcelas.produccion[i].kilos) }
			]};
			//console.log($scope.json);


			$scope.myChartObject.data.rows.push($scope.circular);

			//console.log($scope.myChartObject.data.rows[i].c);
			//console.log($scope.myChartObject.data.rows);

			$scope.barras = { c: [
			{ v: Parcelas.produccion[i].pcl_alias },
			{ v: parseInt(Parcelas.produccion[i].kilos) }
			]};
			//console.log($scope.json);


			$scope.myChartObjectBarra.data.rows.push($scope.barras);

		}//fin del for

		//console.log($scope.myChartObject.data);

	}); //final








	}]);
