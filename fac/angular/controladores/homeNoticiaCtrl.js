var app = angular.module('coeplimApp.homeNoticiaCtrl', []);

	app.controller('homeNoticiaCtrl', ['$scope','$http', '$routeParams', 'Home',  function($scope,$http,$routeParams,Home){


		var id = $routeParams.id;

		$scope.noticia = {};


		if(! isNaN(id)){
		//manejo
  		Home.buscar(id).then(function(){
  			$scope.noticia = Home.noticia;
  			
  			if ($scope.noticia== undefined || Home.noticia =='') {

					window.location = '#/';
					return;
				}

        //console.log($scope.noticia);
  		});

		}
		else{
			window.location = '#/';
			return;
		}





	}]);
