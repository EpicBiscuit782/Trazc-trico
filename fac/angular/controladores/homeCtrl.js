var app = angular.module('coeplimApp.homeCtrl', []);

	app.controller('homeCtrl', ['$scope', '$routeParams', 'Home', function ($scope,$routeParams,Home) {

		$scope.setActive('mInicio','');

		var pag = 1;
		$scope.buscar;
		$scope.noticias = {};


		$scope.moverA = function(pag){
			Home.cargarPagina(pag).then(function(){
			$scope.noticias = Home;
			//console.log($scope.noticias);
			});
		}
		$scope.moverA(pag);


	}]);

	app.filter('cortarTexto', function(){
		return function(text,limit){
			return(text.length > limit)? text.substr(0,limit)+'...' : text;
		}
	})
