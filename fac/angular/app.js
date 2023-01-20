var app = angular.module( 'coeplimApp',[

	//=============>._.<EpicBiscuit782====================
	'coeplimApp.tipo_etapas',
	'coeplimApp.tipo_etapasCtrl',
	'coeplimApp.tipo_etapaCtrl',

	//====================================================
		'ngRoute',
        'ngStorage',
		'googlechart',
		'coeplimApp.home',
		'coeplimApp.noticia',
		'coeplimApp.tablero',
		'coeplimApp.configuracion',
		'coeplimApp.productores',
		'coeplimApp.session',
		'coeplimApp.parcelas',
		'coeplimApp.antecedentes',
		'coeplimApp.compradores',
		'coeplimApp.tipo_gastos',
		'coeplimApp.ctl_gastos',
		'coeplimApp.propiedades',
		'coeplimApp.gastos',
		'coeplimApp.cosecha',
		'coeplimApp.venta',
		'coeplimApp.portainjertos',
		'coeplimApp.proveedores',
		//here
		'coeplimApp.insumos',
		'coeplimApp.tipo_insumos',
		'coeplimApp.compra',
		'coeplimApp.analisis_suelo',
		'coeplimApp.analisis_foliar',
		'coeplimApp.analisis_agua',
		//'coeplimApp.terrenos',
		'coeplimApp.variedades',
		'coeplimApp.huertos',
		'coeplimApp.riegos',
		'coeplimApp.tipo_enfermedad',
		'coeplimApp.enfermedades',
		'coeplimApp.control',
		'coeplimApp.manejos',
		'coeplimApp.nutricion',
		'coeplimApp.responsables',
		'coeplimApp.expediente',
		'coeplimApp.admin',
		'coeplimApp.equipo',

		'coeplimApp.homeCtrl',
		'coeplimApp.homeNoticiaCtrl',
		'coeplimApp.tableroCtrl',
		'coeplimApp.noticiasCtrl',
		'coeplimApp.noticiaCtrl',
		//here
		'coeplimApp.insumosCtrl',
		'coeplimApp.insumoCtrl',
		'coeplimApp.insumosPCtrl',
		'coeplimApp.tipo_insumosCtrl',
		'coeplimApp.tipo_insumoCtrl',
		'coeplimApp.proveedorCtrl',
		'coeplimApp.proveedoresCtrl',
		'coeplimApp.productoresCtrl',
		'coeplimApp.productorCtrl',
		'coeplimApp.parcelasCtrl',
		'coeplimApp.parcelaCtrl',
		'coeplimApp.antecedentesCtrl',
		'coeplimApp.compradoresCtrl',
		'coeplimApp.compradorCtrl',
		'coeplimApp.tipo_gastosCtrl',
		'coeplimApp.tipo_gastoCtrl',
		'coeplimApp.ctl_gastosCtrl',
		'coeplimApp.ctl_gastoCtrl',
		'coeplimApp.regimensCtrl',
		'coeplimApp.regimenCtrl',
		'coeplimApp.GastosCtrl',
		'coeplimApp.cosechaCtrl',
		'coeplimApp.detalle_cosechaCtrl',
		'coeplimApp.CompraCtrl',
		'coeplimApp.comprasCtrl',
		'coeplimApp.detalle_compraCtrl',
		'coeplimApp.analisis_suelosCtrl',
		'coeplimApp.analisis_sueloCtrl',
		'coeplimApp.analisis_foliaresCtrl',
		'coeplimApp.analisis_foliarCtrl',
		'coeplimApp.analisis_aguasCtrl',
		'coeplimApp.analisis_aguaCtrl',
		'coeplimApp.administradoresCtrl',
		'coeplimApp.adminCtrl',
		'coeplimApp.equipoCtrl',
		'coeplimApp.miembrosCtrl',

		'coeplimApp.portainjertosCtrl',
		'coeplimApp.portainjertoCtrl',
		//'coeplimApp.terrenosCtrl',
		//'coeplimApp.terrenoCtrl',
		'coeplimApp.variedadesCtrl',
		'coeplimApp.variedadCtrl',
		'coeplimApp.huertosCtrl',
		'coeplimApp.huertoCtrl',
		'coeplimApp.riegosCtrl',
		'coeplimApp.tipo_enfermedadesCtrl',
		'coeplimApp.tipo_enfermedadCtrl',
		'coeplimApp.enfermedadesCtrl',
		'coeplimApp.enfermedadesRecoCtrl',
		'coeplimApp.enfermedadRecoCtrl',
		'coeplimApp.enfermedadCtrl',

		'coeplimApp.responsablesCtrl',
		'coeplimApp.responsableCtrl',
		'coeplimApp.cosechaGralCtrl',

		'coeplimApp.controlCtrl',
		'coeplimApp.controlesCtrl',
		'coeplimApp.manejosCtrl',
		'coeplimApp.manejoCtrl',
		'coeplimApp.detalle_manejoCtrl',
		'coeplimApp.nutricionsCtrl',
		'coeplimApp.nutricionCtrl',
		'coeplimApp.detalle_nutricionCtrl',

		'coeplimApp.riegoCtrl',

		'coeplimApp.trazabilidadCtrl',
		'coeplimApp.codigoCtrl',
		//'coeplimApp.graficasCtrl',

		//REPORTES
		'coeplimApp.cosechaTotalCtrl',
		'coeplimApp.cosecMunicipioCtrl',
        'coeplimApp.reporteComprasCtrl',
        'coeplimApp.reporteCosechasCtrl',
        'coeplimApp.reporteGastosCtrl',
        'coeplimApp.reporteAplicacionCtrl',
		'coeplimApp.inversionCtrl',
		//'coeplimApp.gastosParcelaCtrl',
		//'coeplimApp.gastosGeneralCtrl',
		'coeplimApp.cosechaAnualCtrl',
		'coeplimApp.cosechaParcelaCtrl',
		//'coeplimApp.riegoAnualCtrl',
		//'coeplimApp.repRiegParcelaCtrl',
		'coeplimApp.ventasAnualCtrl',
		'coeplimApp.vtaParcelaAnualCtrl',
		//'coeplimApp.reporteVentasCtrl',
		//'coeplimApp.reporteRiegosCtrl',
		'coeplimApp.reportegralCtrl',
		'coeplimApp.expedienteCtrl',
		//'coeplimApp.parcelasRepCtrl',
		'coeplimApp.gastos_cosechaCtrl',
		'coeplimApp.gastosRepCtrl',
    
        'ui-notification',
        'ui.bootstrap',
        'chart.js',
        'ngFitText'

		]);

