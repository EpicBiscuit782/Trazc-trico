var app = angular.module('coeplimApp.codigoCtrl', []);

	app.controller('codigoCtrl', ['$scope', 'Parcelas', '$routeParams', 'Cosecha', function ($scope,Parcelas,$routeParams,Cosecha) {

     $scope.id_produccion = $routeParams.id;

		$scope.errorCodigo = false;
		$scope.errorTam = false;
		$scope.codigo= "";
		$scope.id_parcela= "";
		$scope.municipio= "";
		$scope.fecha= "";

// falta lote  dia  y año

    $scope.code = {
			pais : '750',
			estado : '09',
			municipio : '',
			huerta : '',
			cultivo : '805',
			variedad : '30',
			seccion : '01',
			lote : '03116'
		};

    //valida que sea numero el parametro

    Cosecha.buscarMunicipio( $scope.id_produccion )
    .then(function( ){
      $scope.municipio = Cosecha.info.pcl_municipio;
      $scope.id_parcela = Cosecha.info.id_parcela;
      $scope.dia = Cosecha.info.dia;
      $scope.mes = Cosecha.info.mes;
      $scope.year = Cosecha.info.year;
      $scope.fullyear = Cosecha.info.fullyear;
      //console.log(Cosecha.info);

      if ($scope.municipio == 'ARMERÍA') {
        $scope.code.municipio = '001';
      }
      else if($scope.municipio == 'COLIMA'){
        $scope.code.municipio = '002';
      }
      else if($scope.municipio == 'COMALA'){
        $scope.code.municipio = '003';
      }
      else if($scope.municipio == 'COQUIMATLÁN'){
        $scope.code.municipio = '004';
      }
      else if($scope.municipio == 'CUAUHTEMOC'){
        $scope.code.municipio = '005';
      }
      else if($scope.municipio == 'IXTLAHUACAN'){
        $scope.code.municipio = '006';
      }
      else if($scope.municipio == 'MANZANILLO'){
        $scope.code.municipio = '007';
      }
      else if($scope.municipio == 'MINATITLAN'){
        $scope.code.municipio = '008';
      }
      else if($scope.municipio == 'TECOMAN'){
        $scope.code.municipio = '009';
      }
      else {
        $scope.code.municipio = '010';
      }

      //console.log($scope.id_produccion.length);

      if ($scope.id_produccion.length == 1) {
        //var parc = '000' + $scope.id_produccion;
        $scope.code.huerta = '000' + $scope.id_produccion;
      }
      else if ($scope.id_produccion.length == 2) {
        $scope.code.huerta = '00'+ $scope.id_produccion;
      }
      else if ($scope.id_produccion.length == 3) {
        $scope.code.huerta = '0'+ $scope.id_produccion;
      }
      else if ($scope.id_produccion.length == 4) {
        $scope.code.huerta =  $scope.id_produccion;
      }

      var biciesto = 0;
      if (($scope.fullyear % 4 == 0) && (($scope.fullyear % 100 != 0) || ($scope.fullyear % 400 == 0)) ){
        biciesto = 1
        //console.log("biciesto");
      }

      switch ($scope.mes) {
        case '01':$scope.code.lote = "0" + $scope.dia + $scope.year;
          break;
        case '02': $scope.code.lote = "0" + (parseInt($scope.dia)+31) + $scope.year;
          break;
        case '03': $scope.code.lote = "0" + (parseInt($scope.dia)+59+biciesto) + $scope.year;
          break;
        case '04'://console.log("abril");
                if ($scope.dia > 9) {
                  $scope.code.lote = (parseInt($scope.dia)+90+biciesto) + $scope.year;
                }
                else {
                  $scope.code.lote = "0" + (parseInt($scope.dia)+90+biciesto) + $scope.year;
                }
                //console.log($scope.code.lote);
          break;
        case '05': $scope.code.lote =  (parseInt($scope.dia)+120+biciesto) + $scope.year;

          break;
        case '06': $scope.code.lote =  (parseInt($scope.dia)+151+biciesto) + $scope.year;

          break;
        case '07': $scope.code.lote =  (parseInt($scope.dia)+181+biciesto) + $scope.year;

          break;
        case '08': $scope.code.lote = (parseInt($scope.dia)+212+biciesto) + $scope.year;

          break;
        case '09': $scope.code.lote = (parseInt($scope.dia)+243+biciesto) + $scope.year;

          break;
        case '10': $scope.code.lote = (parseInt($scope.dia)+273+biciesto) + $scope.year;

          break;
        case '11': $scope.code.lote = (parseInt($scope.dia)+304+biciesto) + $scope.year;

          break;
        case '12': $scope.code.lote = (parseInt($scope.dia)+334+biciesto) + $scope.year;

          break;
        default:

      }


      JsBarcode("#barcode", $scope.code.pais + $scope.code.estado + $scope.code.municipio + $scope.code.huerta + $scope.code.cultivo + $scope.code.variedad + $scope.code.seccion + $scope.code.lote);

    });





	}]);
