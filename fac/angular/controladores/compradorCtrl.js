var app = angular.module('coeplimApp.compradorCtrl', []);

	app.controller('compradorCtrl', ['$scope','$http', '$routeParams', 'Compradores','Notification', function($scope,$http,$routeParams,Compradores,Notification){

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
		$scope.buscar = true;
		$scope.error = false;
		$scope.comprador = {};

		$scope.creando = false;

		if (id == 'new') {
			$scope.creando = true;
			$scope.comprador = {};
		}
		else{
			Compradores.buscar(id).then(function(){

				$scope.creando = true;
				$scope.buscar = false;
				$scope.comprador = Compradores.comprador;
				if ($scope.comprador == undefined) {

					window.location = '#/compradores';
					return;
				}

			});
		}



		$scope.guardarComprador = function( comprador ){

			if ($scope.creando) { //new
				Compradores.guardar(comprador).then(function () {

				    $scope.guardando = true;
				    if (Compradores.err) {
				        $scope.guardando = false;
				        Notification.error({
				            message: 'Ocurrió un error.',
				            title: 'El comprador no se registró correctamente. Por favor inténtelo nuevamente.',
				            delay: 3000
				        });
				        $scope.$apply();
				    } else {
				        $scope.guardando = false;
				        Notification.success({
				            message: 'El comprador se registró correctamente.',
				            delay: 3000
				        });
				        window.location = '#/compradores';
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
					window.location = '#/compradores';
					return;
					$scope.$apply();
				},1000);


			}

		}

		$scope.reset = function(frmComp){
			$scope.buscar = true;
			$scope.error = false;
			$scope.comprador = {
				cmp_nombre:""
			};
			 if (frmComp) {
      			frmComp.$setPristine();
      			frmComp.$setUntouched();
    		}
		}

	}]);