app.config(function($datepickerProvider) {
  angular.extend($datepickerProvider.defaults, {
    dateFormat: 'dd/MM/yyyy',
    startWeek: 1,
    autoclose: true,
    orientation:top
  });
});


app.config(function (ChartJsProvider) {
  ChartJsProvider.setOptions({ colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });
}); 

app.config(['uibDatepickerConfig', function (uibDatepickerConfig) {
    uibDatepickerConfig.showWeeks = false;

}]);

app.config(['uibDatepickerPopupConfig', function (uibDatepickerPopupConfig) {
    uibDatepickerPopupConfig.placement = 'auto bottom';
}]);

app.config(function(NotificationProvider) {
        NotificationProvider.setOptions({
            delay: 10000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'right',
            positionY: 'top'
        });
    });

app.controller('mainCtrl', ['$scope', '$http', '$sessionStorage', 'Configuracion', 'Session', 'Parcelas', function($scope, $http, $sessionStorage, Configuracion, Session, Parcelas){

	$scope.config = {};
	$scope.usuario = {};
	$scope.isUser = false;
	$scope.parc_select = {};
    if($sessionStorage.idparcelaActiva == undefined){
        $scope.dataParcela={
		'id':0,
		'alias':"Parcela"
	    };
    }else{
        $scope.dataParcela={
		'id':$sessionStorage.idparcelaActiva,
		'alias':$sessionStorage.aliasparcelaActiva
	    };
    }

	//$scope.parc_ban = false;

	Configuracion.cargar().then( function(){
		$scope.config = Configuracion.config;
		//console.log($scope.config);
	});


	// ================================================
	//   Funciones Globales del Scope
	// ================================================
	$scope.setActive = function( menu, submenu ){


		$scope.mDashboard = "";
		$scope.mClientes  = "";

		$scope[menu] = 'active';

	};


	// ***********************************
	//				SESSIONES
	// ***********************************

		Session.buscar().then(function(){
			$scope.usuario = Session.productores;

			$scope.isUser = $scope.usuario.user; //saber si es productor = true admin = false
			//console.log($scope.usuario.productor.pdt_nombre_completo);
			//console.log($scope.usuario);
			//console.log("hola");
		});

	//*********************************************
	//		CARGAR Y MOSTRAR MODAL PARCELA A SELECCIONAR
	//*********************************************

	$scope.mostrarModal = function(){

		$("#mod_selParcela").modal();

		Parcelas.seleccionar().then(function(){


			$scope.parc_select =Parcelas.parcelas;

			//console.log($scope.parc_select);
			if($scope.parc_select.parcela == undefined){
				$scope.parc_ban = true;

			}

		});

	}

	//*****************************************
	//		PARCELA SELECCIONADA
	//****************************************

	$scope.selParcela = function(ids,alia){
		$scope.dataParcela.id = ids;
		$scope.dataParcela.alias = alia;
		$("#mod_selParcela").modal('hide');
        $sessionStorage.idparcelaActiva = ids;
        $sessionStorage.aliasparcelaActiva = alia;
	}

}]);

