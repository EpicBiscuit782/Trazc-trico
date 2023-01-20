var app = angular.module('coeplimApp.noticia',[]);


app.factory('Noticia', ['$http', '$q', function($http, $q){

	var self = {

		'cargando'		: false,
		'err'     		: false,
		'conteo' 		: 0,
		'noticias' 		: [],
    'noticia'   : '',
		'pag_actual'    : 1,
		'pag_siguiente' : 1,
		'pag_anterior'  : 1,
		'total_paginas' : 1,
		'paginas'	    : [],


		buscar: function( parametro ){

			var d = $q.defer();

			self.cargando = true;

			$http.get('model/noticias/get.noticia.buscar.php?id=' + parametro )
				.success(function( respuest ){

					//console.log(respuest);
					self.cargando = false;

					self.noticia = respuest.noticia;
					d.resolve();

				});

			return d.promise;

		},

		guardar: function( noticias ){

			var d = $q.defer();

			//console.log("something");

			$http.post('model/noticias/post.noticia.guardar.php' , noticias )
				.success(function( respuest ){

					 //console.log( respuest );
					self.err = respuest.err;
					d.resolve();

				});

			return d.promise;

		},


		cargarPagina: function( pag ){

			var d = $q.defer();

			$http.get('model/noticias/get.Noticias.php?pag=' + pag )
				.success(function( data ){

					self.err           = data.err;
					self.conteo        = data.conteo;
					self.noticias	     = data.noticia;
					self.pag_actual    = data.pag_actual;
					self.pag_siguiente = data.pag_siguiente;
					self.pag_anterior  = data.pag_anterior;
					self.total_paginas = data.total_paginas;
					self.paginas       = data.paginas;

					//console.log(self.noticias);
					return d.resolve();
				});



			return d.promise;
		},



	};


	return self;


}]);
