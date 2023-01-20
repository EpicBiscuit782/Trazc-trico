var app = angular.module('coeplimApp.antecedentes',[]);


app.factory('Antecedente', ['$http', '$q', function($http, $q){

	var self = {

		'cargando'		: false,
		'err'     		: false,
		'conteo' 		: 0,
		'controles' 		: [],
		'pag_actual'    : 1,
		'pag_siguiente' : 1,
		'pag_anterior'  : 1,
		'total_paginas' : 1,
		'paginas'	    : [],

		buscar: function( parametro ){

			var d = $q.defer();

			self.cargando = true;

			$http.get('model/huertos/get.antecedente.buscar.php?id=' + parametro )
				.success(function( respuest ){

					self.cargando = false;

					self.control = respuest.control;
					d.resolve();

				});

			return d.promise;

		},

		guardar: function( ant ){

			var d = $q.defer();

        $http.post('model/huertos/post.antecedente.guardar.php' , ant, {
			transformRequest:angular.identity, 
			headers: {'Content-Type':undefined, 'Process-Data': false}
		}).success(function( respuest ){
            self.err = respuest.err;
            d.resolve();
        });
			return d.promise;
		},


		cargarPagina: function( pag ){

			var d = $q.defer();

			$http.get('model/huertos/get.antecedentes.php?pag=' + pag )
				.success(function( data ){

					self.err           = data.err;
					self.conteo        = data.conteo;
					self.controles	   = data.control;
					self.pag_actual    = data.pag_actual;
					self.pag_siguiente = data.pag_siguiente;
					self.pag_anterior  = data.pag_anterior;
					self.total_paginas = data.total_paginas;
					self.paginas       = data.paginas;

					//console.log(self.controles);
					return d.resolve();
				});



			return d.promise;
		},
        
        getAnt: function( id ){

			var d = $q.defer();

			$http.get('model/huertos/get.antecedente.php?id=' + id )
				.success(function( data ){

                    self.ant = data.ant;

					return d.resolve();
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