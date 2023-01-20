var app = angular.module('coeplimApp.variedades',[]);


app.factory('Variedad', ['$http', '$q', function($http, $q){

	var self = {

		'cargando'		: false,
		'err'     		: false,
		'conteo' 		: 0,
		'variedades' 	: [],
		'variedad' 	: '',
		'pag_actual'    : 1,
		'pag_siguiente' : 1,
		'pag_anterior'  : 1,
		'total_paginas' : 1,
		'paginas'	    : [],

		all: function( ){

			var d = $q.defer();

			self.cargando = true;

			$http.post('model/variedad/all.php' )
				.success(function( respuest ){

					//console.log(respuest);
					self.cargando = false;

					self.variedades = respuest.variedades;
					d.resolve();

				});

			return d.promise;

		},

		buscar: function( parametro ){

			var d = $q.defer();

			self.cargando = true;

			$http.get('model/variedad/get.variedad.buscar.php?id=' + parametro )
				.success(function( respuest ){

					//console.log(respuest);
					self.cargando = false;

					self.variedad = respuest.variedad;
					d.resolve();

				});

			return d.promise;

		},

		guardar: function( variedad ){

			var d = $q.defer();

			//console.log("something");

			$http.post('model/variedad/post.variedad.guardar.php' , variedad )
				.success(function( respuest ){

					 console.log( respuest );
					self.err = respuest.err;
					d.resolve();

				});

			return d.promise;

		},


		cargarPagina: function( pag ){

			var d = $q.defer();

			$http.get('model/variedad/get.variedades.php?pag=' + pag )
				.success(function( data ){

					self.err           = data.err;
					self.conteo        = data.conteo;
					self.variedades    = data.variedad;
					self.pag_actual    = data.pag_actual;
					self.pag_siguiente = data.pag_siguiente;
					self.pag_anterior  = data.pag_anterior;
					self.total_paginas = data.total_paginas;
					self.paginas       = data.paginas;

					//console.log(self.variedades);
					return d.resolve();
				});



			return d.promise;
		},

		


	};


	return self;


}]);