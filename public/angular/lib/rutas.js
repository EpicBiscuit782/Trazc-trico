// ================================================
//   Rutas
// ================================================
app.config([ '$routeProvider', function($routeProvider){

	$routeProvider
		.when('/',{
			templateUrl: 'index.php',
			controller: 'app'
		})

		/* **************************************************

								CATALOGOS

		*****************************************************/

		.when('/portainjertos', {
			templateUrl: 'template/portainjerto/all.html',
			//controller: 'portainjertosCtrl'
		})
		.when('/portainjerto/:id', {
			templateUrl: 'template/portainjerto/add.html',
			///controller: 'portainjertoCtrl'
		})





		.otherwise({
			redirectTo: '/'
		})

}]);
