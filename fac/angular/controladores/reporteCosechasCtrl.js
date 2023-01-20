var app = angular.module('coeplimApp.reporteCosechasCtrl', []);

	app.controller('reporteCosechasCtrl', ['$scope','$http', '$routeParams', 'Cosecha','Parcelas', function($scope,$http,$routeParams,Cosecha,Parcelas){

		$scope.reporte = [];
		$scope.total = 0;
		$scope.total2 = 0;
        $scope.detalle = [];
        var pag = 1;
        $scope.buscar;
		$scope.repCompras = {};
		$scope.nombre_com="";
        $scope.errorInicio = false;
		$scope.errorFin = false;
        
        $scope.fecha_inicio = new Date();
        $scope.fecha_final = new Date();
        $scope.fecha_inicio.setFullYear($scope.fecha_inicio.getFullYear() - 1);
        
        $scope.cosechas = [];
        
        $scope.parcelas = {};
        Parcelas.all().then(function(){
            $scope.parcelas = Parcelas.parcelas;
		});

  		Cosecha.getCosechas().then(function(){
  			$scope.cosechas = Cosecha.produccion;
				if ($scope.cosechas == undefined || Cosecha.produccion.length == 0) {
					window.location = '#/reporteCosechas';
					return;
				}
  		});
        
       

        
        $scope.calcTotal = function(filtrados){
             var sum = 0;
            if(filtrados!=undefined){
                 for(var i = 0; i<filtrados.length; i++){
                    sum = sum + filtrados[i].total;
                 }
            }
             return sum;
        };
        
    $scope.export = function(filtrados){
        var rows = [];
        rows.push(['Fecha','Lote de Cultivo', 'U. P.', 'Sección', 'Fecha Envío', 'Uso del Cultivo', 'Rejas', 'Kgrs.', 'Destino', 'Responsable']);

        for(var i = 0; i<filtrados.length; i++){
            rows.push([filtrados[i].pdc_fecha,03808, filtrados[i].pcl_alias,01,filtrados[i].pdc_fecha,'Consumo en fresco', filtrados[i].pdc_rejas, filtrados[i].pdc_kilos, 'Prueba empresa', 'Prueba Responsable']);
        }

        var contenido = {
            pageSize: 'LETTER',
            pageOrientation: 'landscape',
            content: [
                {text: 'Bitácora de Registro de Cosecha \n\n', style: 'header'},
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

app.filter("rango_fechas", function ($filter) {
    return function (items, fecha_i, fecha_f, dateField) {
        var format = 'YYYY-MM-DD';
        fecha_inicio = moment(fecha_i).format(format);
        fecha_final = moment(fecha_f).format(format);

        return $filter('filter')(items, function (elem) {
            var fecha = moment(elem['pdc_fecha']).format(format);
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




