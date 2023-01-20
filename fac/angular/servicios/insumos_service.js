var app = angular.module('coeplimApp.insumos',[]);


app.factory('Insumos', ['$http', '$q', function($http, $q){

	var self = {

		'cargando'		: false,
		'err'     		: false,
		'conteo' 		: 0,
		'insumos' 		: [],
		'compras' 		: [],
		'detalle' 		: [],
		'insumo' 		: '',
		'pag_actual'    : 1,
		'pag_siguiente' : 1,
		'pag_anterior'  : 1,
		'total_paginas' : 1,
		'paginas'	    : [],

        all: function( ){

			var d = $q.defer();

			self.cargando = true;

			$http.post('model/insumos/all.php' )
				.success(function( respuest ){

					//console.log(respuest.parcela);
					self.cargando = false;

					self.insumos = respuest.insumos;
					//console.log(self.parcelas);
					d.resolve();

				});

			return d.promise;

		},
        
        buscar: function( parametro ){

			var d = $q.defer();

			self.cargando = true;

			$http.get('model/insumos/buscar.insumo.php?id=' + parametro )
				.success(function( respuesta ){

					//console.log(respuesta);
					self.cargando = false;

					self.insumo = respuesta.insumo;
					d.resolve();

				});

			return d.promise;

		},

		guardar: function( insumo ){

			var d = $q.defer();


			$http.post('model/insumos/post.insumo.guardar.php' , insumo)
				.success(function( respuest ){

					 //console.log( respuest );
					self.err = respuest.err;
					d.resolve();

				});

			return d.promise;

		},


		cargarPagina: function( pag ){

			var d = $q.defer();

			$http.get('model/insumos/get.insumos.php?pag=' + pag )
				.success(function( data ){

					self.err           = data.err;
					self.conteo        = data.conteo;
					self.insumos   	   = data.insumo;
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

		allCompras: function( pag ){

			var d = $q.defer();

			$http.get('model/compras/all.php?pag=' + pag )
				.success(function( data ){

					self.err           = data.err;
					self.conteo        = data.conteo;
					self.compras   	   = data.compra;
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

		buscarCompra: function( parametro ){

			var d = $q.defer();

			self.cargando = true;

			$http.get('model/compras/get.compra.php?id=' + parametro )
				.success(function( respuesta ){

					//console.log(respuesta);
					self.cargando = false;

					self.detalle = respuesta.detalle;
					d.resolve();

				});

			return d.promise;

		},
        
        buscarCompras: function(){

			var d = $q.defer();

			self.cargando = true;

			$http.get('model/compras/get.compras.php')
				.success(function( respuesta ){

					//console.log(respuesta);
					self.cargando = false;

					self.detalle = respuesta.detalle;
					d.resolve();

				});

			return d.promise;

		},


		cargarPag: function( pag ){

			var d = $q.defer();

			$http.get('model/insumos/get.insumosP.php?pag=' + pag )
				.success(function( data ){

					self.err           = data.err;
					self.conteo        = data.conteo;
					self.insumos   	   = data.inventario;
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





	};


	return self;


}]);
