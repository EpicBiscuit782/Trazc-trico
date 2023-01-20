var app = angular.module('coeplimApp.analisis_foliar',[]);


app.factory('Analisis_Foliar', ['$http', '$q', function($http, $q){

	var self = {

		'cargando'		: false,
		'err'     		: false,
		'conteo' 		: 0,
		'analisis_foliar': [],
		'analisis': '',
		'pag_actual'    : 1,
		'pag_siguiente' : 1,
		'pag_anterior'  : 1,
		'total_paginas' : 1,
		'paginas'	    : [],

		buscar: function( parametro ){

			var d = $q.defer();

			self.cargando = true;

			$http.get('model/analisis_foliar/get.analisis_foliar.buscar.php?id=' + parametro )
				.success(function( respuest ){

					//console.log(respuest);
					self.cargando = false;

					self.analisis = respuest.analisis_foliar;
					d.resolve();

				});

			return d.promise;

		},

		guardar: function(evidencia){

			var d = $q.defer();

			$http.post('model/analisis_foliar/post.analisis_foliar.guardar.php', evidencia, {
			transformRequest:angular.identity, 
			headers: {'Content-Type':undefined, 'Process-Data': false}
		}).success(function( respuest ){

					self.err = respuest.err;
					d.resolve();

				});

			return d.promise;

		},


		cargarPagina: function( pag ){

			var d = $q.defer();

			$http.get('model/analisis_foliar/get.analisis_foliar.php?pag=' + pag )
				.success(function( data ){

					self.err           = data.err;
					self.conteo        = data.conteo;
					self.analisis_foliar   = data.analisis_foliar;
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
        
        cargarAll: function( pag ){

			var d = $q.defer();

			$http.get('model/analisis_foliar/get.all.php?pag=' + pag )
				.success(function( data ){

					self.err           = data.err;
					self.conteo        = data.conteo;
					self.analisis_foliar   = data.analisis_foliar;
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