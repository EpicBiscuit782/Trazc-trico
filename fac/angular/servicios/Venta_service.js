var app = angular.module('coeplimApp.venta',[]);


app.factory('Venta', ['$http', '$q', function($http, $q){

	var self = {

		'cargando'		: false,
		'err'     		: false,
		'conteo' 		: 0,
		'venta' 		: [],
		'ventAnual' 		: [],
		'ventaComp'		: [],
		'pag_actual'    : 1,
		'pag_siguiente' : 1,
		'pag_anterior'  : 1,
		'total_paginas' : 1,
		'paginas'	    : [],
		'total'			: [],


		guardar_venta: function( venta ){

			var d = $q.defer();


			$http.post('model/venta/post.guardar.venta.php', venta )
				.success(function( respuest ){

					 //console.log( respuest );
					//self.cargarPagina( self.pag_actual  );
					d.resolve();

				});

			return d.promise;

		},

		totalComp: function(){

			var d = $q.defer();


			$http.post('model/venta/get.venta_comp.php')
				.success(function( respuest ){

					 //console.log( respuest );
					 self.cargando = false;

					self.ventaComp = respuest.venta;
					//self.cargarPagina( self.pag_actual  );
					d.resolve();

				});

			return d.promise;

		},

		totalV: function(){

			var d = $q.defer();


			$http.post('model/venta/get.Total_venta.php')
				.success(function( respuest ){

					 //console.log( respuest );
					 self.cargando = false;

					self.total = respuest.total;
					//self.cargarPagina( self.pag_actual  );
					d.resolve();

				});

			return d.promise;

		},

		reporte_ventas_anual: function( year){
			var d = $q.defer();


			$http.post('model/venta/ventas_anual.php' , year )
				.success(function( respuesta ){

					//console.log( respuesta );
					self.ventAnual = respuesta.repVenta;
					//console.log(respuesta.reporte);
					d.resolve();

				});

			return d.promise;
		},

		report_venta_parcela_anual: function( info ){
			var d = $q.defer();

			$http.post('model/venta/venta_parcela_anual.php' , info)
				.success(function( respuesta ){

					//console.log( respuesta );
					self.ventAnual = respuesta.repVenta;
					//console.log(respuesta.reporte);
					d.resolve();

				});

			return d.promise;
		},



	};


	return self;


}]);
