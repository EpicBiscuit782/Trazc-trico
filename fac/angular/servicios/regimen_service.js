var app = angular.module('coeplimApp.propiedades',[]);


app.factory('Propiedades', ['$http', '$q', function($http, $q){

	var self = {

		'cargando'		: false,
		'err'     		: false,
		'conteo' 		: 0,
		'propiedades' 	: [],
		'propiedad' 	: '',
		'pag_actual'    : 1,
		'pag_siguiente' : 1,
		'pag_anterior'  : 1,
		'total_paginas' : 1,
		'paginas'	    : [],

		all: function( parametro ){

			var d = $q.defer();

			self.cargando = true;

			$http.post('model/regimen/all.php' )
				.success(function( respuesta ){

					//console.log(respuesta);
					self.cargando = false;

					self.propiedades = respuesta.propiedades;
					d.resolve();

				});

			return d.promise;

		},

		buscar: function( parametro ){

			var d = $q.defer();

			self.cargando = true;

			$http.get('model/regimen/get.regimen.buscar.php?id=' + parametro )
				.success(function( respuesta ){

					//console.log(respuesta);
					self.cargando = false;

					self.propiedad = respuesta.propiedad;
					d.resolve();

				});

			return d.promise;

		},

		guardar: function( propiedad ){

			var d = $q.defer();


			$http.post('model/regimen/post.regimen.guardar.php' , propiedad )
				.success(function( respuest ){

					 //console.log( respuest );
					self.err = respuest.err;
					d.resolve();

				});

			return d.promise;

		},


		cargarPagina: function( pag ){

			var d = $q.defer();

			$http.get('model/regimen/get.regimen.php?pag=' + pag )
				.success(function( data ){

					self.err           = data.err;
					self.conteo        = data.conteo;
					self.propiedades   = data.propiedad;
					self.pag_actual    = data.pag_actual;
					self.pag_siguiente = data.pag_siguiente;
					self.pag_anterior  = data.pag_anterior;
					self.total_paginas = data.total_paginas;
					self.paginas       = data.paginas;

					//console.log(self.parcelas);
					return d.resolve();
				});



			return d.promise;
		}




	};


	return self;


}]);