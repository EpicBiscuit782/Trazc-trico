var app = angular.module('coeplimApp.tipo_gastos',[]);


app.factory('TipoGasto', ['$http', '$q', function($http, $q){

	var self = {

		'cargando'		: false,
		'err'     		: false,
		'conteo' 		: 0,
		'tipo_gastos' 	: [],
		'tipo_gasto' 	: '',
		'actividades'	: [],
		'pag_actual'    : 1,
		'pag_siguiente' : 1,
		'pag_anterior'  : 1,
		'total_paginas' : 1,
		'paginas'	    : [],


		all: function(){
			var d = $q.defer();

			$http.post('model/tipo_gasto/all.php' )
				.success(function( respuesta ){

					 //console.log( respuesta );
					self.tipo_gastos = respuesta.tipo_gastos;
					d.resolve();

				});

			return d.promise;
		},
		
		sinCosecha: function(){
			var d = $q.defer();

			$http.post('model/tipo_gasto/allExcosecha.php' )
				.success(function( respuesta ){

					 //console.log( respuesta );
					self.tipo_gastos = respuesta.tipo_gastos;
					d.resolve();

				});

			return d.promise;
		},

		tipos: function(parametro){
			var d = $q.defer();

			$http.get('model/Gastos/getActividades.php?id=' + parametro )
				.success(function( respuesta ){

					 //console.log( respuesta );
					self.actividades = respuesta.tipos;
					d.resolve();

				});

			return d.promise;
		},

		buscar: function( parametro ){

			var d = $q.defer();

			self.cargando = true;

			$http.get('model/tipo_gasto/get.tipo_gasto.buscar.php?id=' + parametro )
				.success(function( respuesta ){

					//console.log(respuesta.tipo_gasto);
					self.cargando = false;

					self.tipo_gasto = respuesta.tipo_gasto;
					d.resolve();

				});

			return d.promise;

		},

		guardar: function( tipo_gasto ){

			var d = $q.defer();

			$http.post('model/tipo_gasto/post.tipo_gastoguardar.php' , tipo_gasto )
				.success(function( respuesta ){

					 //console.log( respuesta );
					//self.cargarPagina( self.pag_actual  );
					self.err = respuesta.err;
					d.resolve();

				});

			return d.promise;

		},


		cargarPagina: function( pag ){

			var d = $q.defer();

			$http.get('model/tipo_gasto/get.tipo_gasto.php?pag=' + pag )
				.success(function( data ){

					self.err           = data.err;
					self.conteo        = data.conteo;
					self.tipo_gastos   = data.tipo_gasto;
					self.pag_actual    = data.pag_actual;
					self.pag_siguiente = data.pag_siguiente;
					self.pag_anterior  = data.pag_anterior;
					self.total_paginas = data.total_paginas;
					self.paginas       = data.paginas;

					//console.log(self.parcelas);
					return d.resolve();
				});



			return d.promise;
		}
}
	return self;


}]);