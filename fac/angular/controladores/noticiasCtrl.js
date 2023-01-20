var app = angular.module('coeplimApp.noticiasCtrl', []);

	app.controller('noticiasCtrl', ['$scope', '$routeParams', 'Noticia', function ($scope,$routeParams,Noticia) {

		//$scope.setActive('mAnalisis_suelo','');

		var pag = 1;
		$scope.buscar;
		$scope.noticias = {};


		//console.log("pag:"+ pag);

		$scope.moverA = function(pag){
			Noticia.cargarPagina(pag).then(function(){
			$scope.noticias = Noticia;
			//console.log($scope.noticias.noticias);
			});
		}
		$scope.moverA(pag);


	}]);
