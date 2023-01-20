var app = angular.module('coeplimApp.cosecha',[]);


app.factory('Cosecha', ['$http', '$q', function($http, $q){

	var self = {

		'cargando'		: false,
		'err'     		: false,
		'conteo' 		: 0,
		'cosecha' 		: [],
		'gastosCosec' 		: [],
		'gastosVarios' 		: [],
		'gastos' 		: [],
		'riego' 		: "",
		'compra' 		: "",
		'pag_actual'    : 1,
		'pag_siguiente' : 1,
		'pag_anterior'  : 1,
		'total_paginas' : 1,
		'paginas'	    : [],
		'info': '', // id_parcela, municipio
		'produccion': '',

		general: function( pag ){

			var d = $q.defer();

			$http.get('model/cosecha/getCosecha.php?pag=' + pag )
				.success(function( data ){

					self.err           = data.err;
					self.conteo        = data.conteo;
					self.cosecha    = data.produccion;
					self.pag_actual    = data.pag_actual;
					self.pag_siguiente = data.pag_siguiente;
					self.pag_anterior  = data.pag_anterior;
					self.total_paginas = data.total_paginas;
					self.paginas       = data.paginas;

					return d.resolve();
				});

			return d.promise;
		},
		
		getCosecha: function( parametro ){

			var d = $q.defer();

			self.cargando = true;

			$http.get('model/cosecha/detalle.php?id=' + parametro )
				.success(function( respuest ){

					self.cargando = false;

					self.produccion = respuest.produccion;
					self.gastosCosec = respuest.gastos;
					d.resolve();

				});

			return d.promise;

		},
        
        getCosechas: function(){

			var d = $q.defer();

			self.cargando = true;

			$http.get('model/cosecha/get.cosechas.php' )
				.success(function( respuest ){

					self.cargando = false;

					self.produccion = respuest.repCosecha;
					d.resolve();

				});

			return d.promise;

		},

		buscarMunicipio: function( parametro ){

			var d = $q.defer();

			self.cargando = true;

			$http.get('model/trazabilidad/getMunicipio.php?id=' + parametro )
				.success(function( respuest ){

					self.cargando = false;

					self.info = respuest.municipio;
					d.resolve();

				});

			return d.promise;

		},

		buscarCode: function( parametro ){

			var d = $q.defer();

			self.cargando = true;

			$http.get('model/cosecha/buscar.cosecha.php?id=' + parametro )
				.success(function( respuest ){

					self.cargando = false;

					self.produccion = respuest.produccion;
					self.aplicaciones = respuest.aplicaciones;
					self.enfermedades = respuest.enfermedades;
					self.gastos = respuest.gastos;
					d.resolve();

				});

			return d.promise;

		},
        
        buscarHistorial: function( ){

			var d = $q.defer();

			self.cargando = true;

			$http.get('model/cosecha/buscar.historial.php')
				.success(function( respuest ){

					self.cargando = false;

					self.produccion = respuest.produccion;
					self.aplicaciones = respuest.aplicaciones;
					self.enfermedades = respuest.enfermedades;
					self.gastos = respuest.gastos;
					d.resolve();

				});

			return d.promise;

		},

		guardar_cosecha: function( cosecha ){

			var d = $q.defer();


			$http.post('model/cosecha/post.cosecha.guardar.php' , cosecha )
				.success(function( respuest ){

					self.err = respuest.err;
					d.resolve();

				});

			return d.promise;

		},		
        
        editar_cosecha: function( cosecha ){

			var d = $q.defer();


			$http.post('model/cosecha/post.cosecha.editar.php' , cosecha )
				.success(function( respuest ){

					self.err = respuest.err;
					d.resolve();

				});

			return d.promise;

		},        
        
        editar_gasto: function( gasto ){

			var d = $q.defer();


			$http.post('model/cosecha/post.gasto.editar.php' , gasto )
				.success(function( respuest ){

					self.err = respuest.err;
					d.resolve();

				});

			return d.promise;

		},
		
        eliminar_det_gasto: function( id_gasto ){

			var d = $q.defer();


			$http.post('model/cosecha/post.det_gasto.eliminar.php' , id_gasto )
				.success(function( respuest ){

					self.err = respuest.err;
					d.resolve();

				});

			return d.promise;

		},        
        
        
        eliminar_cosecha: function( cosecha ){

			var d = $q.defer();


			$http.post('model/cosecha/post.cosecha.eliminar.php' , cosecha )
				.success(function( respuest ){

					self.err = respuest.err;
					d.resolve();

				});

			return d.promise;

		},

		reporte_gral: function( fechas){
			var d = $q.defer();


			$http.post('model/reportes/reporteGral.php' , fechas )
				.success(function( respuesta ){

					self.cosecha = respuesta.reporte;
					self.gastosCosec = respuesta.gastos;
					self.gastosVarios = respuesta.gastos_varios;
					self.riego = respuesta.riego;
					self.compra = respuesta.compra;
					
					d.resolve();

				});

			return d.promise;
		},

		reporte_cosecha: function( fechas){
			var d = $q.defer();


			$http.post('model/reportes/reporteGralgastosCosecha.php' , fechas )
				.success(function( respuesta ){

					//console.log( respuesta );
					self.gastosCosec = respuesta.reporte;
					//console.log(self.cosecha);
					d.resolve();

				});

			return d.promise;
		},

		reporte_cosecha_anual: function( year){
			var d = $q.defer();

			$http.post('model/cosecha/gastos_cosecha_anual.php' , year )
				.success(function( respuesta ){

					//console.log( respuesta );
					self.gastosCosec = respuesta.reporte;
					//console.log(respuesta.reporte);
					d.resolve();

				});

			return d.promise;
		},

		repCosechaParcela: function(info){

			var d = $q.defer();

			$http.post('model/cosecha/cosechaParcela.php', info)
				.success(function( respuest ){

					 
					 self.cargando = false;

					self.cosecha = respuest.repCosecha;
					
					d.resolve();

				});

			return d.promise;

		},

		repCosechaAnual: function(info){

			var d = $q.defer();

			$http.post('model/cosecha/cosechaAnual.php', info)
				.success(function( respuest ){

					 
					 self.cargando = false;

					self.cosecha = respuest.repCosecha;
					
					d.resolve();

				});

			return d.promise;

		},

		repCosechaTotal: function(info){

			var d = $q.defer();

			$http.post('model/produccion/getCosecha.php', info)
				.success(function( respuest ){

					 
					 self.cargando = false;

					self.cosecha = respuest.repCosecha;
					
					d.resolve();

				});

			return d.promise;

		},

		repCosechaMunicipio: function(info){

			var d = $q.defer();

			$http.post('model/produccion/getCosechaMunicipio.php', info)
				.success(function( respuest ){

					 
					 self.cargando = false;

					self.cosecha = respuest.repCosecha;
					d.resolve();

				});

			return d.promise;

		},


	};


	return self;

}]);