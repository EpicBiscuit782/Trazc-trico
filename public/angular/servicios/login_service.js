var app = angular.module('login.loginService',[]);


app.factory('LoginService', ['$http','$q', function( $http, $q ){


	var self = {

		login: function( datos ){

			var d = $q.defer();

			$http.post('model/login/post.verificar.php', datos)
				 .success(function( data ){
				 //	console.log( data );
				 	d.resolve( data );

				 });


			return d.promise;

		},

		enviar: function( info ){
			//console.log(info);

			var d = $q.defer();

			$http.post('model/login/enviar.php', info)
				 .success(function( data ){
				 	//console.log( "login" );
				 	d.resolve( data );
					//console.log(data);
				 });


			return d.promise;

		}

	};

	return self;


}]);
