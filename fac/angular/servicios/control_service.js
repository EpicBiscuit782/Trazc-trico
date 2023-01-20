var app = angular.module('coeplimApp.control',[]);


app.factory('Control', ['$http', '$q', function($http, $q){

	var self = {

		'cargando'		: false,
		'err'     		: false,
		'conteo' 		: 0,
		'controles' 		: [],
		'pag_actual'    : 1,
		'pag_siguiente' : 1,
		'pag_anterior'  : 1,
		'total_paginas' : 1,
		'paginas'	    : [],

		buscar: function( parametro ){

			var d = $q.defer();

			self.cargando = true;

			$http.get('model/control/get.control.buscar.php?id=' + parametro )
				.success(function( respuest ){

					//console.log(respuest);
					self.cargando = false;

					self.control = respuest.control;
					d.resolve();

				});

			return d.promise;

		},

		guardar: function( control ){

			var d = $q.defer();

			//console.log("something");

			$http.post('model/control/post.control.guardar.php' , control )
				.success(function( respuest ){

					 //console.log( respuest );
					self.err = respuest.err;
					d.resolve();

				});

			return d.promise;

		},


		cargarPagina: function( pag ){

			var d = $q.defer();

			$http.get('model/control/get.controles.php?pag=' + pag )
				.success(function( data ){

					self.err           = data.err;
					self.conteo        = data.conteo;
					self.controles	   = data.control;
					self.pag_actual    = data.pag_actual;
					self.pag_siguiente = data.pag_siguiente;
					self.pag_anterior  = data.pag_anterior;
					self.total_paginas = data.total_paginas;
					self.paginas       = data.paginas;

					//console.log(self.controles);
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