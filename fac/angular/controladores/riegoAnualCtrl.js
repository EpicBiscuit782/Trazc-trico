var app = angular.module('coeplimApp.riegoAnualCtrl', []);

	app.controller('riegoAnualCtrl', ['$scope','$http', 'Riego', function($scope,$http,Riego){

		$scope.riegos = [];
		$scope.reporte = [];
		$scope.total = 0;


		$scope.consulta = function(info){
			Riego.repRiegoAnual(info).then(function(){

        $scope.reporte = Riego.riegos;
				$scope.myChartObject = {};
				$scope.myChartObject.type = "PieChart";
				$scope.myChartObject.data = {"cols": [
							{id: "t", label: "Topping", type: "string"},
							{id: "s", label: "Total", type: "number"}
					], "rows": []};

			$scope.myChartObject.options = {
							'title': 'Riego Anual'
			};

			$scope.myChartObjectBarra = {};

				$scope.myChartObjectBarra.type = "ColumnChart";
				$scope.myChartObjectBarra.data = {"cols": [
							{id: "t", label: "Topping", type: "string"},
							{id: "s", label: "Total", type: "number"}
					], "rows": []};

			$scope.myChartObjectBarra.options = {
							'title': 'Riego Anual'
			};

        //console.log($scope.reporte.length);
        if ($scope.reporte.length > 0) {

        //console.log(Riego);
        for (var i = 0; i < $scope.reporte.length; i++) {

          $scope.total += parseFloat($scope.reporte[i].total);


          if ($scope.reporte[i].mes == '01') {
              $scope.vent ={ mes:'ENERO',total:$scope.reporte[i].total}
              $scope.riegos.push($scope.vent);
          }
          else if ($scope.reporte[i].mes == '02') {
              $scope.vent ={ mes:'FEBRERO',total:$scope.reporte[i].total}
              $scope.riegos.push($scope.vent);
          }
          else if ($scope.reporte[i].mes == '03') {
              $scope.vent ={ mes:'MARZO',total:$scope.reporte[i].total}
              $scope.riegos.push($scope.vent);
          }
          else if ($scope.reporte[i].mes == '04') {
              $scope.vent ={ mes:'ABRIL',total:$scope.reporte[i].total}
              $scope.riegos.push($scope.vent);
          }
          else if ($scope.reporte[i].mes == '05') {
              $scope.vent ={ mes:'MAYO',total:$scope.reporte[i].total}
              $scope.riegos.push($scope.vent);
          }
          else if ($scope.reporte[i].mes == '06') {
              $scope.vent ={ mes:'JUNIO',total:$scope.reporte[i].total}
              $scope.riegos.push($scope.vent);
          }
          else if ($scope.reporte[i].mes == '07') {
              $scope.vent ={ mes:'JULIO',total:$scope.reporte[i].total}
              $scope.riegos.push($scope.vent);
          }
          else if ($scope.reporte[i].mes == '08') {
              $scope.vent ={ mes:'AGOSTO',total:$scope.reporte[i].total}
              $scope.riegos.push($scope.vent);
          }
          else if ($scope.reporte[i].mes == '09') {
              $scope.vent ={ mes:'SEPTIEMBRE',total:$scope.reporte[i].total}
              $scope.riegos.push($scope.vent);
          }
          else if ($scope.reporte[i].mes == '10') {
              $scope.vent ={ mes:'OCTUBRE',total:$scope.reporte[i].total}
              $scope.riegos.push($scope.vent);
          }
          else if ($scope.reporte[i].mes == '11') {
              $scope.vent ={ mes:'NOVIEMBRE',total:$scope.reporte[i].total}
              $scope.riegos.push($scope.vent);
          }
          else if ($scope.reporte[i].mes == '12') {
              $scope.vent ={ mes:'DICIEMBRE',total:$scope.reporte[i].total}
              $scope.riegos.push($scope.vent);
          }

          $scope.circular = { c: [
    			{ v: $scope.riegos[i].mes },
    			{ v: parseFloat($scope.riegos[i].total) }
    			]};
    			//console.log($scope.json);


    			$scope.myChartObject.data.rows.push($scope.circular);

    			//console.log($scope.myChartObject.data.rows[i].c);
    			//console.log($scope.myChartObject.data.rows);

    			$scope.barras = { c: [
    			{ v: $scope.riegos[i].mes },
    			{ v: parseInt($scope.riegos[i].total) }
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

        $scope.riegos = [];
    		$scope.reporte = [];
    		$scope.total = 0;



      }

			});


		}

	}]);
