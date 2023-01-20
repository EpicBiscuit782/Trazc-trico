var app = angular.module('coeplimApp.antecedentesCtrl', []);

	app.controller('antecedentesCtrl', ['$scope','$http', 'Antecedente', 'Responsable','Notification', function($scope,$http,Antecedente,Responsable,Notification){

     
    $scope.croquisPrev = [];
    $scope.antPrev = [];
    $scope.eviPrev = [];
    $scope.guardando = false;
    $scope.new = true;
    $scope.editando = false;
        
    Antecedente.getAnt($scope.dataParcela.id).then(function () {
        if (!jQuery.isEmptyObject(Antecedente.ant)) {
            $scope.antecedente = Antecedente.ant;
            $scope.new = false;
        };
    });

    $scope.croquisUpload = function(event){
         var files = event.target.files;

         for (var i = 0; i < files.length; i++) {
             var file = files[i];
                 var reader = new FileReader();
                 reader.onload = $scope.croquisIsLoaded; 
                 reader.readAsDataURL(file);
         }
    }

    $scope.croquisIsLoaded = function(e){
        $scope.$apply(function() {
            $scope.croquisPrev.push(e.target.result);
        });
    }
    
    
    $scope.antUpload = function(event){
         var files = event.target.files;

         for (var i = 0; i < files.length; i++) {
             var file = files[i];
                 var reader = new FileReader();
                 reader.onload = $scope.antIsLoaded; 
                 reader.readAsDataURL(file);
         }
    }

    $scope.antIsLoaded = function(e){
        $scope.$apply(function() {
            $scope.antPrev.push(e.target.result);
        });
    }
    
    $scope.eviUpload = function(event){
         var files = event.target.files;

         for (var i = 0; i < files.length; i++) {
             var file = files[i];
                 var reader = new FileReader();
                 reader.onload = $scope.eviIsLoaded; 
                 reader.readAsDataURL(file);
         }
    }

    $scope.eviIsLoaded = function(e){
        $scope.$apply(function() {
            $scope.eviPrev.push(e.target.result);
        });
    }
     
	$scope.upload = function(){
		var uploadForm = new FormData();
		angular.forEach($scope.filesCroquis, function(file){
			uploadForm.append('fileCroquis[]', file);
		});
        
        angular.forEach($scope.filesAnt, function(file){
			uploadForm.append('fileAnt[]', file);
		});

        angular.forEach($scope.filesEvi, function(file){
			uploadForm.append('fileEvi[]', file);
		});

        var data = JSON.stringify($scope.antecedente);
        uploadForm.append('data', data);
        uploadForm.append('id_parcela', $scope.dataParcela.id);
        
        Antecedente.guardar(uploadForm).then(function () {
            $scope.guardando = true;
            if (Antecedente.err) {
                $scope.guardando = false;
                Notification.error({
                    message: 'Ocurrió un error.',
                    title: 'El antecedente no se registró correctamente. Por favor inténtelo nuevamente.',
                    delay: 3000
                });
                $scope.$apply();
            } else {
                $scope.guardando = false;
                Notification.success({
                    message: 'El antecedente se registró correctamente.',
                    delay: 3000
                });
                window.location = '#/antecedentes';
            }
        });
	};
 
    
    /*
	$scope.fetch = function(){
		$http.get('model/huertos/show_images.php')
		.success(function(data){
			$scope.images = data;
		});
	}
    */
		$scope.reset = function(frmAnt){

			$scope.antecedente = {
				acciones: "",
				peligros:''
			};

			 if (frmAnt) {
      			frmAnt.$setPristine();
      			frmAnt.$setUntouched();
    		}
		}

	}]);