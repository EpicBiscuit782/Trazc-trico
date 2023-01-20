var app = angular.module('coeplimApp.reporteComprasCtrl', []);

	app.controller('reporteComprasCtrl', ['$scope','$http', '$routeParams', 'Insumos',function($scope,$http,$routeParams,Insumos){

		$scope.reporte = [];
		$scope.total = 0;
		$scope.total2 = 0;
        
        var pag = 1;
        $scope.buscar;
		$scope.repCompras = {};
		$scope.nombre_com="";
        $scope.errorInicio = false;
		$scope.errorFin = false;
        
        $scope.fecha_inicio = new Date();
        $scope.fecha_final = new Date();
        $scope.fecha_inicio.setFullYear($scope.fecha_inicio.getFullYear() - 1);

        $scope.detalle = [];
        $scope.insumos = [];
        $scope.compras = [];
        
        Insumos.all().then(function(){ 
            $scope.insumos = Insumos.insumos;
		});
        

  		Insumos.buscarCompras().then(function(){
  			$scope.detalle = Insumos.detalle;

				if ($scope.detalle == undefined || Insumos.detalle.length == 0) {
					window.location = '#/reporteCompra';
					return;
				}
  		});
        
        $scope.calcTotal = function(filtrados){
             var sum = 0;
            if(filtrados!=undefined){
                 for(var i = 0; i<filtrados.length; i++){
                    sum = sum + (filtrados[i].precio * filtrados[i].cant_insumos);
                 }
            }
             return sum;
        };
        
    $scope.export = function(filtrados){
        var rows = [];
        rows.push(['Fecha', 'Proveedor', 'Nombre Comercial', 'Ingrediente Activo', 'Presentación', 'Lote']);

        for(var i = 0; i<filtrados.length; i++){
            rows.push([filtrados[i].fecha, filtrados[i].empresa, filtrados[i].nombre_com, filtrados[i].ingrediente_act, filtrados[i].cantidad+' '+filtrados[i].medida, filtrados[i].id_compra]);
        }

        var contenido = {
            pageSize: 'LETTER',
            pageOrientation: 'landscape',
            content: [
                {text: 'Bitácora de Registros de Ingreso de Insumos\n\n', style: 'header'},
                {
                    style: 'tableExample',
                    table: {
                        widths: [150, 150, 150, 150],
                        body: [
                            [{text: 'Ciclo: ', style: 'subheader'},{text: $scope.fecha_inicio.getFullYear()+' - '+$scope.fecha_final.getFullYear(), style: 'subheader'},{text: 'Huerta:', style: 'subheader'},{text: 'Limonera', style: 'subheader'}],
                            [{text: 'Código de la UP: ', style: 'subheader'},{text: '06/004/04', style: 'subheader'},{text: 'Cultivo y Variedad: ', style: 'subheader'},{text: 'Limón - Colimex ', style: 'subheader'}]
                        ]
                    },
                    layout: 'noBorders'
                },
                { 
                  layout: 'lightHorizontalLines',
                  table: {
                    headerRows: 1,
                    body: rows
                    }
                }
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true
                },
                subheader: {
                    fontSize: 15,
                    bold: true
                },
                quote: {
                    italics: true
                },
                small: {
                    fontSize: 8
                },
                tableExample: {
			        margin: [0, 5, 0, 15]
		          },
                tableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: 'black'
                }
            }
        };
        pdfMake.createPdf(contenido).open();
    }

}]);

app.filter("rango_fechas2", function ($filter) {
    return function (items, fecha_i, fecha_f) {
        var format = 'YYYY-MM-DD';
        fecha_inicio = moment(fecha_i).format(format);
        fecha_final = moment(fecha_f).format(format);

        return $filter('filter')(items, function (elem) {
            var fecha = moment(elem['fecha']).format(format);
            var res = moment(fecha).isBetween(fecha_inicio, fecha_final, null, '[]');
            return res;
        });
    };
});

app.filter('unique', function () {

        return function (items, filterOn) {

            
            if (filterOn === false) {
                return items;
            }

            if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
                var hashCheck = {}, newItems = [];

                var extractValueToCompare = function (item) {
                    if (angular.isObject(item) && angular.isString(filterOn)) {
                        return item[filterOn];
                    } else {
                        return item;
                    }
                };

                angular.forEach(items, function (item) {
                    var valueToCheck, isDuplicate = false;

                    for (var i = 0; i < newItems.length; i++) {
                        if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                            isDuplicate = true;
                            break;
                        }
                    }
                    if (!isDuplicate) {
                        newItems.push(item);
                    }

                });
                items = newItems;
            }
            return items;
        };
    });




