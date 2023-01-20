var app = angular.module('coeplimApp.trazabilidadCtrl', []);

	app.controller('trazabilidadCtrl', ['$scope', 'Cosecha', function ($scope,Cosecha) {

		$scope.produccion = {};
		$scope.errorCodigo = false;
		$scope.errorTam = false;
		$scope.codigo= "";
		$scope.id_produccion = "";
		$scope.template = false;

		$scope.buscar = function(){
			$scope.errorCodigo = false;
				$scope.id_produccion = "";
				var inicio = 8;
			if ($scope.codigo.length == 24) {
				$scope.alias = $scope.codigo.substring(inicio,12);
				for ( var i = 0; i < $scope.alias.length; i++) {
					$scope.caracter = $scope.alias.charAt(i);
					if ($scope.caracter != 0) {
						$scope.id_produccion += $scope.caracter;
						break;

					}else{
						inicio++;
					}

				}// fin for
				$scope.id_produccion += $scope.codigo.substring(inicio+1,12);
				$scope.lote = $scope.codigo.substring(18,25);

				Cosecha.buscarCode($scope.id_produccion).then(function(){
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
                    
					if ($scope.produccion.id_produccion != undefined) {
						$scope.template = true;

					}
					else {
						$scope.errorCodigo = true;
						$scope.template = false;
						setTimeout(function(){
							$scope.errorCodigo = false;
							$scope.$apply();
						},5000);

					}
				});

			}
			else {
				$scope.errorCodigo = true;
				setTimeout(function(){
					$scope.errorCodigo = false;
					$scope.$apply();
				},5000);

			}

		}
}]);
