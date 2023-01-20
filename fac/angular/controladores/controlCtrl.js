var app = angular.module('coeplimApp.controlCtrl', []);

	app.controller('controlCtrl', ['$scope','$http', 'Control', 'TipoEnfermedad','Enfermedad', 'Responsable','Notification', function($scope,$http,Control,TipoEnfermedad,Enfermedad,Responsable,Notification){
        
        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.format = 'dd-MMMM-yyyy';

        $scope.popup1 = {
            opened: false
        };

		$scope.control = {
			fecha: ""
		};
        
		$scope.guardando = false;
		$scope.buscar = true;
		$scope.errorParc = false;
		$scope.errorFecha = false;
		$scope.errorEnfermedad = false;
		$scope.errorMuestra = false;
		$scope.errorInd = false;
		$scope.errorDesicion = false;
		$scope.errorResp = false;
		$scope.error = false;


		/*  carga combo responsable */
		$scope.responsables ={};
		Responsable.all().then(function(){
			$scope.responsables = Responsable;
		});


		/*  carga combo tipo enfermedad */
		$scope.tipo_enfermedad = {};
		TipoEnfermedad.all().then(function(){
			$scope.tipo_enfermedad = TipoEnfermedad;
		});

		/**
			CARGAR COMBO CATALOGO ENFERMEDADES
		*/

		$scope.getEnfermedades = function(parametro){
			$scope.enfermedades = {};
			//console.log(parametro)
			Enfermedad.tipos(parametro).then(function(){
			$scope.enfermedades = Enfermedad;


			});


		}


		$scope.guardarControl = function( control ){

			if ($scope.dataParcela.alias != "Parcela") {

				if (angular.isDate($scope.control.fecha)){

					if ($scope.control.id_enfermedad != undefined) {

						if (isNaN($scope.control.muestras) != true && $scope.control.muestras > 0) {

							if (isNaN($scope.control.individuos) != true && $scope.control.individuos >= 0) {

								if ($scope.control.decision != "" && $scope.control.decision != undefined) {

									if ($scope.control.id_responsable != undefined) {

											$scope.control.id_parcela = $scope.dataParcela.id;
												Control.guardar(control).then( function(){

                                                $scope.guardando = true;
                                                if (Control.err) {
                                                    $scope.guardando = false;
                                                    Notification.error({message: 'Ocurrió un error.', title: 'El control no se registró correctamente. Por favor inténtelo nuevamente.', delay: 3000});
                                                    $scope.$apply();
                                                }
                                                else {
                                                    $scope.guardando = false;
                                                    Notification.success({message: 'El control se registró correctamente.', delay: 3000});
                                                    window.location = '#/controles';
                                                    $scope.$apply();
                                                }

											});
									 }
									 else{
										 $scope.errorResp = true;
			 							setTimeout(function(){
			 								$scope.errorResp = false;
			 								$scope.$apply();
			 							},5000);
									}
								}
								else{
									$scope.errorDesicion = true;
									setTimeout(function(){
										$scope.errorDesicion = false;
										$scope.$apply();
									},5000);
								}
							}
							else {
								$scope.errorInd = true;
								setTimeout(function(){
									$scope.errorInd = false;
									$scope.$apply();
								},5000);
							}
						}
						else{
								$scope.errorMuestra = true;
								setTimeout(function(){
									$scope.errorMuestra = false;
									$scope.$apply();
								},5000);
						 }
					}
						else{
							$scope.errorEnfermedad = true;
							setTimeout(function(){
								$scope.errorEnfermedad = false;
								$scope.$apply();
						},5000);
						}
					}
						else{
							$scope.errorFecha = true;
							setTimeout(function(){
								$scope.errorFecha = false;
								$scope.$apply();
							},5000);
						}
					}
						else {
							$scope.errorParc = true;
							setTimeout(function(){
								$scope.errorParc = false;
								$scope.$apply();
							},5000);
						}
		}



		$scope.reset = function(frmControl){

			$scope.control = {
				fecha: "",
				muestras:'',
				individuos:'',
				decision:""
			};
			$scope.enfermedades = {};

			$scope.errorParc = false;
			$scope.errorFecha = false;
			$scope.errorEnfermedad = false;
			$scope.errorMuestra = false;
			$scope.errorInd = false;
			$scope.errorDesicion = false;
			$scope.errorResp = false;
			$scope.error = false;

			 if (frmControl) {
      			frmControl.$setPristine();
      			frmControl.$setUntouched();
    		}
		}

	}]);