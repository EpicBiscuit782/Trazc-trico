var app = angular.module('coeplimApp.enfermedadRecoCtrl', []);

	app.controller('enfermedadRecoCtrl', ['$scope','$http', '$routeParams', 'TipoEnfermedad', 'Enfermedad','TipoInsumo', function($scope,$http,$routeParams,TipoEnfermedad,Enfermedad, TipoInsumo){

		var id = $routeParams.id;
        
        $scope.recomendados = {'id_enfermedad':id};

		$scope.buscar = true;
		$scope.ban = true;
		$scope.error = false;
        $scope.errorDosis = false;
        $scope.errorIntervalo = false;

			Enfermedad.buscar(id).then(function(){

				$scope.buscar = false;
				$scope.enfermedad = Enfermedad.enfermedad;

				if ($scope.enfermedad == undefined || Enfermedad.enfermedad == '') {

					window.location = '#/enfermedades';
					return;
				}
			});        
		/**
			CARGAR COMBO TIPO INSUMO
		*/

		$scope.tipo_insumo = {};

		TipoInsumo.all().then(function(){
			$scope.tipo_insumo = TipoInsumo;
		});


		/**
			CARGAR COMBO CATALOGO INSUMO
		*/

		$scope.insumo = {};
		$scope.cargaInsumos = function(parametro){
			$scope.insumo = {};
			TipoInsumo.categoria(parametro).then(function(){
				$scope.insumo = TipoInsumo;
			});
		}
        
        /**
			CARGAR COMBO INSUMOS RECOMENDADOS
		*/
        
        $scope.insumos_reco = {};
		Enfermedad.buscar_reco(id).then(function(){
			$scope.insumos_reco = Enfermedad.recomendados;
		});

		$scope.guardarRecomendados = function( recomendados ){
				Enfermedad.guardarReco( recomendados ).then( function(){

					if (Enfermedad.err) {
						$scope.error = true;
						setTimeout(function(){
							$scope.error = false;
							$scope.$apply();
						},2000);

						setTimeout(function(){
							return;
							$scope.$apply();
						},1000);

					}
					else {
					$scope.actualizado = true;
					setTimeout(function(){
						$scope.actualizado = false;
						$scope.$apply();
					},2000);

					setTimeout(function(){
                        Enfermedad.buscar_reco(id).then(function(){
                            $scope.insumos_reco = Enfermedad.recomendados;
                                        });
						return;
						$scope.$apply();
					},1000);
					}
			});
            
                    $scope.recomendados = {
                            id_tipo_insumo:"",
                            id_insumo:"",
                            dosis:"",
                            intervalo:""
                    };
		}
	}]);