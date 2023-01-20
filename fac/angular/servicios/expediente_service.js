var app = angular.module('coeplimApp.expediente',[]);


app.factory('Expediente', ['$http', '$q', function($http, $q){

	var self = {

		'cargando'		: false,
		'err'     		: false,
		'conteo' 		: 0,
		'cosecha' 		: [],
		'maleza' 		: [],
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

					//console.log(self.variedades);
					return d.resolve();
				});

			return d.promise;
		},
		
		getCosecha: function( parametro ){

			var d = $q.defer();

			self.cargando = true;

			$http.get('model/cosecha/detalle.php?id=' + parametro )
				.success(function( respuest ){

					//console.log(respuest);
					self.cargando = false;

					self.produccion = respuest.produccion;
					self.gastosCosec = respuest.gastos;
					d.resolve();

				});

			return d.promise;

		},

		buscarMunicipio: function( parametro ){

			var d = $q.defer();

			self.cargando = true;

			$http.get('model/trazabilidad/getMunicipio.php?id=' + parametro )
				.success(function( respuest ){

					//console.log(respuest);
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

					//console.log(respuest);
					self.cargando = false;

					self.produccion = respuest.produccion;
					d.resolve();

				});

			return d.promise;

		},

		guardar_cosecha: function( cosecha ){

			var d = $q.defer();


			$http.post('model/cosecha/post.cosecha.guardar.php' , cosecha )
				.success(function( respuest ){

					 //console.log( respuest );
					self.err = respuest.err;
					d.resolve();

				});

			return d.promise;

		},

		reporte_gral: function( fechas){
			var d = $q.defer();


			$http.post('model/reportes/expediente.php' , fechas )
				.success(function( respuesta ){

					self.cosecha = respuesta.reporte;
					self.gastosCosec = respuesta.gastos;
					self.gastosVarios = respuesta.gastos_varios;
					self.riego = respuesta.riego;
					self.compra = respuesta.compra;
					self.maleza = respuesta.maleza;
					self.insecticida = respuesta.insecticida;
					self.fungicida = respuesta.fungicida;
					self.fertilizante = respuesta.fertilizante;
					self.fertilizante_suelo = respuesta.fertilizante_suelo;
					
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

					 //console.log( respuest );
					 self.cargando = false;

					self.cosecha = respuest.repCosecha;
					//self.cargarPagina( self.pag_actual  );
					d.resolve();

				});

			return d.promise;

		},

		repCosechaAnual: function(info){

			var d = $q.defer();

			$http.post('model/cosecha/cosechaAnual.php', info)
				.success(function( respuest ){

					 //console.log( respuest );
					 self.cargando = false;

					self.cosecha = respuest.repCosecha;
					//self.cargarPagina( self.pag_actual  );
					d.resolve();

				});

			return d.promise;

		},

		repCosechaTotal: function(info){

			var d = $q.defer();

			$http.post('model/produccion/getCosecha.php', info)
				.success(function( respuest ){

					 //console.log( respuest );
					 self.cargando = false;

					self.cosecha = respuest.repCosecha;
					//self.cargarPagina( self.pag_actual  );
					d.resolve();

				});

			return d.promise;

		},

		repCosechaMunicipio: function(info){

			var d = $q.defer();

			$http.post('model/produccion/getCosechaMunicipio.php', info)
				.success(function( respuest ){

					 //console.log( respuest );
					 self.cargando = false;

					self.cosecha = respuest.repCosecha;
					//self.cargarPagina( self.pag_actual  );
					d.resolve();

				});

			return d.promise;

		},
        
        getExcel: function( parametro ){

			var d = $q.defer();

			self.cargando = true;

			$http.get('model/reportes/excel.php?id=' + parametro )
				.success(function( respuest ){

					self.cargando = false;

					self.control_maleza = respuest.control_maleza;
					self.control_maleza_mes = respuest.control_maleza_mes;
					self.aplicacion_herbicida_mes = respuest.aplicacion_herbicida_mes;
                    self.prod_cos = respuest.prod_cos;
                    self.prod_cos_mes = respuest.prod_cos_mes;
                    self.gastos_cos_mes = respuest.gastos_cos_mes;
                    self.insecticida = respuest.insecticida;
                    self.fungicida = respuest.fungicida;
                    self.fertilizante = respuest.fertilizante;
                    self.fertilizante_suelo = respuest.fertilizante_suelo;
                    self.insecticida_mes = respuest.insecticida_mes;
                    self.fungicida_mes = respuest.fungicida_mes;
                    self.fertilizante_mes = respuest.ferti_mes;
                    self.fertilizante_suelo_mes = respuest.ferti_suelo_mes;
                	self.gastos_cos = respuest.gastos_cos;
					self.gastos_var = respuest.gastos_var;
					self.gastos_var_mes = respuest.gastos_var_mes;
					self.riego = respuest.riego;
					self.riego_mes = respuest.riego_mes;
					self.a_suelo = respuest.a_suelo;
					self.a_foliar = respuest.a_foliar;
					self.parcela = respuest.parcela;
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
					self.macheteo_mes = respuest.macheteo_mes;
					self.rastreo_mes = respuest.rastreo_mes;
					d.resolve();

				});

			return d.promise;

		},


	};


	return self;

}]);