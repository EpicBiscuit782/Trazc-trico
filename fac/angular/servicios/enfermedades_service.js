var app = angular.module('coeplimApp.enfermedades',[]);


app.factory('Enfermedad', ['$http', '$q', function($http, $q){

	var self = {

		'cargando'		: false,
		'err'     		: false,
		'conteo' 		: 0,
		'enfermedades' 	: [],
		'enfermedad' 	: '',
		'tipo_enfermedad' 		: '',
		'pag_actual'    : 1,
		'pag_siguiente' : 1,
		'pag_anterior'  : 1,
		'total_paginas' : 1,
		'paginas'	    : [],

		buscar: function( parametro ){

			var d = $q.defer();

			self.cargando = true;

			$http.get('model/enfermedades/get.enfermedad.buscar.php?id=' + parametro )
				.success(function( respuest ){

					//console.log(respuest);
					self.cargando = false;

					self.enfermedad = respuest.enfermedad;
					d.resolve();

				});

			return d.promise;

		},
        
        buscar_reco: function( parametro ){

			var d = $q.defer();

			self.cargando = true;

			$http.get('model/enfermedades/get.recomendados.buscar.php?id=' + parametro )
				.success(function( respuest ){

					self.cargando = false;

					self.recomendados = respuest.recomendados;
					d.resolve();

				});

			return d.promise;

		},

		guardar: function( enfermedad ){

			var d = $q.defer();

			$http.post('model/enfermedades/post.enfermedad.guardar.php' , enfermedad )
				.success(function( respuest ){
					d.resolve();

				});

			return d.promise;

		},
        
        guardarReco: function( recomendados ){

			var d = $q.defer();

			$http.post('model/enfermedades/post.enfermedad.guardarReco.php' , recomendados )
				.success(function( respuest ){
					d.resolve();

				});

			return d.promise;

		},
        
		cargarPagina: function( pag ){

			var d = $q.defer();

			$http.get('model/enfermedades/get.enfermedades.php?pag=' + pag )
				.success(function( data ){

					self.err           = data.err;
					self.conteo        = data.conteo;
					self.enfermedades    = data.enfermedad;
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
        
        pcc: function( pag ){

			var d = $q.defer();

			$http.get('model/enfermedades/get.pcc.php?pag=' + pag )
				.success(function( data ){

					self.err           = data.err;
					self.conteo        = data.conteo;
					self.pcc    = data.pcc;
					self.pag_actual    = data.pag_actual;
					self.pag_siguiente = data.pag_siguiente;
					self.pag_anterior  = data.pag_anterior;
					self.total_paginas = data.total_paginas;
					self.paginas       = data.paginas;

					return d.resolve();
				});

			return d.promise;
		},

		tipos: function(parametro){
			var d = $q.defer();
			//console.log("hola");

			$http.get('model/enfermedades/get_tipo_enfermedades.php?id=' + parametro )
				.success(function( respuesta ){

					//console.log( respuesta );
					self.enfermedades = respuesta.tipos;
					d.resolve();

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