// ================================================
//   Directivas
// ================================================
app.directive('enterKey', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.enterKey);
                });

                event.preventDefault();
            }
        });
    };
});
app.directive('dhxScheduler', function() {
  return {
    restrict: 'A',
    scope: false,
    transclude: true,
    template:'<div class="dhx_cal_navline" ng-transclude></div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div>',

    link:function ($scope, $element, $attrs, $controller){
      //default state of the scheduler
      if (!$scope.scheduler)
        $scope.scheduler = {};
      $scope.scheduler.mode = $scope.scheduler.mode || "month";
      $scope.scheduler.date = $scope.scheduler.date || new Date();

      //watch data collection, reload on changes
      $scope.$watch($attrs.data, function(collection){
        scheduler.clearAll();
        scheduler.parse(collection, "json");
          
      }, true);

      //mode or date
      $scope.$watch(function(){
        return $scope.scheduler.mode + $scope.scheduler.date.toString();
      }, function(nv, ov) {
        var mode = scheduler.getState();
        if (nv.date != mode.date || nv.mode != mode.mode)
          scheduler.setCurrentView($scope.scheduler.date, $scope.scheduler.mode);
      }, true);

      //size of scheduler
      $scope.$watch(function() {
        return $element[0].offsetWidth + "." + $element[0].offsetHeight;
      }, function() {
        scheduler.setCurrentView();
      });

      //styling for dhtmlx scheduler
      $element.addClass("dhx_cal_container");
        

      //init scheduler
      scheduler.init($element[0], $scope.scheduler.date, $scope.scheduler.mode);
    }
  }
});
//here
app.directive('dhxTemplate', ['$interpolate', function($interpolate){
  return {
    restrict: 'AE',
    terminal:true,
   
    link:function($scope, $element, $attrs, $controller){
      $element[0].style.display = 'none';

      var htmlTemplate = $interpolate($element.html());
      scheduler.locale.labels.agenda_tab="Agenda";
        
      scheduler.templates.event_text = function(start,end,event){
        return event.parcela;
      }
        
      var format = scheduler.date.date_to_str("%d-%m-%Y %H:%i"); 
      scheduler.templates.tooltip_text = function(start,end,event) {
          if(event.dosis==undefined)
          {
              return "<b>Evento: </b> "+event.text+"<br/><b>Parcela: </b> "+
            event.parcela+"<br/><b>Problema: </b> "+event.problema+"<br/><b>Responsable: </b> "+
            event.responsable+"<br/><b>Fecha Inicio: </b> "+
            format(start)+"<br/><b>Fecha Fin: </b>"+format(end);
          }
          else
          {
              return "<b>Evento: </b> "+event.text+"<br/><b>Parcela: </b> "+
            event.parcela+"<br/><b>Problema: </b> "+event.problema+"<br/><b>Responsable: </b> "+
            event.responsable+"<br/><b>Insumo: </b> "+event.insumo+"<br/><b>Dosis: </b>"+event.dosis+"<br/><b>Metodo: </b>"+event.metodo+"<br/><b>Fecha Inicio: </b>"+
            format(start)+"<br/><b>Fecha Fin: </b>"+format(end);
          }
      };

      scheduler.templates[$attrs.dhxTemplate] = function(start, end, event){
        return htmlTemplate({event: event});
      };
        

    }
  };
}]);
