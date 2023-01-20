var app = angular.module('coeplimApp.tipo_insumos',[]);

app.factory('TipoInsumo', ['$http', '$q', function($http, $q){

	var self = {

		'cargando'		: false,
		'err'     		: false,
		'conteo' 		: 0,
		'tipo_insumos' 	: [],
		'tipo_insumo' 	: '',
		'insumos'	: [],
		'pag_actual'    : 1,
		'pag_siguiente' : 1,
		'pag_anterior'  : 1,
		'total_paginas' : 1,
		'paginas'	    : [],


		all:function( parametro ){

			var d = $q.defer();

			self.cargando = true;

			$http.post('model/tipo_insumo/all.php' )
				.success(function( respuesta ){

					//console.log(respuesta.tipo_insumos);
					self.cargando = false;

					self.tipo_insumos = respuesta.tipo_insumos;
					d.resolve();

				});

			return d.promise;

		},

		buscar: function( parametro ){

			var d = $q.defer();

			self.cargando = true;

			$http.get('model/tipo_insumo/get.tipo_insumo.buscar.php?id=' + parametro )
				.success(function( respuesta ){

					//console.log(respuesta.tipo_insumo);
					self.cargando = false;

					self.tipo_insumo = respuesta.tipo_insumo;
					d.resolve();

				});

			return d.promise;

		},

		categoria: function(parametro){
			var d = $q.defer();

			$http.get('model/tipo_insumo/get.categoria_insumos.php?id=' + parametro )
				.success(function( respuesta ){

					//console.log( respuesta );
					self.insumos = respuesta.categoria;
					d.resolve();

				});

			return d.promise;
		},

		guardar: function( tipo_insumo ){

			var d = $q.defer();

			$http.post('model/tipo_insumo/post.tipo_insumo.guardar.php' , tipo_insumo )
				.success(function( respuesta ){

					 //console.log( respuesta );
					self.err= respuesta.err;
					d.resolve();

				});

			return d.promise;

		},


		cargarPagina: function( pag ){

			var d = $q.defer();

			$http.get('model/tipo_insumo/get.tipo_insumo.php?pag=' + pag )
				.success(function( data ){

					self.err           = data.err;
					self.conteo        = data.conteo;
					self.tipo_insumos   = data.tipo_insumo;
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
}
	return self;


}]);
