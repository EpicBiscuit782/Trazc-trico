var app = angular.module('coeplimApp.terrenos',[]);


app.factory('Terrenos', ['$http', '$q', function($http, $q){

	var self = {

		'cargando'		: false,
		'err'     		: false, 
		'conteo' 		: 0,
		'terrenos' 		: [],
		'pag_actual'    : 1,
		'pag_siguiente' : 1,
		'pag_anterior'  : 1,
		'total_paginas' : 1,
		'paginas'	    : [],

		buscar: function( parametro ){

			var d = $q.defer();

			self.cargando = true;

			$http.post('model/terreno/get.terreno.buscar.php?id=' + parametro )
				.success(function( respuest ){

					console.log(respuest);
					self.cargando = false;

					self.terrenos = respuest.terreno;
					d.resolve();

				});

			return d.promise;

		},

		guardar: function( terreno ){

			var d = $q.defer();

			console.log("something");

			$http.post('model/terreno/post.terreno.guardar.php' , terreno )
				.success(function( respuest ){

					 console.log( respuest );
					//self.cargarPagina( self.pag_actual  );
					d.resolve();

				});

			return d.promise;

		},


		cargarPagina: function( pag ){

			var d = $q.defer();

			$http.get('model/terreno/get.terrenos.php?pag=' + pag )
				.success(function( data ){

					self.err           = data.err;
					self.conteo        = data.conteo;
					self.terrenos      = data.terreno;
					self.pag_actual    = data.pag_actual;
					self.pag_siguiente = data.pag_siguiente;
					self.pag_anterior  = data.pag_anterior;
					self.total_paginas = data.total_paginas;
					self.paginas       = data.paginas;

					//console.log(self.parcelas);
					return d.resolve();
				});



			return d.promise;
		},

		seleccionar: function( ){

			var d = $q.defer();

			self.cargando = true;

			$http.post('model/comprador/get.select.comprador.php')
				.success(function( respuest ){

					//console.log(respuest);
					self.cargando = false;

					self.comprador = respuest.comprador;
					d.resolve();

				});

			return d.promise;

		},


	};


	return self;


}]);