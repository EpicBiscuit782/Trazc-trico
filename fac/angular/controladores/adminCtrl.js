var app = angular.module('coeplimApp.adminCtrl', []);

	app.controller('adminCtrl', ['$scope','$http', '$routeParams', 'Admin', function($scope,$http,$routeParams,Admin){

		var id = $routeParams.id;

		$scope.actualizado = false;
		$scope.admin = {};

		$scope.creando = false;
		$scope.error = false;
		$scope.buscar = true;
    //console.log("admin");

		if (id == 'new') {
			$scope.creando = true;
			$scope.admin = {};
		}
		else{
			Admin.buscar(id).then(function(){

				$scope.creando = false;
				$scope.buscar = false;
				$scope.admin = Admin.admin;
				$scope.admin.id_usuario = id;
				//console.log($scope.admin);


				if ($scope.admin == undefined || Admin.admin == '') {

					window.location = '#/administradores';
					return;
				}

			});
		}


		$scope.guardarAdmin = function( admin ){

			if ($scope.creando) { //new
				Admin.guardar( admin ).then( function(data){

					if (Admin.err) {
						$scope.error = true;
						setTimeout(function(){
							$scope.error = false;
							$scope.$apply();
						},3000);
						setTimeout(function(){
							window.location = '#/administradores';
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
							window.location = '#/administradores';
							return;
							$scope.$apply();
						},1000);
					}

				//frmProductores.autoValidateFormOptions.resetForm();
			});
			}else{ //update
				Admin.guardar( admin ).then( function(){
					if (Admin.err) {
						$scope.error = true;
						setTimeout(function(){
							$scope.error = false;
							$scope.$apply();
						},2000);
						setTimeout(function(){
							window.location = '#/administradores';
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
							window.location = '#/administradores';
							return;
							$scope.$apply();
						},1000);
					}
				//frmProductores.autoValidateFormOptions.resetForm();
			});
			}

		}

		$scope.reset = function(frmAdmin){
			$scope.admin = {
				usr_nombre_completo:"",
				usr_email:"",
				usr_password:""
			};
			 if (frmAdmin) {
      			frmAdmin.$setPristine();
      			frmAdmin.$setUntouched();
    		}
		}

	}]);
