var app = angular.module('coeplimApp.equipo',[]);


app.factory('Equipo', ['$http', '$q', function($http, $q){

	var self = {

		'cargando'		: false,
		'err'     		: false,
		'conteo' 		: 0,
		'administradores' 	: [],
        'equipo' : "",
		'pag_actual'    : 1,
		'pag_siguiente' : 1,
		'pag_anterior'  : 1,
		'total_paginas' : 1,
		'paginas'	    : [],

		buscar: function( parametro ){

			var d = $q.defer();

			self.cargando = true;

			$http.get('model/equipo/get.equipo.php?id=' + parametro )
				.success(function( respuesta ){
					self.cargando = false;

					self.equipo = respuesta.miembro;
					d.resolve();

				});

			return d.promise;

		},

		guardarM: function( equipo ){

			var d = $q.defer();


			$http.post('model/equipo/post.equipo.guardar.php' , equipo )
				.success(function( respuest ){

					self.err = respuest.err;
					d.resolve();

				});

			return d.promise;

		},

		//======>._.<EpicBiscuit782=========

        guardarP: function( pcc ){

			var d = $q.defer();


			$http.post('model/equipo/post.pcc.guardar.php' , pcc )
				.success(function( respuest ){

					self.err = respuest.err;
					d.resolve();

				});

			return d.promise;

		},
			//Guardar Peligros Criticos
        getPCCs: function(){

			var d = $q.defer();

			self.cargando = true;

			$http.get('model/equipo/get.pccs.php')
				.success(function( respuesta ){

					self.cargando = false;

					self.pccs = respuesta.pccs;
					d.resolve();

				});

			return d.promise;

		},
			//Guardar Peligros Potenciales
		guardarPE: function( pp ){

			var d = $q.defer();


			$http.post('model/equipo/post.pp.guardar.php' , pp )
				.success(function( respuest ){

					self.err = respuest.err;
					d.resolve();

				});

			return d.promise;

		},
			//=====Obtener vizualizacion de Puntos criticos
	/*	getCriticos: function( pag ){

			var d = $q.defer();

			$http.get('model/equipo/get.pcc.php?pag=' + pag )
				.success(function( data ){

					self.err           = data.err;
					self.conteo        = data.conteo;
					self.Criticos	   = data.critico;
					self.pag_actual    = data.pag_actual;
					self.pag_siguiente = data.pag_siguiente;
					self.pag_anterior  = data.pag_anterior;
					self.total_paginas = data.total_paginas;
					self.paginas       = data.paginas;

					return d.resolve();
				});



			return d.promise;
		}, */
		
		
//===========================================================
        
        
		getControles: function( pag ){

			var d = $q.defer();

			$http.get('model/equipo/get.controles.php?pag=' + pag )
				.success(function( data ){

					self.err           = data.err;
					self.conteo        = data.conteo;
					self.controles	   = data.control;
					self.pag_actual    = data.pag_actual;
					self.pag_siguiente = data.pag_siguiente;
					self.pag_anterior  = data.pag_anterior;
					self.total_paginas = data.total_paginas;
					self.paginas       = data.paginas;

					return d.resolve();
				});



			return d.promise;
		},


		cargarPagina: function( pag ){

			var d = $q.defer();

			$http.get('model/equipo/get.miembros.php?pag=' + pag )
				.success(function( data ){

					self.err           = data.err;
					self.conteo        = data.conteo;
					self.miembros      = data.usuarios;
					self.pag_actual    = data.pag_actual;
					self.pag_siguiente = data.pag_siguiente;
					self.pag_anterior  = data.pag_anterior;
					self.total_paginas = data.total_paginas;
					self.paginas       = data.paginas;

					return d.resolve();
				});

			return d.promise;
		},

	};
	return self;
}]);