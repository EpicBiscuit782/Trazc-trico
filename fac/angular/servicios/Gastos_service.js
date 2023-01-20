var app = angular.module('coeplimApp.gastos',[]);

app.factory('Gastos', ['$http', '$q', function($http, $q){

	var self = {

		id_gasto: undefined,
		fecha: new Date(),
		subtotal: 0,
		id_parcela: undefined,
		detalle: [],
		gastos: [],
		gastosGral: [],
		gasto: '',
		ventaTot: [],
		riegos:'',
		riegosParc: [],
		compras:'',
		insumos : [],

		'cargando'		: false,
		'err'     		: false,
		'conteo' 		: 0,
		'pag_actual'    : 1,
		'pag_siguiente' : 1,
		'pag_anterior'  : 1,
		'total_paginas' : 1,
		'paginas'	    : [],

		nuevo_gasto: function(){

			self.id_gasto = undefined;
			self.fecha = new Date();
			self.subtotal = 0;
			self.id_parcela = undefined;
			self.detalle = [];
			//console.log(self);

		},

		recalcular: function(){

			// Calcular los montos
			self.subtotal = 0;

			for (item of self.detalle) {
			  	self.subtotal += parseFloat(item.dt_precio);
			}
		},

		agregar_detalle: function( agregar ){

			self.detalle.push( agregar );

			self.recalcular();

		},

		buscar_gasto: function( id ){

			var d = $q.defer();

			$http.get('model/ctl_gasto/get.ctl_gasto.buscar.php?id=' + id)
				.success( function( respuesta ){
					//console.log(respuesta);
					d.resolve( respuesta.ctl_gastos );

				});

			return d.promise;
		},

		borrar_detalle: function( item ){

			var index = self.detalle.indexOf(item);
  			self.detalle.splice(index, 1);

  			self.recalcular();
		},

		guardar_gastos: function(gastos){

			var d = $q.defer();

			$http.post('model/Gastos/post.gastos.guardar.php',gastos)
				.success(function(respuesta){
					self.err = respuesta.err;
					d.resolve();
				});


			return d.promise;

		},
        
        guardar_gasto: function(gasto){

			var d = $q.defer();

			$http.post('model/Gastos/post.gasto.guardar.php',gasto)
				.success(function(respuesta){
					self.err = respuesta.err;
					d.resolve();
				});


			return d.promise;

		},
        
        eliminar_gasto: function(id){

			var d = $q.defer();

			$http.post('model/Gastos/post.gasto.eliminar.php',id)
				.success(function(respuesta){
					self.err = respuesta.err;
					d.resolve();
				});


			return d.promise;

		},
        
        
        eliminar_gastos: function(id){

			var d = $q.defer();

			$http.post('model/Gastos/post.gastos.eliminar.php',id)
				.success(function(respuesta){
					self.err = respuesta.err;
					d.resolve();
				});


			return d.promise;

		},

		gastosProductor : function(pag){ // produccion total por parcelas de un productor

			var d = $q.defer();

			$http.get('model/reportes/getGastosProductor.php?pag='+ pag)
					.success(function( data ){
						//console.log(data);
						self.err           = data.err;
						self.conteo        = data.conteo;
						self.gastosGral    = data.gastos;
						self.pag_actual    = data.pag_actual;
						self.pag_siguiente = data.pag_siguiente;
						self.pag_anterior  = data.pag_anterior;
						self.total_paginas = data.total_paginas;
						self.paginas       = data.paginas;

					return d.resolve();
					});

			return d.promise;
		},

		gastoProductor : function(id){

			var d = $q.defer();

			$http.get('model/reportes/getDetalleGastoProduct.php?id=' + id)
					.success(function( respuest ){
					self.cargando = false;

					self.gasto = respuest.gastos;
					d.resolve();
					});

			return d.promise;
		},

		detalleGastosProductor : function(id){ // detalle gastos productor

			var d = $q.defer();

			$http.get('model/reportes/getDetalleGasto.php?id='+ id)
					.success(function( respuest ){
					self.cargando = false;

					self.gastos = respuest.gastos;
					d.resolve();
					});

			return d.promise;
		},

		getGastosGral : function(id){ // gastos por actividad

			var d = $q.defer();

			$http.post('model/Gastos/getGastosGral.php')
					.success(function( respuest ){
					self.cargando = false;

					self.gastos = respuest.gastos;
					self.riegos = respuest.repRiego;
					self.compras = respuest.repCompra;
					d.resolve();
					});

			return d.promise;
		},
        
        getGastos2 : function(){ // gastos por actividad

			var d = $q.defer();

			$http.post('model/reportes/getGastos.php')
					.success(function( respuest ){
					self.cargando = false;

					self.gastos = respuest.gastos;
					self.riegos = respuest.repRiego;
					self.compras = respuest.repCompra;
					d.resolve();
					});

			return d.promise;
		},

		getGastosParcela : function(info){ // gastos por actividad

			var d = $q.defer();

			$http.post('model/Gastos/getGastosParc.php', info)
					.success(function( respuest ){
						//console.log(respuest);
					self.cargando = false;

					self.gastos = respuest.repGastos;
					self.riegosParc = respuest.repRiego;
					d.resolve();
					});

			return d.promise;
		},

		getGastos : function(info){ // gastos por actividad

			var d = $q.defer();

			$http.post('model/inversion/getGastos.php', info)
					.success(function( respuest ){
						//console.log(respuest);
					self.cargando = false;

					self.gastosGral = respuest.repGastos;
					self.ventaTot = respuest.repVenta;
					self.riegos = respuest.repRiego;
					self.compras = respuest.repCompra;

					d.resolve();
					});

			return d.promise;
		},

		getVentaTotal : function(info){ // gastos por actividad

			var d = $q.defer();

			$http.post('model/inversion/getVentasTot.php', info)
					.success(function( respuest ){
						//console.log(respuest);
					self.cargando = false;

					self.venta = respuest.repVentas;
					d.resolve();
					});

			return d.promise;
		},

	};

	return self;

}]);