var app = angular.module('coeplimApp.miembrosCtrl', []);

	app.controller('miembrosCtrl', ['$scope', '$routeParams','Equipo','Cosecha','Enfermedad','Analisis_Suelo','Agua','Analisis_Foliar','Notification','TipoEtapa',function ($scope,$routeParams,Equipo,Cosecha,Enfermedad,Analisis_Suelo,Agua,Analisis_Foliar,Notification,TipoEtapa,) {
// 'Parce', Parce


		var pagM = 1;
		$scope.buscarM;
		$scope.miembros = {};
        $scope.guardandoM = false;

        Equipo.getPCCs().then(function(){
  			$scope.pccs = Equipo.pccs;
  		});
        
        
		var pagC = 1;
		$scope.buscarC;
		$scope.controles = {};


		$scope.moverAC = function(pagC){
			Equipo.getControles(pagC).then(function(){
                $scope.controles = Equipo.controles;
			});
		}
		$scope.moverAC(pagC);
        

		$scope.moverAM = function(pagM){
			Equipo.cargarPagina(pagM).then(function(){
			$scope.miembros = Equipo;
			});
		}
		$scope.moverAM(pagM);
        
        
        
        var pagS = 1;
		$scope.analisis_suelos = {};

		$scope.moverAS = function(pagS){
			Analisis_Suelo.cargarAll(pagS).then(function(){
			$scope.analisis_suelos = Analisis_Suelo;
			});
		}
		$scope.moverAS(pagS);
        
        var pagA = 1;
		$scope.analisis_agua = {};



		$scope.moverAA = function(pagA){
			Agua.cargarAll(pagA).then(function(){
			$scope.analisis_agua = Agua;
			});
		}
		$scope.moverAA(pagA);
        
        var pagF = 1;
		$scope.analisis_foliar = {};


		$scope.moverAF = function(pagF){
			Analisis_Foliar.cargarAll(pagF).then(function(){
			$scope.analisis_foliar = Analisis_Foliar;
			});
		}
		$scope.moverAF(pagF);
        
        Cosecha.buscarHistorial().then(function(){
				$scope.produccion = Cosecha.produccion;
				$scope.aplicaciones = Cosecha.aplicaciones;
				$scope.enfermedades = Cosecha.enfermedades;
				$scope.gastos = Cosecha.gastos;
            
                var ap = $scope.aplicaciones.reduce((r, a) => {
                 r[a.fecha] = [...r[a.fecha] || [], a];
                 return r;
                }, {});                    
                    
                var en = $scope.enfermedades.reduce((r, a) => {
                 r[a.fecha] = [...r[a.fecha] || [], a];
                 return r;
                }, {});en
                
                var gst = $scope.gastos.reduce((r, a) => {
                 r[a.fecha] = [...r[a.fecha] || [], a];
                 return r;
                }, {});
                    
                var ap2 = Object.values(ap);
                var en2 = Object.values(en);
                var gst2 = Object.values(gst);
                                        
                $scope.historial = _.union(ap2, en2, gst2);
                
                $scope.historial = _.flatten($scope.historial);
                    
            $scope.historial = $scope.historial.reduce((r, a) => {
                 r[a.fecha] = [...r[a.fecha] || [], a];
                 return r;
                }, {});
                    
                    
        function sortKeys(obj_1) { 
            var key = Object.keys(obj_1) 
            .sort(function order(key1, key2) { 
                if (key1 < key2) return -1; 
                else if (key1 > key2) return +1; 
                else return 0; 
            });  
            var temp = {}; 
              
            for (var i = 0; i < key.length; i++) { 
                temp[key[i]] = obj_1[key[i]]; 
                delete obj_1[key[i]]; 
            }  
            for (var i = 0; i < key.length; i++) { 
                obj_1[key[i]] = temp[key[i]]; 
            }  
            return obj_1; 
        }

                    sortKeys($scope.historial);
                    
				});
        $scope.guardarMiembro = function(){
        Equipo.guardarM($scope.miembro).then(function () {
            $scope.guardandoM = true;
            if (Equipo.err) {
                $scope.guardandoM = false;
                Notification.error({
                    message: 'Ocurrió un error.',
                    title: 'El integrante no se registró correctamente. Por favor inténtelo nuevamente.',
                    delay: 3000
                });
                $scope.$apply();
            } else {
                $scope.guardandoM = false;
                Notification.success({
                    message: 'El integrante se registró correctamente.',
                    delay: 3000
                });
                window.location = '#/miembros';
            }
        });
        };
        
		//======>._.<EpicBiscuit782=========
        
        //CARGAR COMBO TIPO ETAPAS

		$scope.tipo_et = {};
		TipoEtapa.all().then(function(){
			$scope.tipo_et = TipoEtapa;
			//console.log($scope.tipo_et);
		});

            //Guardar Puntos Criticos
        
        $scope.guardarPCC = function(){
        Equipo.guardarP($scope.pcc).then(function () {
            $scope.guardandoP = true;
            if (Equipo.err) {
                $scope.guardandoP = false;
                Notification.error({
                    message: 'Ocurrió un error.',
                    title: 'El PCC no se registró correctamente. Por favor inténtelo nuevamente.',
                    delay: 3000
                });
                $scope.$apply();
            } else {
                $scope.guardandoP = false;
                Notification.success({
                    message: 'El PCC se registró correctamente.',
                    delay: 3000
                });
                window.location = '#/miembros';
            }
        });
        };

            //Peligros Potenciales
        $scope.guardarPP = function(){
            Equipo.guardarPE($scope.pp).then(function () {
                $scope.guardandoPE = true;
                if (Equipo.err) {
                    $scope.guardandoPE = false;
                    Notification.error({
                        message: 'Ocurrió un error.',
                        title: 'El PP no se registró correctamente. Por favor inténtelo nuevamente.',
                        delay: 3000
                    });
                    $scope.$apply();
                } else {
                    $scope.guardandoPE = false;
                    Notification.success({
                        message: 'El PP se registró correctamente.',
                        delay: 3000
                    });
                    window.location = '#/miembros';
                }
            });
            };
            //Mostrar Puntos Criticos 
           /* var pagCP = 1;
		$scope.buscarCP;
		$scope.criticos = {};


		$scope.moverACP = function(pagCP){
			Equipo.getCriticos(pagCP).then(function(){
                $scope.criticos = Equipo.criticos;
			});
		}
		$scope.moverACP(pagCP);
        

		$scope.moverAMP = function(pagMP){
			Equipo.cargarPagina(pagMP).then(function(){
			$scope.miembros = Equipo;
			});
		}
		$scope.moverAMP(pagMP);

//Vizualizar Parcela
        var pagApar = 1;
		$scope.parcela = {};



		$scope.moverAApar = function(pagApar){
			Parce.cargarAll(pagApar).then(function(){
			$scope.parcela = Parce;
			});
		}
		$scope.moverAApar(pagApar);

            */



	}]);

