var app = angular.module('coeplimApp.admin',[]);


app.factory('Admin', ['$http', '$q', function($http, $q){

	var self = {

		'cargando'		: false,
		'err'     		: false,
		'conteo' 		: 0,
		'administradores' 	: [],
    'admin' : "",
		'pag_actual'    : 1,
		'pag_siguiente' : 1,
		'pag_anterior'  : 1,
		'total_paginas' : 1,
		'paginas'	    : [],

		buscar: function( parametro ){

			var d = $q.defer();

			self.cargando = true;

			$http.get('model/admin/get.admin.php?id=' + parametro )
				.success(function( respuesta ){

					//console.log(respuesta.administrador);
					self.cargando = false;

					self.admin = respuesta.administrador;
					d.resolve();

				});

			return d.promise;

		},

		guardar: function( admin ){

			var d = $q.defer();


			$http.post('model/admin/post.admin.guardar.php' , admin )
				.success(function( respuest ){

					 //console.log( respuest );
					self.err = respuest.err;
					d.resolve();

				});

			return d.promise;

		},


		cargarPagina: function( pag ){

			var d = $q.defer();

			$http.get('model/admin/get.administradores.php?pag=' + pag )
				.success(function( data ){

					self.err           = data.err;
					self.conteo        = data.conteo;
					self.administradores   = data.usuarios;
					self.pag_actual    = data.pag_actual;
					self.pag_siguiente = data.pag_siguiente;
					self.pag_anterior  = data.pag_anterior;
					self.total_paginas = data.total_paginas;
					self.paginas       = data.paginas;

					//console.log(data);
					return d.resolve();
				});



			return d.promise;
		},


	};


	return self;


}]);