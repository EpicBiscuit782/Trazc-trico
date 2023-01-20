var app = angular.module('coeplimApp.responsableCtrl', []);

	app.controller('responsableCtrl', ['$scope','$http', '$routeParams', 'Responsable', 'Notification', function($scope,$http,$routeParams,Responsable,Notification){

		var id = $routeParams.id;

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
        
		$scope.guardando = false;
		$scope.actualizado = false;
		$scope.responsable = {};

		$scope.creando = false;
		$scope.buscar = true;
		$scope.error = false;


		if (id == 'new') {
			$scope.creando = true;
			$scope.responsable = {};
		}
		else{
			Responsable.buscar(id).then(function(){

				$scope.creando = true;
				$scope.buscar = false;
				$scope.responsable = Responsable.responsable;

				if ($scope.responsable == undefined || Responsable.responsable == '')  {

					window.location = '#/responsables';
					return;
				}
			});
		}

		$scope.guardarResponsable = function( responsable ){

			if ($scope.creando) { //new
				Responsable.guardar( responsable ).then( function(){

				    $scope.guardando = true;
				    if (Responsable.err) {
				        $scope.guardando = false;
				        Notification.error({
				            message: 'Ocurrió un error.',
				            title: 'El responsable no se registró correctamente. Por favor inténtelo nuevamente.',
				            delay: 3000
				        });
				        $scope.$apply();
				    } else {
				        $scope.guardando = false;
				        Notification.success({
				            message: 'El responsable se registró correctamente.',
				            delay: 3000
				        });
				        window.location = '#/responsables';
				        $scope.$apply();
				    }
			});
			}else{ //update

				$scope.error = true;
				setTimeout(function(){
					$scope.error = false;
					$scope.$apply();
				},2000);

				setTimeout(function(){
					window.location = '#/responsables';
					return;
					$scope.$apply();
				},1000);


			}

		}

		$scope.reset = function(frmResp){

			$scope.buscar = true;
			$scope.error = false;
			$scope.responsable = {
				nombre:"",
				direccion:"",
				telefono:"",
				correo:""
			};
			 if (frmResp) {
      			frmResp.$setPristine();
      			frmResp.$setUntouched();
    		}
		}

	}]);
