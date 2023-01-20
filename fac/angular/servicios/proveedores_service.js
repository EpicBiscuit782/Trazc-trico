var app = angular.module('coeplimApp.proveedores',[]);


app.factory('Proveedores', ['$http', '$q', function($http, $q){

	var self = {

		'cargando'		: false,
		'err'     		: false,
		'conteo' 		: 0,
		'proveedores' 	: [],
		'pag_actual'    : 1,
		'pag_siguiente' : 1,
		'pag_anterior'  : 1,
		'total_paginas' : 1,
		'paginas'	    : [],

		buscar: function( parametro ){

			var d = $q.defer();

			self.cargando = true;

			$http.get('model/proveedor/get.proveedor.php?id=' + parametro )
				.success(function( respuest ){

					self.cargando = false;

					self.proveedores = respuest.proveedor;
					d.resolve();

				});

			return d.promise;

		},

		guardar: function( proveedor ){

			var d = $q.defer();


			$http.post('model/proveedor/post.proveedor.guardar.php' , proveedor, {
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

			$http.get('model/proveedor/get.proveedores.php?pag=' + pag )
				.success(function( data ){

					self.err           = data.err;
					self.conteo        = data.conteo;
					self.proveedores   = data.proveedor;
					self.pag_actual    = data.pag_actual;
					self.pag_siguiente = data.pag_siguiente;
					self.pag_anterior  = data.pag_anterior;
					self.total_paginas = data.total_paginas;
					self.paginas       = data.paginas;

					return d.resolve();
				});



			return d.promise;
		},

		cbo_proveedor: function(){

			var d = $q.defer();


			$http.post('model/proveedor/get.cbo.proveedores.php')
				.success(function( respuest ){

					self.proveedores = respuest.proveedor;
					d.resolve();

				});

			return d.promise;

		},


	};


	return self;


}]);