var app = angular.module('coeplimApp.parcelas',[]);


app.factory('Parcelas', ['$http', '$q', function($http, $q){

	var self = {

		'cargando'		: false,
		'err'     		: false,
		'conteo' 		: 0,
		'parcelas' 		: [],
		'parcela' 		: '',
		'produccion' 		: [],
		'pag_actual'    : 1,
		'pag_siguiente' : 1,
		'pag_anterior'  : 1,
		'total_paginas' : 1,
		'paginas'	    : [],

		all: function( ){

			var d = $q.defer();

			self.cargando = true;

			$http.post('model/parcelas/all.php' )
				.success(function( respuest ){

					//console.log(respuest.parcela);
					self.cargando = false;

					self.parcelas = respuest.parcelas;
					//console.log(self.parcelas);
					d.resolve();

				});

			return d.promise;

		},

		buscar: function( parametro ){

			var d = $q.defer();

			self.cargando = true;

			$http.get('model/parcelas/get.parcela.buscar.php?id=' + parametro )
				.success(function( respuest ){

					//console.log(respuest.parcela);
					self.cargando = false;

					self.parcela = respuest.parcela;
					//console.log(self.parcelas);
					d.resolve();

				});

			return d.promise;

		},
        
        total_parcelas: function( ){

			var d = $q.defer();

			self.cargando = true;

			$http.get('model/parcelas/get.total_parcelas.php')
				.success(function( respuest ){

					//console.log(respuest.parcela);
					self.cargando = false;

					self.total = respuest;
					//console.log(self.parcelas);
					d.resolve();

				});

			return d.promise;

		},

		guardar: function( parcelas ){

			var d = $q.defer();

			$http.post('model/parcelas/post.parcelaguardar.php' , parcelas )
				.success(function( respuest ){

					 //console.log( respuest );
					self.err = respuest.err;
					d.resolve();

				});

			return d.promise;

		},


		cargarPagina: function( pag ){

			var d = $q.defer();

			$http.get('model/parcelas/get.parcelas.php?pag=' + pag )
				.success(function( data ){

					self.err           = data.err;
					self.conteo        = data.conteo;
					self.parcelas     = data.parcela;
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

		seleccionar: function( ){

			var d = $q.defer();

			self.cargando = true;

			$http.post('model/parcelas/get.select.parcela.php')
				.success(function( respuest ){

					//console.log(respuest);
					self.cargando = false;

					self.parcelas = respuest;
					d.resolve();

				});

			return d.promise;

		},


		global: function( parametro ){
			$http.get('model/parcelas/global.php?id=', parametro)
					.success(function( respuest ){

					});
		},

		parcelaProductor : function(){ //consulta gral de parcelas por productor

			var d = $q.defer();

			$http.post('model/reportes/getParcelasProd.php')
					.success(function( respuest ){
					//console.log(respuest);
					self.cargando = false;

					self.parcelas = respuest.parcelas;
					d.resolve();
					});

			return d.promise;
		},

		parcelaProduccion : function(){ // produccion total por parcelas de un productor

			var d = $q.defer();

			$http.post('model/reportes/getParcelasProduccion.php')
					.success(function( respuest ){
						//console.log(respuest);
					self.cargando = false;

					self.produccion = respuest.parcelas;
					d.resolve();
					});

			return d.promise;
		},

		parcelaProduccionInd : function(){ // produccion total por parcelas de un productor

			var d = $q.defer();

			$http.post('model/reportes/getParcelasProdInd.php')
					.success(function( respuest ){
					//console.log(respuest);
					self.cargando = false;

					self.produccion = respuest.parcelas;
					d.resolve();
					});

			return d.promise;
		}



};
	return self;


}]);