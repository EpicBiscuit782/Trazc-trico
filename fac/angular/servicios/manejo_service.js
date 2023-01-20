var app = angular.module('coeplimApp.manejos',[]);

app.factory('Manejo', ['$http', '$q', function($http, $q){

	var self = {

		'fecha' : new Date(),
		'inicio' : new Date(),
		'fin' : new Date(),
		'siguiente' : new Date(),
		'id_enfermedad' : '',
		'id_responsable' : '',
		'id_parcela' : '',
		'detalle' : [],
		'manejo' : '',
		'cargando'		: false,
		'err'     		: false,
		'conteo' 		: 0,
		'manejos' 		: [],
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


		borrar_detalle: function( item ){

			var index = self.detalle.indexOf(item);
  			self.detalle.splice(index, 1);

  			self.recalcular();
		},

		

		guardar: function(manejo){

			var d = $q.defer();

			$http.post('model/manejo/post.manejo.guardar.php', manejo)
				.success(function( respuesta ){

					 //console.log(respuesta);
					self.err = respuesta.err;
					d.resolve();
				});

			return d.promise;

		},


		cargarPagina: function( pag ){

			var d = $q.defer();

			$http.get('model/manejo/get.manejos.php?pag=' + pag )
				.success(function( data ){

					self.err           = data.err;
					self.conteo        = data.conteo;
					self.manejos	   = data.manejo;
					self.det_manejos   = data.detalle_manejos;
					self.pag_actual    = data.pag_actual;
					self.pag_siguiente = data.pag_siguiente;
					self.pag_anterior  = data.pag_anterior;
					self.total_paginas = data.total_paginas;
					self.paginas       = data.paginas;

					return d.resolve();
				});



			return d.promise;
		},

		getManejo: function( parametro ){

			var d = $q.defer();

			self.cargando = true;

			$http.get('model/manejo/getManejo.php?id=' + parametro )
				.success(function( respuest ){

					//console.log(respuest);
					self.cargando = false;

					self.manejo = respuest.manejo;
					self.detalle = respuest.detalle;
					d.resolve();

				});

			return d.promise;

		},
        
        
		getManejoGastos: function( parametro ){

			var d = $q.defer();

			self.cargando = true;

			$http.get('model/manejo/getManejoGastos.php?id=' + parametro )
				.success(function( respuest ){

					//console.log(respuest);
					self.cargando = false;

					self.gastos = respuest.gastos;
					self.macheteo = respuest.macheteo;
					self.rastreo = respuest.rastreo;
					d.resolve();

				});

			return d.promise;

		},



	};


	return self;


}]);