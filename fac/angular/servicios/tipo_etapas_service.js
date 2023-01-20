var app = angular.module('coeplimApp.tipo_etapas',[]);


app.factory('TipoEtapa', ['$http', '$q', function($http, $q){

	var self = {

		'cargando'		: false,
		'err'     		: false,
		'conteo' 		: 0,
		'tipo_etapas' 	: [],
		'tipo_etapa' 	: '',
		'actividades'	: [],
		'pag_actual'    : 1,
		'pag_siguiente' : 1,
		'pag_anterior'  : 1,
		'total_paginas' : 1,
		'paginas'	    : [],


		all: function(){
			var d = $q.defer();

			$http.post('model/tipo_etapa/all.php' )
				.success(function( respuesta ){

					 //console.log( respuesta );
					self.tipo_etapas = respuesta.tipo_etapas;
					d.resolve();

				});

			return d.promise;
		},
		

		buscar: function( parametro ){

			var d = $q.defer();

			self.cargando = true;

			$http.get('model/tipo_etapa/get.tipo_etapa.buscar.php?id=' + parametro )
				.success(function( respuesta ){

					//console.log(respuesta.tipo_etapa);
					self.cargando = false;

					self.tipo_etapa = respuesta.tipo_etapa;
					d.resolve();

				});

			return d.promise;

		},

		guardar: function( tipo_etapa ){

			var d = $q.defer();

			$http.post('model/tipo_etapa/post.tipo_etapaguardar.php' , tipo_etapa )
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

			$http.get('model/tipo_etapa/get.tipo_etapa.php?pag=' + pag )
				.success(function( data ){

					self.err           = data.err;
					self.conteo        = data.conteo;
					self.tipo_etapas   = data.tipo_etapa;
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