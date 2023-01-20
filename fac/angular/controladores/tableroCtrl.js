var app = angular.module('coeplimApp.tableroCtrl', []);

app.controller('tableroCtrl', ['$scope', '$routeParams', 'Tablero','Parcelas', function ($scope, $routeParams, Tablero, Parcelas) {


    var d = new Date();
    d.setFullYear(d.getFullYear() - 5);
    $scope.tablero = {
        'inicio': d,
        'fin': new Date()
    };
    
    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };
    
    $scope.open2 = function() {
        $scope.popup2.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.format = 'dd-MMMM-yyyy';

    $scope.popup1 = {
        opened: false
    };
    
    $scope.popup2 = {
        opened: false
    };

    $scope.ventas = {};
    $scope.gastos = {};
    $scope.gastos_variables = {};
    $scope.gastos_cosecha = {};
    $scope.compras = {};
    
    $scope.parcelas = {};
        Parcelas.all().then(function(){
            $scope.parcelas = Parcelas.parcelas;
    });
    
    $scope.tablero.user = $scope.isUser;
    
    Tablero.getInfo($scope.tablero).then(function(){
        $scope.ventas = Tablero.ventas;
        $scope.gastos = Tablero.gastos;
        $scope.gastos_variables = Tablero.gastos_variables;
        $scope.gastos_cosecha = Tablero.gastos_cosecha;
        $scope.compras = Tablero.compras;
        $scope.costo_insumo = Tablero.costo_insumo;
        $scope.costo_insumo2 = Tablero.costo_insumo2;
        $scope.parcela = Tablero.parcela;
        $scope.riego = Tablero.riego;
        
        $scope.labels_ventas = [];
        $scope.data_ventas = [];
        $scope.series_cosecha = ['Kilos', 'Rejas'];
        $scope.labels_cosecha = [];
        $scope.data_cosecha = [];
        $scope.data_kilos = [];
        $scope.data_rejas = [];
        $scope.total_ventas = 0;
        $scope.total_cosecha = 0;
        $scope.total_riego = 0;
        $scope.total_compras = 0;
        $scope.precio_kilo = 0;
        $scope.total_cosecha = 0;
        $scope.total_costos = 0;
        $scope.ganancia = 0;
        $scope.margen_ganancia = 0;
        $scope.costo_hectarea = 0;
        $scope.tonelada_hectarea = 0;
        $scope.costo_tonelada = 0;
        $scope.kg_arbol = 0;
        
        var y=0;

        for(x in $scope.ventas){
            $scope.labels_ventas.push($scope.ventas[x].fecha);
            $scope.data_ventas.push($scope.ventas[x].subtotal);
            $scope.labels_cosecha.push($scope.ventas[x].fecha);
            $scope.data_kilos.push($scope.ventas[x].kilos);
            $scope.data_rejas.push($scope.ventas[x].rejas);
            
            $scope.total_ventas =  $scope.total_ventas + parseInt($scope.ventas[x].subtotal);
            $scope.total_cosecha =  $scope.total_cosecha + parseInt($scope.ventas[x].kilos);
            if($scope.ventas[x].pkilo != 0){
                y++;
                $scope.precio_kilo += parseInt($scope.ventas[x].pkilo);
            }
            
        };
        
        $scope.precio_kilo = $scope.precio_kilo / y;

        $scope.data_cosecha.push($scope.data_rejas);
        $scope.data_cosecha.push($scope.data_kilos);
        
        //**********Gráficas Gastos*************
        
        $scope.labels_gastos = [];
        $scope.data_gastos = [];
        $scope.total_gastos = 0;
        
        $scope.labels_gastos_variables = [];
        $scope.data_gastos_variables = [];
        $scope.total_gastos_variables = 0;
        
        $scope.labels_gastos_cosecha = [];
        $scope.data_gastos_cosecha = [];
        $scope.total_gastos_cosecha = 0;
        
        $scope.labels_insumos = [];
        $scope.data_insumos = [];
        $scope.total_insumos = 0;
        
        
        for(x in $scope.gastos){
            $scope.labels_gastos.push($scope.gastos[x].ctl_descripcion);
            $scope.data_gastos.push($scope.gastos[x].costo);
            $scope.total_gastos += parseInt($scope.gastos[x].costo);
        };
        
        for(x in $scope.gastos_cosecha){
            $scope.labels_gastos_cosecha.push($scope.gastos_cosecha[x].ctl_descripcion);
            $scope.data_gastos_cosecha.push($scope.gastos_cosecha[x].costo);
            $scope.total_gastos_cosecha += parseInt($scope.gastos_cosecha[x].costo);
        };
        
        for(x in $scope.gastos_variables){
            $scope.labels_gastos_variables.push($scope.gastos_variables[x].ctl_descripcion);
            $scope.data_gastos_variables.push($scope.gastos_variables[x].costo);
            $scope.total_gastos_variables += parseInt($scope.gastos_variables[x].costo);
        };
    
        var costo_insumo2=[];
        for(x in $scope.costo_insumo){
            if($scope.costo_insumo[x].medida=="GRAMOS"){
                var costo = parseFloat($scope.costo_insumo[x].costo)/1000;
                costo_insumo2.push({costo: costo, descripcion: $scope.costo_insumo[x].descripcion});       
            }else if($scope.costo_insumo[x].medida=="MILILITROS"){
                var costo = parseFloat($scope.costo_insumo[x].costo)/1000;
                costo_insumo2.push({costo: costo, descripcion: $scope.costo_insumo[x].descripcion});
            }else{
                var costo = parseFloat($scope.costo_insumo[x].costo);
                costo_insumo2.push({costo: costo, descripcion: $scope.costo_insumo[x].descripcion});
            }
        };
        
        var result = [];
        costo_insumo2.reduce(function(res, value) {
          if (!res[value.descripcion]) {
            res[value.descripcion] = { descripcion: value.descripcion, costo: 0 };
            result.push(res[value.descripcion])
          }
          res[value.descripcion].costo += parseFloat(value.costo);
          return res;
        }, {});

        
        for(x in result){
            $scope.labels_gastos_variables.push(result[x].descripcion);
            $scope.data_gastos_variables.push(result[x].costo);
            $scope.total_gastos_variables += parseFloat(result[x].costo);
        };
        
        
        var costo_insumo2=[];
        for(x in $scope.costo_insumo2){
            if($scope.costo_insumo2[x].medida=="GRAMOS"){
                var costo = parseFloat($scope.costo_insumo2[x].costo)/1000;
                costo_insumo2.push({costo: costo, nombre_com: $scope.costo_insumo2[x].nombre_com});       
            }else if($scope.costo_insumo2[x].medida=="MILILITROS"){
                var costo = parseFloat($scope.costo_insumo2[x].costo)/1000;
                costo_insumo2.push({costo: costo, nombre_com: $scope.costo_insumo2[x].nombre_com});
            }else{
                var costo = parseFloat($scope.costo_insumo2[x].costo);
                costo_insumo2.push({costo: costo, nombre_com: $scope.costo_insumo2[x].nombre_com});
            }
        };
        
        var result = [];
        costo_insumo2.reduce(function(res, value) {
          if (!res[value.nombre_com]) {
            res[value.nombre_com] = { nombre_com: value.nombre_com, costo: 0 };
            result.push(res[value.nombre_com])
          }
          res[value.nombre_com].costo += parseFloat(value.costo);
          return res;
        }, {});

        for(x in result){
            $scope.labels_insumos.push(result[x].nombre_com);
            $scope.data_insumos.push(result[x].costo);
        };
        
        for(x in $scope.riego){
            $scope.labels_gastos_variables.push("RIEGO");
            $scope.data_gastos_variables.push($scope.riego[x].costo);
            $scope.total_gastos_variables += parseFloat($scope.riego[x].costo);
            $scope.total_riego += parseFloat($scope.riego[x].costo);
            
        };
        
        
        //**********Gráficas Compras*************
        
        $scope.labels_compras = [];
        $scope.data_compras = [];
        
        for(x in $scope.compras){
            $scope.labels_compras.push($scope.compras[x].nombre_com);
            $scope.data_compras.push($scope.compras[x].subtotal);
            $scope.total_compras += parseFloat($scope.compras[x].subtotal);
        };
        
        
        $scope.ganancia = $scope.total_ventas - $scope.total_gastos - $scope.total_gastos_cosecha - $scope.total_gastos_variables;
        
        $scope.total_costos = $scope.total_gastos + $scope.total_gastos_cosecha + $scope.total_gastos_variables;
        
        $scope.margen_ganancia = (($scope.total_ventas - $scope.total_costos) / $scope.total_ventas) * 100;
        
        $scope.costo_hectarea = ($scope.total_costos / parseInt($scope.parcela[0].hectareas));
        
        $scope.tonelada_hectarea = (($scope.total_cosecha / parseInt($scope.parcela[0].hectareas))/1000);
        
        $scope.costo_tonelada = ($scope.costo_hectarea / $scope.tonelada_hectarea);
        
        $scope.ganancia_hectarea = ($scope.ganancia / parseInt($scope.parcela[0].hectareas));
        
        $scope.kg_arbol = (($scope.tonelada_hectarea*1000) / parseInt($scope.parcela[0].arboles));

    });
    
$scope.getTablero = function() {
    Tablero.getInfo($scope.tablero).then(function(){
        $scope.ventas = Tablero.ventas;
        $scope.gastos = Tablero.gastos;
        $scope.gastos_variables = Tablero.gastos_variables;
        $scope.gastos_cosecha = Tablero.gastos_cosecha;
        $scope.compras = Tablero.compras;
        $scope.costo_insumo = Tablero.costo_insumo;
        $scope.parcela = Tablero.parcela;
        $scope.riego = Tablero.riego;
        
        $scope.labels_ventas = [];
        $scope.data_ventas = [];
        $scope.labels_cosecha = [];
        $scope.data_cosecha = [];
        $scope.data_kilos = [];
        $scope.data_rejas = [];
        $scope.precio_kilo = 0;
        $scope.total_cosecha = 0;
        $scope.total_ventas = 0;
        $scope.total_costos = 0;
        $scope.total_riego = 0;
        $scope.total_compras =0;
        $scope.ganancia = 0;
        $scope.margen_ganancia = 0;
        $scope.costo_hectarea = 0;
        $scope.tonelada_hectarea = 0;
        $scope.ganancia_hectarea = 0;
        $scope.costo_tonelada = 0;
        $scope.kg_arbol = 0;
        
        var y=0;
        
        for(x in $scope.ventas){
            $scope.labels_ventas.push($scope.ventas[x].fecha);
            $scope.data_ventas.push($scope.ventas[x].subtotal);
            $scope.labels_cosecha.push($scope.ventas[x].fecha);
            $scope.data_kilos.push($scope.ventas[x].kilos);
            $scope.data_rejas.push($scope.ventas[x].rejas);
                        
            
            $scope.total_ventas =  $scope.total_ventas + parseInt($scope.ventas[x].subtotal);
            $scope.total_cosecha =  $scope.total_cosecha + parseInt($scope.ventas[x].kilos);
            if($scope.ventas[x].pkilo != 0){
                y++;
                $scope.precio_kilo = $scope.precio_kilo + parseInt($scope.ventas[x].pkilo);
            }

        };
        
        $scope.precio_kilo = $scope.precio_kilo / y;

        $scope.data_cosecha.push($scope.data_rejas);
        $scope.data_cosecha.push($scope.data_kilos);

        
        //**********Gráficas Gastos*************
        
        $scope.labels_gastos = [];
        $scope.data_gastos = [];
        $scope.total_gastos = 0;
        
        $scope.labels_gastos_variables = [];
        $scope.data_gastos_variables = [];
        $scope.total_gastos_variables = 0;
        
        $scope.labels_gastos_cosecha = [];
        $scope.data_gastos_cosecha = [];
        $scope.total_gastos_cosecha = 0;
        
        for(x in $scope.gastos){
            $scope.labels_gastos.push($scope.gastos[x].ctl_descripcion);
            $scope.data_gastos.push($scope.gastos[x].costo);
            $scope.total_gastos += parseInt($scope.gastos[x].costo);
        };
        
        for(x in $scope.gastos_variables){
            $scope.labels_gastos_variables.push($scope.gastos_variables[x].ctl_descripcion);
            $scope.data_gastos_variables.push($scope.gastos_variables[x].costo);
            $scope.total_gastos_variables += parseInt($scope.gastos_variables[x].costo);
        };
        
        for(x in $scope.gastos_cosecha){
            $scope.labels_gastos_cosecha.push($scope.gastos_cosecha[x].ctl_descripcion);
            $scope.data_gastos_cosecha.push($scope.gastos_cosecha[x].costo);
            $scope.total_gastos_cosecha += parseInt($scope.gastos_cosecha[x].costo);
        };
        
        
        var costo_insumo2=[];
        for(x in $scope.costo_insumo){
            if($scope.costo_insumo[x].medida=="GRAMOS"){
                var costo = parseFloat($scope.costo_insumo[x].costo)/1000;
                costo_insumo2.push({costo: costo, descripcion: $scope.costo_insumo[x].descripcion});       
            }else if($scope.costo_insumo[x].medida=="MILILITROS"){
                var costo = parseFloat($scope.costo_insumo[x].costo)/1000;
                costo_insumo2.push({costo: costo, descripcion: $scope.costo_insumo[x].descripcion});
            }else{
                var costo = parseFloat($scope.costo_insumo[x].costo);
                costo_insumo2.push({costo: costo, descripcion: $scope.costo_insumo[x].descripcion});
            }
        };
        
        
        var result = [];
        costo_insumo2.reduce(function(res, value) {
          if (!res[value.descripcion]) {
            res[value.descripcion] = { descripcion: value.descripcion, costo: 0 };
            result.push(res[value.descripcion])
          }
          res[value.descripcion].costo += parseFloat(value.costo);
          return res;
        }, {});
        
        
        for(x in result){
            $scope.labels_gastos_variables.push(result[x].descripcion);
            $scope.data_gastos_variables.push(result[x].costo);
            $scope.total_gastos_variables += parseFloat(result[x].costo);
        };
        
        for(x in $scope.riego){
            $scope.labels_gastos_variables.push("RIEGO");
            $scope.data_gastos_variables.push($scope.riego[x].costo);
            $scope.total_gastos_variables += parseFloat($scope.riego[x].costo);
            $scope.total_riego += parseFloat($scope.riego[x].costo);
        };
        
        //**********Gráficas Compras*************
        
        $scope.labels_compras = [];
        $scope.data_compras = [];
        
        for(x in $scope.compras){
            $scope.labels_compras.push($scope.compras[x].nombre_com);
            $scope.data_compras.push($scope.compras[x].subtotal);
            $scope.total_compras += parseFloat($scope.compras[x].subtotal);
        };
        
        $scope.ganancia = $scope.total_ventas - $scope.total_gastos - $scope.total_gastos_cosecha - $scope.total_gastos_variables;
        
        $scope.total_costos = $scope.total_gastos + $scope.total_gastos_cosecha + $scope.total_gastos_variables;
        
        $scope.margen_ganancia = (($scope.total_ventas - $scope.total_costos) / $scope.total_ventas) * 100;
        
        $scope.costo_hectarea = ($scope.total_costos / parseInt($scope.parcela[0].hectareas));
        
        $scope.tonelada_hectarea = (($scope.total_cosecha / parseInt($scope.parcela[0].hectareas))/1000);
                
        $scope.costo_tonelada = ($scope.costo_hectarea / $scope.tonelada_hectarea);
        
        $scope.ganancia_hectarea = ($scope.ganancia / parseInt($scope.parcela[0].hectareas));
        
        $scope.kg_arbol = (($scope.tonelada_hectarea*1000) / parseInt($scope.parcela[0].arboles));
    });
};



    $scope.datasetOverride_ventas = [{
        yAxisID: 'y-axis-1'
}];
    $scope.options_ventas = {
        responsive: true,
        maintainAspectRatio: true,
        tooltips: {
            titleFontSize: 20,
            bodyFontSize: 20,
            callbacks: {
               label: function(tooltipItem, data) {
                   return tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); } 
            }
        },
        scales: {
            yAxes: [
                {
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        beginAtZero: true,
                        callback: function(value, index, values) {
                          if(parseInt(value) >= 1000){
                            return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                          } else {
                            return '$' + value;
                          }
                        }
                      }
                }
                    ],
            xAxes: [{
                type: 'time',
                distribution: 'series',
                time: {
                    unit: 'month',
                    tooltipFormat: 'DD-MMM-YYYY'
                }
            }]
        },
        title: {
            display: true,
            fontSize: 24,
            text: 'Ventas'
        }
    };
    
    
$scope.datasetOverride_insumos = [{
        yAxisID: 'y-axis-1'
}];
    $scope.options_insumos = {
        responsive: true,
        maintainAspectRatio: true,
        tooltips: {
            titleFontSize: 20,
            bodyFontSize: 20,
            callbacks: {
               label: function(tooltipItem, data) {
                   return tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); } 
            }
        },
        scales: {
            yAxes: [
                {
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        beginAtZero: true,
                        callback: function(value, index, values) {
                          if(parseInt(value) >= 1000){
                            return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                          } else {
                            return '$' + value;
                          }
                        }
                      }
                }
                    ]
        },
        title: {
            display: true,
            fontSize: 24,
            text: 'Costo de insumos aplicados'
        }
    };


    $scope.datasetOverride_cosecha = [{
        yAxisID: 'y-axis-1'
}];
    
    $scope.options_cosecha = {
        responsive: true,
        maintainAspectRatio: true,
        tooltips: {
            titleFontSize: 20,
            bodyFontSize: 20,
            callbacks: {
               label: function(tooltipItem, data) {
                   return tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); } 
            }

        },
        scales: {
            yAxes: [
                {
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        beginAtZero: true,
                        callback: function(value, index, values) {
                          if(parseInt(value) >= 1000){
                            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                          } else {
                            return value;
                          }
                        }
                    }
                }
                    ],
            xAxes: [{
                type: 'time',
                distribution: 'series',
                time: {
                    unit: 'month',
                    tooltipFormat: 'DD-MMM-YYYY'
                }
            }]
        },
        title: {
            display: true,
            fontSize: 24,
            text: 'Cosecha'
        }
    };
    
    $scope.options_gastos = {
        responsive: false,
        maintainAspectRatio: false,
        tooltips: {
            titleFontSize: 40,
            bodyFontSize: 40
        },
        title: {
            display: true,
            fontSize: 45,
            text: 'Costos de labor o aplicación'
        },
        legend: {
            display: true,
            position: 'top',
            width: 20,
            labels:{fontSize:25}
        }
        
};
    
    
    $scope.options_gastos_variables = {
        responsive: false,
        maintainAspectRatio: false,
        tooltips: {
            titleFontSize: 40,
            bodyFontSize: 40
        },
        title: {
            display: true,
            fontSize: 45,
            text: 'Costos de Insumos'
        },
        legend: {
            display: true,
            position: 'top',
            width: 20,
            labels:{fontSize:25}
        }
        
};
    
    $scope.options_gastos_cosecha = {
        responsive: false,
        maintainAspectRatio: false,
        tooltips: {
            titleFontSize: 40,
            bodyFontSize: 40
        },
        title: {
            display: true,
            fontSize: 45,
            text: 'Costos de Cosecha'
        },
        legend: {
            display: true,
            position: 'top',
            width: 20,
            labels:{fontSize:25}
        }
        
};
    
    
    $scope.options_compras = {
        responsive: false,
        maintainAspectRatio: false,
        tooltips: {
            titleFontSize: 40,
            bodyFontSize: 40
        },
        title: {
            display: true,
            fontSize: 40,
            text: 'Compras'
        },
        legend: {
            display: true,
            position: 'right',
            width: 20,
            labels:{fontSize:20}
        }
        
};
    

    
    
    

	}]);