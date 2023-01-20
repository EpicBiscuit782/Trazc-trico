var app = angular.module('coeplimApp.tipo_enfermedad',[]);


app.factory('TipoEnfermedad', ['$http', '$q', function($http, $q){

	var self = {

		'cargando'		: false,
		'err'     		: false,
		'conteo' 		: 0,
		'tipo_enfermedades' 	: [],
		'tipo_enfermedad' 	: '',
		'pag_actual'    : 1,
		'pag_siguiente' : 1,
		'pag_anterior'  : 1,
		'total_paginas' : 1,
		'paginas'	    : [],

		all: function(){

			var d = $q.defer();

			self.cargando = true;

			$http.post('model/tipo_enfermedad/all.php')
				.success(function( respuest ){

					//console.log(respuest);
					self.cargando = false;

					self.tipo_enfermedades = respuest.tipo_enfermedades;
					d.resolve();

				});

			return d.promise;

		},

		buscar: function( parametro ){

			var d = $q.defer();

			self.cargando = true;

			$http.get('model/tipo_enfermedad/get_tipo_enfermedad.buscar.php?id=' + parametro )
				.success(function( respuest ){

					//console.log(respuest);
					self.cargando = false;

					self.tipo_enfermedad = respuest.tipo_enfermedad;
					d.resolve();

				});

			return d.promise;

		},

		guardar: function( tipo_enfermedad ){

			var d = $q.defer();

			//console.log("something");

			$http.post('model/tipo_enfermedad/post.tipo_enfermedad.guardar.php' , tipo_enfermedad)
				.success(function( respuest ){

					 //console.log( respuest );
					self.err = respuest.err;
					d.resolve();

				});

			return d.promise;

		},


		cargarPagina: function( pag ){

			var d = $q.defer();

			$http.get('model/tipo_enfermedad/get.tipo_enfermedades.php?pag=' + pag )
				.success(function( data ){

					self.err           = data.err;
					self.conteo        = data.conteo;
					self.tipo_enfermedades    = data.tipo_enfermedad;
					self.pag_actual    = data.pag_actual;
					self.pag_siguiente = data.pag_siguiente;
					self.pag_anterior  = data.pag_anterior;
					self.total_paginas = data.total_paginas;
					self.paginas       = data.paginas;

					//console.log(self.variedades);
					return d.resolve();
				});



			return d.promise;
		},

		


	};


	return self;


}]);