var app = angular.module('coeplimApp.compra',[]);

app.factory('Compra', ['$http', '$q', function($http, $q){

	var self = {

		id_compra: undefined,
		fecha: new Date(),
		cantidad: 0,
		subtotal: 0,
		detalle: [],
		compras: [],
		comprasGral: [],
		compra: [],
		err: false,

		nueva_compra: function(){

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
			  	self.subtotal += parseFloat(item.precio) * parseInt(item.cant_insumos);
			  	//console.log(self.subtotal);
					//console.log(item.dt_precio);
			}
		},


		agregar_detalle: function( agregar ){

			self.detalle.push( agregar );

			self.recalcular();

			//console.log(agregar);

		},

		buscar_compra: function( id ){

			var d = $q.defer();

			$http.get('model/insumos/buscar.insumo.php?id=' + id)
				.success( function( respuesta ){
					//console.log(respuesta);
					d.resolve( respuesta.insumo );
				});

			return d.promise;
		},

		borrar_detalle: function( item ){

			var index = self.detalle.indexOf(item);
  			self.detalle.splice(index, 1);

  			self.recalcular();
		},

		guardar_compra: function(compra){

			var d = $q.defer();

			$http.post('model/insumos/post.guarda.compra.php', compra, {
			transformRequest:angular.identity, 
			headers: {'Content-Type':undefined, 'Process-Data': false}
		}).success(function(respuesta){
					self.err = respuesta.err;
					d.resolve();
				});


			return d.promise;

		},

		gastosProductor : function(){ // produccion total por parcelas de un productor

			var d = $q.defer();

			$http.post('model/reportes/getGastosProductor.php')
					.success(function( respuest ){
						//console.log(respuest);
					self.cargando = false;

					self.gastosGral = respuest.gastos;
					d.resolve();
					});

			return d.promise;
		},

		gastoProductor : function(id){ // gasto parcela y fecha

			var d = $q.defer();

			$http.post('model/reportes/getDetalleGastoProduct.php?id=' + id)
					.success(function( respuest ){
						//console.log(respuest);
					self.cargando = false;

					self.gasto = respuest.gastos;
					d.resolve();
					});

			return d.promise;
		},

		detalleGastosProductor : function(id){ // detalle gastos productor

			var d = $q.defer();

			$http.post('model/reportes/getDetalleGasto.php?id='+ id)
					.success(function( respuest ){
						//console.log(respuest);
					self.cargando = false;

					self.gastos = respuest.gastos;
					d.resolve();
					});

			return d.promise;
		},
	};


	return self;

}]);