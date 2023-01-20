var app = angular.module( 'loginApp',['login.loginService']);


app.controller('mainCtrl', ['$scope', 'LoginService', function( $scope, LoginService ){


	$scope.invalido = false;
	$scope.cargando = false;
	$scope.error = false;
	$scope.mensaje  = "";

	$scope.datos = {};

	$scope.ingresar = function( datos ){

		LoginService.login( datos ).then( function( data ){

			// TODO... continuar
			//console.log(data);
			if( data.err ){

				$scope.invalido = true;
				$scope.cargando = false;
				$scope.mensaje  = data.mensaje;
				$scope.error = true;
				setTimeout(function(){
					$scope.mensaje = "";
					$scope.error = false;
					$scope.$apply();
				},5000);
			}else{

				//console.log( data.mensaje );
				//console.log("hola");
				window.location = data.url;

			}

		});


	}// ingresar

	//*********************************************
	//		MOSTRAR MODAL RECUPERAR PASSWORD
	//*********************************************

	$scope.mostrarModal = function(){

		$("#login").modal();

	}

	//*****************************************
	// ENVIAR PASSWORD A CORREO
	//****************************************
	$scope.info ={
			correo: ''
	};

	$scope.recuperarPass = function(info){

		//console.log(info);
		LoginService.enviar( info ).then( function( data ){
			//console.log(data);
		});



		$("#login").modal('hide');
	}



}]);
