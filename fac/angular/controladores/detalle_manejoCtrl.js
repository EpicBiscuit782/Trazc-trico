var app = angular.module('coeplimApp.detalle_manejoCtrl', []);

	app.controller('detalle_manejoCtrl', ['$scope','$http', '$routeParams', 'Manejo',  function($scope,$http,$routeParams,Manejo){


		var id = $routeParams.id;

		$scope.manejo = {};
		$scope.detalle = {};

		if(! isNaN(id) ){
		//manejo
  		Manejo.getManejo(id).then(function(){
  			$scope.manejo = Manejo.manejo;
  			$scope.detalle = Manejo.detalle;

				if ($scope.manejo == undefined || Manejo.manejo == '') {
					window.location = '#/manejos';
					return;
				}

  		});

		}
		else{
			window.location = '#/manejos';
			return;
		}





	}]);
