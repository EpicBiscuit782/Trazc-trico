var app = angular.module('coeplimApp.equipoCtrl', []);

	app.controller('equipoCtrl', ['$scope','$http', '$routeParams', 'Equipo','TipoEtapa', function($scope,$http,$routeParams,Equipo,TipoEtapa){

		var id = $routeParams.id;

		$scope.actualizado = false;
		$scope.equipo = {};

		$scope.creando = false;
		$scope.error = false;
		$scope.buscar = true;

		if (id == 'new') {
			$scope.creando = true;
			$scope.equipo = {};
		}
		else{
			Equipo.buscar(id).then(function(){

				$scope.creando = false;
				$scope.buscar = false;
				$scope.equipo = Equipo.equipo;
				$scope.equipo.id_usuario = id;

				if ($scope.equipo == undefined || Equipo.equipo == '') {

					window.location = '#/miembros';
					return;
				}

			});
		}

		$scope.guardarEquipo = function( equipo ){

			if ($scope.creando) { //new
				Equipo.guardar( equipo ).then( function(data){

					if (Equipo.err) {
						$scope.error = true;
						setTimeout(function(){
							$scope.error = false;
							$scope.$apply();
						},3000);
						setTimeout(function(){
							window.location = '#/miembros';
							return;
							$scope.$apply();
						},1000);
					}
					else {
						$scope.actualizado = true;
						setTimeout(function(){
							$scope.actualizado = false;
							$scope.$apply();
						},3000);

						setTimeout(function(){
							window.location = '#/miembros';
							return;
							$scope.$apply();
						},1000);
					}
			});
			}else{ //update
				Equipo.guardar( equipo ).then( function(){
					if (Equipo.err) {
						$scope.error = true;
						setTimeout(function(){
							$scope.error = false;
							$scope.$apply();
						},2000);
						setTimeout(function(){
							window.location = '#/miembros';
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
							window.location = '#/miembros';
							return;
							$scope.$apply();
						},1000);
					}
			});
			}

		}

		$scope.reset = function(frmEquipo){
			$scope.equipo = {
				usr_nombre_completo:"",
				usr_email:"",
				usr_password:""
			};
			 if (frmEquipo) {
      			frmEquipo.$setPristine();
      			frmEquipo.$setUntouched();
    		}
		}

	}]);
