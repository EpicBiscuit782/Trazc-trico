var app = angular.module('coeplimApp.session',[]);


app.factory('Session', ['$http', '$q', function($http, $q){

	var self = {

		'cargando'		: false,
		'err'     		: false,
		'conteo' 		: 0,
		'productores' 	: [],
		'rol':'',
		'pag_actual'    : 1,
		'pag_siguiente' : 1,
		'pag_anterior'  : 1,
		'total_paginas' : 1,
		'paginas'	    : [],

		buscar: function(){

			var d = $q.defer();

			self.cargando = true;

			$http.post('model/session/get.productor.buscar.php' )
				.success(function( respuesta ){

					//console.log(respuesta);
					self.cargando = false;

					self.productores = respuesta;
					d.resolve();

				});

			return d.promise;

		},
		
			rol: function(){

			var d = $q.defer();

			self.cargando = true;

			$http.post('model/session/get.rol.php' )
				.success(function( respuesta ){
					//console.log(respuesta.productor);
					self.cargando = false;

					self.rol = respuesta.productor;
					d.resolve();
				});

			return d.promise;

		},

		guardar: function( productores ){

			var d = $q.defer();

			//console.log("something");

			$http.post('model/productores/post.productorguardar.php' , productores )
				.success(function( respuesta ){

					 //console.log( respuesta );
					//self.cargarPagina( self.pag_actual  );
					d.resolve();

				});


			return d.promise;

		},


		cargarPagina: function( pag ){

			var d = $q.defer();

			$http.get('model/productores/get.productores.php?pag=' + pag )
				.success(function( data ){

					self.err           = data.err;
					self.conteo        = data.conteo;
					self.productores     = data.productor;
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