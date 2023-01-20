var app = angular.module('coeplimApp.manejosCtrl', []);

	app.controller('manejosCtrl', ['$scope', '$routeParams', '$sessionStorage', 'Manejo', function ($scope,$routeParams,$sessionStorage,Manejo) {

		$scope.setActive('mManejos','');

		var pag = 1;
		$scope.buscar;
		$scope.manejos = {};
		$scope.events = [];



		$scope.moverA = function(pag){
			Manejo.cargarPagina(pag).then(function(){
                $scope.manejos = Manejo;
                
                for(i in $scope.manejos.manejos) {
                    var obj = $scope.manejos.manejos[i];
                                
                    var e = {
                        id:obj['id_manejo'],
                        start_date: obj['inicio'],
                        end_date:   obj['fin'],
                        text:   "Manejo Integral de "+obj['enfermedad'],
                        parcela: obj['pcl_alias'],
                        responsable:   obj['nombre'],
                        problema:   obj['enfermedad']
                    };
                    
                    $scope.events.push(e);

                }
                
                for(i in $scope.manejos.det_manejos) {
                    var obj = $scope.manejos.det_manejos[i];
                    
                    var e = {
                        text:       "Aplicación "+obj['nombre_com'],
                        parcela:    obj['pcl_alias'],
                        responsable:   obj['nombre'],
                        problema:   obj['enfermedad'],
                        insumo:     obj['nombre_com'],
                        dosis:      obj['dosis']+' '+obj['medida'],
                        metodo:     obj['metodo'], 
                        start_date: obj['fecha_aplicacion'], 
                        end_date:   obj['fecha_aplicacion']
                    };
            
                   $scope.events.push(e);
                }
			});
		}
		$scope.moverA(pag);
        
        
            
    //Calendario
    $scope.scheduler = { date : new Date() };
    
    scheduler.attachEvent("onEventAdded", function(id,ev){
        //console.log(ev.start_date.getDate("dd-mm-yyyy"));
    });
        
    $scope.checkParcela=function() {
        if ($scope.dataParcela.id != 0) {
            return false;
        }
        else {
            return true;
        }
    }
        
        
	}]);
