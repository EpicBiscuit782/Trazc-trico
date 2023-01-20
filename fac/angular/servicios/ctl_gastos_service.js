var app = angular.module('coeplimApp.ctl_gastos',[]);


app.factory('Ctl_gastos', ['$http', '$q', function($http, $q){

	var self = {

		'cargando'		: false,
		'err'     		: false,
		'conteo' 		: 0,
		'ctl_gastos' 	: [],
		'ctl_gasto' 	: '',
		'pag_actual'    : 1,
		'pag_siguiente' : 1,
		'pag_anterior'  : 1,
		'total_paginas' : 1,
		'paginas'	    : [],

		all: function(){
			var d = $q.defer();


			$http.post('model/ctl_gasto/get.tipo_gasto.php')
				.success(function( respuesta ){

					//console.log(respuesta);
					self.cargando = false;

					self.ctl_gastos = respuesta.tipo_gastos;
					//console.log(self.ctl_gastos);
					d.resolve();

				});

			return d.promise;
		},

		buscar: function( parametro ){

			var d = $q.defer();

			self.cargando = true;

			$http.get('model/ctl_gasto/get.ctl_gasto.buscar.php?id=' + parametro )
				.success(function( respuesta ){

					//console.log(respuesta.ctl_gastos);
					self.cargando = false;

					self.ctl_gasto = respuesta.ctl_gastos;
					//console.log(self.ctl_gastos);
					d.resolve();

				});

			return d.promise;

		},

		cbo_cosecha: function(){
			var d = $q.defer();


			$http.post('model/ctl_gasto/get.tipo.cosecha.php')
				.success(function( respuesta ){

					//console.log(respuesta);
					self.cargando = false;

					self.ctl_gastos = respuesta.ctl_gastos;
					//console.log(self.ctl_gastos);
					d.resolve();

				});

			return d.promise;
		},

		guardar: function( ctl_gasto ){

			var d = $q.defer();

			$http.post('model/ctl_gasto/post.ctl_gastoguardar.php' , ctl_gasto )
				.success(function( respuest ){

					 //console.log( respuest );
					self.err = respuest.err;
					d.resolve();

				});

			return d.promise;

		},


		cargarPagina: function( pag ){

			var d = $q.defer();

			$http.get('model/ctl_gasto/get.ctl_gastos.php?pag=' + pag )
				.success(function( data ){

					self.err           = data.err;
					self.conteo        = data.conteo;
					self.ctl_gastos    = data.ctl_gastos;
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