var app = angular.module('coeplimApp.productores',[]);


app.factory('Productores', ['$http', '$q', function($http, $q){

	var self = {

		'cargando'		: false,
		'err'     		: false,
		'conteo' 		: 0,
		'productores' 	: [],
		'productor' 	: '',
		'pag_actual'    : 1,
		'pag_siguiente' : 1,
		'pag_anterior'  : 1,
		'total_paginas' : 1,
		'paginas'	    : [],
		'existeEmail': false,

		all: function( ){

			var d = $q.defer();

			self.cargando = true;

			$http.post('model/productores/all.php' )
				.success(function( respuesta ){

					//console.log(respuesta);
					self.cargando = false;

					self.productores = respuesta.productores;
					d.resolve();

				});
			return d.promise;

		},

		buscar: function( parametro ){

			var d = $q.defer();

			self.cargando = true;

			$http.get('model/productores/get.productor.buscar.php?id=' + parametro )
				.success(function( respuesta ){

					//console.log(respuesta);
					self.cargando = false;

					self.productor = respuesta.productor;
					d.resolve();

				});

			return d.promise;

		},

		buscarEmail: function( parametro ){

			var d = $q.defer();

			self.cargando = true;

			$http.get('model/productores/get.mail.php?email=' + parametro )
				.success(function( respuesta ){

					//console.log(respuesta);
					self.cargando = false;

					self.existeEmail = respuesta.existe;
					d.resolve();

				});

			return d.promise;

		},

		guardar: function( productores ){

			var d = $q.defer();

			//console.log("something");

			$http.post('model/productores/post.productorguardar.php' , productores )
				.success(function( respuesta ){

					 console.log( respuesta );
					self.err = respuesta.err;
					d.resolve();

				});

			return d.promise;

		},


		cargarPagina: function( pag ){

			var d = $q.defer();

			$http.get('model/productores/get.productores.php?pag=' + pag )
				.success(function( data ){
					//console.log(data);

					self.err           = data.err;
					self.conteo        = data.conteo;
					self.productores   = data.productor;
					self.pag_actual    = data.pag_actual;
					self.pag_siguiente = data.pag_siguiente;
					self.pag_anterior  = data.pag_anterior;
					self.total_paginas = data.total_paginas;
					self.paginas       = data.paginas;


					return d.resolve();
				});



			return d.promise;
		}


	};


	return self;


}]);