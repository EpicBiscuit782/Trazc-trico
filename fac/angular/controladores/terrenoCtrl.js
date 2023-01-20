var app = angular.module('coeplimApp.terrenoCtrl', []);

	app.controller('terrenoCtrl', ['$scope','$http', '$routeParams', 'Terrenos', function($scope,$http,$routeParams,Terrenos){
		
		var id = $routeParams.id;

		$scope.actualizado = false;
		$scope.terreno = {};

		$scope.creando = false;

		if (id == 'new') {
			$scope.creando = true;
			$scope.terreno = {};
		}
		else{
			Terrenos.buscar(id).then(function(){
				
				$scope.creando = true;
				$scope.terreno = Terrenos.terrenos[0];
				console.log($scope.terreno);
				

				if ($scope.terreno == undefined) {

					window.location = '#/terrenos';
					return;
				}
				

			});
		}



		$scope.guardarTerreno = function( terreno ){

			if ($scope.creando) { //new
				Terrenos.guardar( terreno ).then( function(){
					console.log(terreno);
				$scope.actualizado = true;
				setTimeout(function(){
					$scope.actualizado = false;
					$scope.$apply();
				},3000);

				setTimeout(function(){
					window.location = '#/terrenos';
					return;
					$scope.$apply();
				},2000);

				

				//frmProductores.autoValidateFormOptions.resetForm();
			});
			}else{ //update
				Terrenos.guardar( terreno ).then( function(){
					console.log(terreno);
				$scope.actualizado = true;
				setTimeout(function(){
					$scope.actualizado = false;
					$scope.$apply();
				},3500);

				setTimeout(function(){
					window.location = '#/terrenos';
					return;
					$scope.$apply();
				},2000);
				
				//frmProductores.autoValidateFormOptions.resetForm();
			});
			}
			
		}

		$scope.reset = function(frmTerreno){
			$scope.terreno = {};
			 if (frmTerreno) {
      			frmTerreno.$setPristine();
      			frmTerreno.$setUntouched();
    		}
		}

	}]);

