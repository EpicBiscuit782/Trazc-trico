var app = angular.module('coeplimApp.huertos',[]);


app.factory('Huerto', ['$http', '$q', function($http, $q){

	var self = {

		'cargando'		: false,
		'err'     		: false,
		'conteo' 		: 0,
		'huertos' 		: [],
		'pag_actual'    : 1,
		'pag_siguiente' : 1,
		'pag_anterior'  : 1,
		'total_paginas' : 1,
		'paginas'	    : [],
		'huerto' : '',

		buscar: function( parametro ){

			var d = $q.defer();

			self.cargando = true;

			$http.get('model/huertos/get.huerto.buscar.php?id=' + parametro )
				.success(function( respuest ){

					//console.log(respuest);
					self.cargando = false;

					self.huerto = respuest.huerto;
					d.resolve();

				});

			return d.promise;

		},

		guardar: function( huerto ){

			var d = $q.defer();

			$http.post('model/huertos/post.huerto.guardar.php' , huerto )
				.success(function( respuest ){

                    self.err = respuest.err;
					d.resolve();

				});

			return d.promise;

		},
        
        eliminar: function( huerto ){

			var d = $q.defer();


			$http.post('model/huertos/post.huerto.eliminar.php' , huerto )
				.success(function( respuest ){

                    self.err = respuest.err;
					d.resolve();

				});

			return d.promise;

		},


		cargarPagina: function( pag ){

			var d = $q.defer();

			$http.get('model/huertos/get.huertos.php?pag=' + pag )
				.success(function( data ){

					self.err           = data.err;
					self.conteo        = data.conteo;
					self.huertos	   = data.huerto;
					self.pag_actual    = data.pag_actual;
					self.pag_siguiente = data.pag_siguiente;
					self.pag_anterior  = data.pag_anterior;
					self.total_paginas = data.total_paginas;
					self.paginas       = data.paginas;

					return d.resolve();
				});



			return d.promise;
		},

		seleccionar: function( ){

			var d = $q.defer();

			self.cargando = true;

			$http.post('model/comprador/get.select.comprador.php')
				.success(function( respuest ){

					self.cargando = false;

					self.comprador = respuest.comprador;
					d.resolve();

				});

			return d.promise;
		},

	};


	return self;


}]);