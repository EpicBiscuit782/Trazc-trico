var app = angular.module('coeplimApp.nutricion',[]);


app.factory('Nutricion', ['$http', '$q', function($http, $q){

	var self = {

		fecha: new Date(),
		id_parcela: '',
		tipo: '',
		detalle: [],
		nutricion: [],
		detalleNut: [],

		'cargando'		: false,
		'err'     		: false,
		'conteo' 		: 0,
		'nutricions' 	: [],
		'pag_actual'    : 1,
		'pag_siguiente' : 1,
		'pag_anterior'  : 1,
		'total_paginas' : 1,
		'paginas'	    : [],

		new : function(){
			self.detalle = [];
		},

		agregar_detalle: function( agregar ){

			self.detalle.push( agregar );

			//self.recalcular();
			//console.log(agregar);

		},



		buscar: function( parametro ){

			var d = $q.defer();

			self.cargando = true;

			$http.get('model/nutricion/get.nutricion.buscar.php?id=' + parametro )
				.success(function( respuest ){

					//console.log(respuest);
					self.cargando = false;

					self.nutricions = respuest.nutricion;
					d.resolve();

				});

			return d.promise;

		},

		guardar: function(nutricion){

			var d = $q.defer();

			$http.post('model/nutricion/post.nutricion.guardar.php' , nutricion )
				.success(function( respuest ){

					self.err = respuest.err;
					d.resolve();

				});

			return d.promise;

		},
        
        agregar_det: function(nutricion){

			var d = $q.defer();

			$http.post('model/nutricion/post.det_nutricion.guardar.php' , nutricion )
				.success(function( respuest ){

					self.err = respuest.err;
					d.resolve();

				});

			return d.promise;

		},


		cargarPagina: function( pag ){

			var d = $q.defer();

			$http.get('model/nutricion/get.nutricions.php?pag=' + pag )
				.success(function( data ){

					self.err           = data.err;
					self.conteo        = data.conteo;
					self.nutricions	   = data.nutricion;
					self.pag_actual    = data.pag_actual;
					self.pag_siguiente = data.pag_siguiente;
					self.pag_anterior  = data.pag_anterior;
					self.total_paginas = data.total_paginas;
					self.paginas       = data.paginas;

					return d.resolve();
				});



			return d.promise;
		},

		getNutricion : function(id){ // gasto parcela y fecha

			var d = $q.defer();

			$http.get('model/nutricion/get.nutricion.php?id=' + id)
					.success(function( respuest ){
					self.cargando = false;

					self.nutricion = respuest.det;
					d.resolve();
					});

			return d.promise;
		},
        
        
        getAplicaciones : function(){ 

			var d = $q.defer();

			$http.get('model/nutricion/get.aplicaciones.php')
					.success(function( respuest ){
					self.cargando = false;

					self.aplicaciones = respuest.aplicaciones;
					d.resolve();
					});

			return d.promise;
		},

		detalleNutricion : function(id){ // detalle gastos productor

			var d = $q.defer();

			$http.get('model/nutricion/getDetalle.php?id='+ id)
					.success(function( respuest ){
						//console.log(respuest);
					self.cargando = false;

					self.detalleNut = respuest.det;
					d.resolve();
					});

			return d.promise;
		},
        eliminar_det_nut: function( det){

			var d = $q.defer();


			$http.post('model/nutricion/post.det_nut.eliminar.php' , det)
				.success(function( respuest ){

					self.err = respuest.err;
					d.resolve();

				});

			return d.promise;

		}, 

	};


	return self;


}]);