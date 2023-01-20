var app = angular.module('coeplimApp.riegos',[]);

app.factory('Riego', ['$http', '$q', function($http, $q){

	var self = {

		fecha: new Date(),
		total: 0,
		detalle: [],

		'cargando'		: false,
		'err'     		: false,
		'conteo' 		: 0,
		'pag_actual'    : 1,
		'pag_siguiente' : 1,
		'pag_anterior'  : 1,
		'total_paginas' : 1,
		'paginas'	    : [],
		 riegos: [],
		 total: [],


		nuevo_riego: function(){

			self.fecha = new Date();
			self.total = 0;
			self.detalle = [];
			//console.log(self);

		},

		recalcular: function(){

			// Calcular los montos
			self.total = 0;

			for (item of self.detalle) {
			  	self.total += parseInt(item.total);
			  	//console.log(self.total);
			}



		},

		agregar_detalle: function( agregar ){

			self.detalle.push( agregar );

			//self.recalcular();
			//console.log(agregar);

		},


		borrar_detalle: function( item ){

			var index = self.detalle.indexOf(item);
  			self.detalle.splice(index, 1);

  			self.recalcular();
		},

		guardar_riegos: function(riegos){

			var d = $q.defer();

			$http.post('model/riego/post.riegos.guardar.php',riegos)
				.success(function(respuesta){

					//console.log(respuesta);
					self.err = respuesta.err;
					d.resolve();

				});


			return d.promise;

		},

		cargarPagina : function(pag){ // produccion total por parcelas de un productor

			var d = $q.defer();

			$http.get('model/riego/get.riegos.php?pag=' + pag)
					.success(function( data ){
					//console.log(data);
					self.cargando = false;

					self.riegos = data.riego;

					self.err           = data.err;
					self.conteo        = data.conteo;
					self.pag_actual    = data.pag_actual;
					self.pag_siguiente = data.pag_siguiente;
					self.pag_anterior  = data.pag_anterior;
					self.total_paginas = data.total_paginas;
					self.paginas       = data.paginas;
					d.resolve();
					});

			return d.promise;
		},

		totalRieg: function(){

			var d = $q.defer();


			$http.post('model/riego/get.total_riego.php')
				.success(function( respuest ){

					 //console.log( respuest );
					 self.cargando = false;

					self.total = respuest.total;
					//self.cargarPagina( self.pag_actual  );
					d.resolve();

				});

			return d.promise;

		},

		riegoParcela: function(){

			var d = $q.defer();

			$http.post('model/riego/get.riego_parcela.php')
				.success(function( respuest ){

					 //console.log( respuest );
					 self.cargando = false;

					self.riegos = respuest.riego;
					//self.cargarPagina( self.pag_actual  );
					d.resolve();

				});

			return d.promise;

		},

		repRiegoParcela: function(info){

			var d = $q.defer();

			$http.post('model/riego/riego_parcela_anual.php', info)
				.success(function( respuest ){

					 //console.log( respuest );
					 self.cargando = false;

					self.riegos = respuest.repRiego;
					//self.cargarPagina( self.pag_actual  );
					d.resolve();

				});

			return d.promise;

		},


		repRiegoAnual: function(info){

			var d = $q.defer();

			$http.post('model/riego/riego_anual.php', info)
				.success(function( respuest ){

					 //console.log( respuest );
					 self.cargando = false;

					self.riegos = respuest.repRiego;
					//self.cargarPagina( self.pag_actual  );
					d.resolve();

				});

			return d.promise;

		},

	};


	return self;

}]);