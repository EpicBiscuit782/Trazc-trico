var app = angular.module('coeplimApp.responsables',[]);


app.factory('Responsable', ['$http', '$q', function($http, $q){

	var self = {

		'cargando'		: false,
		'err'     		: false,
		'conteo' 		: 0,
		'responsables' 	: [],
		'responsable' 	: '',
		'pag_actual'    : 1,
		'pag_siguiente' : 1,
		'pag_anterior'  : 1,
		'total_paginas' : 1,
		'paginas'	    : [],

		all: function( ){

			var d = $q.defer();

			self.cargando = true;

			$http.post('model/responsable/all.php' )
				.success(function( respuest ){

					//console.log(respuest);
					self.cargando = false;

					self.responsables = respuest.responsables;
					d.resolve();

				});

			return d.promise;

		},

		buscar: function( parametro ){

			var d = $q.defer();

			self.cargando = true;

			$http.get('model/responsable/get.responsable.buscar.php?id=' + parametro )
				.success(function( respuest ){

					//console.log(respuest);
					self.cargando = false;

					self.responsable = respuest.responsable;
					d.resolve();

				});

			return d.promise;

		},

		guardar: function( responsable ){

			var d = $q.defer();


			$http.post('model/responsable/post.responsable.guardar.php' , responsable )
				.success(function( respuest ){

					 //console.log( respuest );
					self.err = respuest.err;
					d.resolve();

				});

			return d.promise;

		},


		cargarPagina: function( pag ){

			var d = $q.defer();

			$http.get('model/responsable/get.responsables.php?pag=' + pag )
				.success(function( data ){

					self.err           = data.err;
					self.conteo        = data.conteo;
					self.responsables   = data.responsable;
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

		cbo_proveedor: function(){

			var d = $q.defer();


			$http.post('model/proveedor/get.cbo.proveedores.php')
				.success(function( respuest ){

					 //console.log( respuest );
					self.proveedores = respuest.proveedor;
					d.resolve();

				});

			return d.promise;

		},



	};


	return self;


}]);