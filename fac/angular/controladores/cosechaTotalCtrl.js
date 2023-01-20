var app = angular.module('coeplimApp.cosechaTotalCtrl', []);

	app.controller('cosechaTotalCtrl', ['$scope','$http', 'Cosecha', function($scope,$http,Cosecha){

		$scope.cosecha = [];
		$scope.reporte = [];
		$scope.total = 0;


		$scope.consulta = function(info){
		
		 $scope.myChartObject = {};
        	$scope.myChartObject.type = "PieChart";
        	$scope.myChartObject.data = {"cols": [
    		        {id: "t", label: "Topping", type: "string"},
    		        {id: "s", label: "Total", type: "number"}
    		    ], "rows": []};

    		$scope.myChartObject.options = {
    		        'title': 'Cosecha Anual'
    		};

    		$scope.myChartObjectBarra = {};

        	$scope.myChartObjectBarra.type = "ColumnChart";
        	$scope.myChartObjectBarra.data = {"cols": [
    		        {id: "t", label: "Topping", type: "string"},
    		        {id: "s", label: "Total", type: "number"}
    		    ], "rows": []};

    		$scope.myChartObjectBarra.options = {
    		        'title': 'Cosecha Anual'
    		};
		
		
		
			Cosecha.repCosechaTotal(info).then(function(){

        $scope.reporte = Cosecha.cosecha;

        //console.log($scope.reporte);
        if ($scope.reporte.length > 0) {



        //console.log(Venta);
        for (var i = 0; i < $scope.reporte.length; i++) {

          $scope.total += parseFloat($scope.reporte[i].kilos);


          if ($scope.reporte[i].mes == '01') {
              $scope.vent ={ mes:'ENERO',kilos:$scope.reporte[i].kilos}
              $scope.cosecha.push($scope.vent);
          }
          else if ($scope.reporte[i].mes == '02') {
              $scope.vent ={ mes:'FEBRERO',kilos:$scope.reporte[i].kilos}
              $scope.cosecha.push($scope.vent);
          }
          else if ($scope.reporte[i].mes == '03') {
              $scope.vent ={ mes:'MARZO',kilos:$scope.reporte[i].kilos}
              $scope.cosecha.push($scope.vent);
          }
          else if ($scope.reporte[i].mes == '04') {
              $scope.vent ={ mes:'ABRIL',kilos:$scope.reporte[i].kilos}
              $scope.cosecha.push($scope.vent);
          }
          else if ($scope.reporte[i].mes == '05') {
              $scope.vent ={ mes:'MAYO',kilos:$scope.reporte[i].kilos}
              $scope.cosecha.push($scope.vent);
          }
          else if ($scope.reporte[i].mes == '06') {
              $scope.vent ={ mes:'JUNIO',kilos:$scope.reporte[i].kilos}
              $scope.cosecha.push($scope.vent);
          }
          else if ($scope.reporte[i].mes == '07') {
              $scope.vent ={ mes:'JULIO',kilos:$scope.reporte[i].kilos}
              $scope.cosecha.push($scope.vent);
          }
          else if ($scope.reporte[i].mes == '08') {
              $scope.vent ={ mes:'AGOSTO',kilos:$scope.reporte[i].kilos}
              $scope.cosecha.push($scope.vent);
          }
          else if ($scope.reporte[i].mes == '09') {
              $scope.vent ={ mes:'SEPTIEMBRE',kilos:$scope.reporte[i].kilos}
              $scope.cosecha.push($scope.vent);
          }
          else if ($scope.reporte[i].mes == '10') {
              $scope.vent ={ mes:'OCTUBRE',kilos:$scope.reporte[i].kilos}
              $scope.cosecha.push($scope.vent);
          }
          else if ($scope.reporte[i].mes == '11') {
              $scope.vent ={ mes:'NOVIEMBRE',kilos:$scope.reporte[i].kilos}
              $scope.cosecha.push($scope.vent);
          }
          else if ($scope.reporte[i].mes == '12') {
              $scope.vent ={ mes:'DICIEMBRE',kilos:$scope.reporte[i].kilos}
              $scope.cosecha.push($scope.vent);
          }

          $scope.circular = { c: [
    			{ v: $scope.cosecha[i].mes },
    			{ v: parseFloat($scope.cosecha[i].kilos) }
    			]};
    			//console.log($scope.json);


    			$scope.myChartObject.data.rows.push($scope.circular);

    			//console.log($scope.myChartObject.data.rows[i].c);
    			//console.log($scope.myChartObject.data.rows);

    			$scope.barras = { c: [
    			{ v: $scope.cosecha[i].mes },
    			{ v: parseInt($scope.cosecha[i].kilos) }
    			]};
    			//console.log($scope.json);


    			$scope.myChartObjectBarra.data.rows.push($scope.barras);
        }//fin for

      }// fin else
      else{
        //console.log($scope.myChartObjectBarra);
        //console.log($scope.myChartObject);

				if ($scope.myChartObjectBarra.length > 0 ) {
						$scope.myChartObjectBarra = {};
						$scope.myChartObject = {};
						//console.log("reprte");
				}

				$scope.cosecha = [];
				$scope.reporte = [];
				$scope.total = 0;

      }

			});


		}

	}]);