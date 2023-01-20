var app = angular.module('coeplimApp.tablero',[]);


app.factory('Tablero', ['$http', '$q', function($http, $q){

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


		getInfo: function(fechas){
			var d = $q.defer();


			$http.post('model/tablero/tablero.php' , fechas)
				.success(function( respuesta ){

					self.ventas = respuesta.ventas;
					self.gastos = respuesta.gastos;
					self.gastos_variables = respuesta.gastos_variables;
					self.gastos_cosecha = respuesta.gastos_cosecha;
					self.compras = respuesta.compras;
					self.costo_insumo = respuesta.costo_insumo;
					self.costo_insumo2 = respuesta.costo_insumo2;
					self.parcela = respuesta.parcela;
					self.riego = respuesta.riego;
					
					d.resolve();

				});

			return d.promise;
		},


	};


	return self;

}]);