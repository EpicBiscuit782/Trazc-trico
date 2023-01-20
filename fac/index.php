<?php
session_start();

if( !isset( $_SESSION['user'] ) ){
  echo "Acceso denegado.";
  header ("Location: ../public/");
  die;

}


?>

<!DOCTYPE html>

<html ng-app="coeplimApp" ng-controller="mainCtrl">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Sistema de {{ config.aplicativo }}</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">

    <link rel="stylesheet" type="text/css" href="css/style.css">
    <!-- Bootstrap 3.3.5 -->
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
      
    <!-- Calendario -->
    <link rel="stylesheet" href="https://cdn.dhtmlx.com/scheduler/edge/dhtmlxscheduler.css">
    <script src="https://cdn.dhtmlx.com/scheduler/edge/dhtmlxscheduler.js"></script>
    <script src="https://cdn.dhtmlx.com/scheduler/edge/locale/locale_es.js" charset="utf-8"></script>
    <script src="https://cdn.dhtmlx.com/scheduler/edge/ext/dhtmlxscheduler_year_view.js"></script>
    <script src="https://cdn.dhtmlx.com/scheduler/edge/ext/dhtmlxscheduler_agenda_view.js"></script>
    <script src="https://cdn.dhtmlx.com/scheduler/edge/ext/dhtmlxscheduler_tooltip.js"></script>
      
    <!-- Font Awesome -->
    <!--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">-->
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-T8Gy5hrqNKT+hzMclPo118YTQO6cYprQmhrYwIiQ/3axmI1hQomh7Ud2hPOy8SP1" crossorigin="anonymous">
    <!-- Ionicons -->
    <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="dist/css/AdminLTE.min.css">
      
    <script defer src="https://friconix.com/cdn/friconix.js"> </script>

    <link rel="stylesheet" href="dist/css/skins/skin-green.min.css">

    <!-- material design -->
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-material-design/0.3.0/css/material-fullpalette.min.css">

    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-material-design/0.3.0/css/ripples.min.css">
      
    <link href="dist/css/angular-ui-notification.css" rel="stylesheet" type="text/css" />
      


    <!-- Estilos Personalizados -->
    <link rel="stylesheet" href="dist/css/animate.css">
      
    <link rel="stylesheet" href="dist/css/Chart.css">
      
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.58/pdfmake.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.58/vfs_fonts.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.58/pdfmake.js.map"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js"></script>
      
      
    <script src="https://unpkg.com/jspdf@latest/dist/jspdf.min.js"></script>
      
      <!--==========>~._.~<EpicBiscuit782==========-->
    <script src="https://kit.fontawesome.com/a076d05399.js"></script>
      

    <!-- Importaciones de angular -->
    <script src="angular/lib/angular.min.js"></script>
    <script src="angular/lib/angular-route.min.js"></script>
    <script src="angular/lib/jcs-auto-validate.min.js"></script>
    <script src="angular/lib/ui-utils.min.js"></script>
    <script src="angular/lib/JsBarcode.all.min.js"></script>
    <script src="angular/lib/Multidimensional.js"></script>
    <script src="angular/lib/ng-FitText.js"></script>
    <script src="dist/js/angular-locale_es-es.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-google-chart/0.1.0/ng-google-chart.min.js" type="text/javascript"></script>
    <script src="https://rawgithub.com/gsklee/ngStorage/master/ngStorage.js"></script>


    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.21.0/moment.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.23.0/locale/es.js"></script>

       <script src="dist/js/ui-bootstrap-tpls-2.5.0.min.js"></script>
    <!-- Controladores -->
    <script src="angular/app.js"></script>
    <script src="angular/Config/Routes.js"></script>


    <script src="angular/controladores/homeCtrl.js"></script>
    <script src="angular/controladores/homeNoticiaCtrl.js"></script>
    <script src="angular/controladores/noticiasCtrl.js"></script>
    <script src="angular/controladores/noticiaCtrl.js"></script>
    <script src="angular/controladores/tableroCtrl.js"></script>
    <script src="angular/controladores/proveedoresCtrl.js"></script>
    <script src="angular/controladores/proveedorCtrl.js"></script>
    <script src="angular/controladores/insumosCtrl.js"></script>
    <script src="angular/controladores/insumosPCtrl.js"></script>
    
    <!--======>._.<EpicBiscuit782=========-->
    <script src="angular/controladores/tipo_etapasCtrl.js"></script>
    <script src="angular/controladores/tipo_etapaCtrl.js"></script>
    <script src="angular/servicios/tipo_etapas_service.js"></script>

    <!--=======================================-->
    <script src="angular/controladores/insumoCtrl.js"></script>
    <script src="angular/controladores/tipo_insumosCtrl.js"></script>
    <script src="angular/controladores/tipo_insumoCtrl.js"></script>
    <script src="angular/controladores/productoresCtrl.js"></script>
    <script src="angular/controladores/productorCtrl.js"></script>
    <script src="angular/controladores/parcelasCtrl.js"></script>
    <script src="angular/controladores/parcelaCtrl.js"></script>
    <script src="angular/controladores/antecedentesCtrl.js"></script>
    <script src="angular/controladores/compradoresCtrl.js"></script>
    <script src="angular/controladores/compradorCtrl.js"></script>
    <!--Check-->
    <script src="angular/controladores/tipo_gastosCtrl.js"></script>
    <!--Check-->
    <script src="angular/controladores/tipo_gastoCtrl.js"></script>
    <script src="angular/controladores/ctl_gastosCtrl.js"></script>
    <script src="angular/controladores/ctl_gastoCtrl.js"></script>
    <script src="angular/controladores/regimensCtrl.js"></script>
    <script src="angular/controladores/regimenCtrl.js"></script>
  <!--  <script src="angular/controladores/terrenosCtrl.js"></script>
    <script src="angular/controladores/terrenoCtrl.js"></script> -->
    <script src="angular/controladores/variedadesCtrl.js"></script>
    <script src="angular/controladores/variedadCtrl.js"></script>
    <script src="angular/controladores/huertosCtrl.js"></script>
    <script src="angular/controladores/huertoCtrl.js"></script>
    <script src="angular/controladores/riegosCtrl.js"></script>
    <script src="angular/controladores/tipo_enfermedadesCtrl.js"></script>
    <script src="angular/controladores/tipo_enfermedadCtrl.js"></script>
    <script src="angular/controladores/enfermedadesCtrl.js"></script>
    <script src="angular/controladores/enfermedadesRecoCtrl.js"></script>
    <script src="angular/controladores/enfermedadRecoCtrl.js"></script>
    <script src="angular/controladores/enfermedadCtrl.js"></script>
    <script src="angular/controladores/controlCtrl.js"></script>
    <script src="angular/controladores/controlesCtrl.js"></script>
    <script src="angular/controladores/manejosCtrl.js"></script>
    <script src="angular/controladores/manejoCtrl.js"></script>
    <script src="angular/controladores/detalle_manejoCtrl.js"></script>
    <script src="angular/controladores/nutricionsCtrl.js"></script>
    <script src="angular/controladores/nutricionCtrl.js"></script>
    <script src="angular/controladores/detalle_nutricionCtrl.js"></script>

    <script src="angular/controladores/responsablesCtrl.js"></script>
    <script src="angular/controladores/responsableCtrl.js"></script>
    <script src="angular/controladores/portainjertosCtrl.js"></script>
    <script src="angular/controladores/portainjertoCtrl.js"></script>

    <script src="angular/controladores/administradoresCtrl.js"></script>
    <script src="angular/controladores/adminCtrl.js"></script>
        
    <script src="angular/controladores/miembrosCtrl.js"></script>
    <script src="angular/controladores/equipoCtrl.js"></script>

    <script src="angular/controladores/analisis_SuelosCtrl.js"></script>
    <script src="angular/controladores/analisis_sueloCtrl.js"></script>
    <script src="angular/controladores/analisis_foliaresCtrl.js"></script>
    <script src="angular/controladores/analisis_foliarCtrl.js"></script>
    <script src="angular/controladores/analisis_aguasCtrl.js"></script>
    <script src="angular/controladores/analisis_aguaCtrl.js"></script>

    <script src="angular/controladores/GastosCtrl.js"></script>
    <script src="angular/controladores/cosechaCtrl.js"></script>
    <script src="angular/controladores/cosechaGralCtrl.js"></script>
    <script src="angular/controladores/detalle_cosechaCtrl.js"></script>
    <script src="angular/controladores/CompraCtrl.js"></script>
    <script src="angular/controladores/comprasCtrl.js"></script>
    <script src="angular/controladores/detalle_compraCtrl.js"></script>
    <script src="angular/controladores/riegoCtrl.js"></script>

    <script src="angular/controladores/trazabilidadCtrl.js"></script>
    <script src="angular/controladores/codigoCtrl.js"></script>



    <script src="angular/controladores/cosecMunicipioCtrl.js"></script>
    <script src="angular/controladores/cosechaTotalCtrl.js"></script>
    <script src="angular/controladores/cosechaAnualCtrl.js"></script>
    <script src="angular/controladores/cosechaParcelaCtrl.js"></script>
    <script src="angular/controladores/reporteComprasCtrl.js"></script>
    <script src="angular/controladores/reporteGastosCtrl.js"></script>
    <script src="angular/controladores/reporteAplicacionCtrl.js"></script>
    <script src="angular/controladores/reporteCosechasCtrl.js"></script>
   <!-- <script src="angular/controladores/riegoAnualCtrl.js"></script>
    <script src="angular/controladores/repRiegParcelaCtrl.js"></script> -->
    <script src="angular/controladores/ventasAnualCtrl.js"></script>
    <script src="angular/controladores/vtaParcelaAnualCtrl.js"></script>
   <!--   <script src="angular/controladores/reporteVentasCtrl.js"></script> -->
    <script src="angular/controladores/reporteRiegosCtrl.js"></script>
    <script src="angular/controladores/reportegralCtrl.js"></script>
   <!--    <script src="angular/controladores/parcelasRepCtrl.js"></script> -->
    <script src="angular/controladores/gastosRepCtrl.js"></script>
    <script src="angular/controladores/gastos_cosechaCtrl.js"></script>
    <!--  <script src="angular/controladores/gastosGeneralCtrl.js"></script> -->
    <script src="angular/controladores/gastosParcelaCtrl.js"></script>
    <script src="angular/controladores/inversionCtrl.js"></script>
    <script src="angular/controladores/expedienteCtrl.js"></script>


    <!-- servicios -->
    <script src="angular/servicios/configuracion_service.js"></script>


    <script src="angular/servicios/home_service.js"></script>
    <script src="angular/servicios/tablero_service.js"></script>
    <script src="angular/servicios/noticia_service.js"></script>
    <script src="angular/servicios/proveedores_service.js"></script>
    <script src="angular/servicios/insumos_service.js"></script>
    <script src="angular/servicios/tipo_insumos_service.js"></script>
    <script src="angular/servicios/productores_service.js"></script>
    <script src="angular/servicios/session_service.js"></script>
    <script src="angular/servicios/parcelas_service.js"></script>
    <script src="angular/servicios/antecedentes_service.js"></script>
    <script src="angular/servicios/compradores_service.js"></script>
    <!--Check-->
    <script src="angular/servicios/tipo_gastos_service.js"></script>
    <script src="angular/servicios/ctl_gastos_service.js"></script>
    <script src="angular/servicios/regimen_service.js"></script>
    <script src="angular/servicios/Gastos_service.js"></script>
    <script src="angular/servicios/Cosecha_service.js"></script>
    <script src="angular/servicios/Venta_service.js"></script>
    <script src="angular/servicios/Compra_service.js"></script>
    <script src="angular/servicios/analisis_suelo_service.js"></script>
    <script src="angular/servicios/analisis_foliar_service.js"></script>
    <script src="angular/servicios/analisis_agua_service.js"></script>
  <!--  <script src="angular/servicios/terreno_service.js"></script> -->
    <script src="angular/servicios/variedad_service.js"></script>
    <script src="angular/servicios/huerto_service.js"></script>
    <script src="angular/servicios/riego_service.js"></script>
    <script src="angular/servicios/tipo_enfermedad_service.js"></script>
    <script src="angular/servicios/enfermedades_service.js"></script>
    <script src="angular/servicios/control_service.js"></script>
    <script src="angular/servicios/manejo_service.js"></script>
    <script src="angular/servicios/responsable_service.js"></script>
    <script src="angular/servicios/nutricion_service.js"></script>
    <script src="angular/servicios/portainjerto_service.js"></script>
    <script src="angular/servicios/expediente_service.js"></script>
    <script src="angular/servicios/admin_service.js"></script>
    <script src="angular/servicios/equipo_service.js"></script>

    <!-- directivas -->





  </head>



  <body class="hold-transition skin-green sidebar-mini" >
    <div class="wrapper">

      <!-- Main Header -->
      <header class="main-header">

        <!-- Logo -->
        <a href="#/" class="logo">
          <!-- mini logo for sidebar mini 50x50 pixels -->
          <span class="logo-mini"><img src="dist/img/lemon.png" alt="" width="25px" height="25px">
</span>
          <!-- logo for regular state and mobile devices -->
         <img src="dist/img/logo.png" alt="" width="220px" height="50px">
        </a>

        <!-- Header Navbar -->
        <nav class="navbar navbar-static-top" role="navigation">
          <!-- Sidebar toggle button-->
          <a href="" class="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span class="sr-only">Toggle navigation</span>
          </a>
          <!-- Navbar Right Menu -->
          <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">

              <!-- Messages: style can be found in dropdown.less-->

              <!--<li class="dropdown messages-menu"
                ng-include="'template/menu/notificaciones.html'">
              </li>->

              <!-- /.messages-menu -->

              <!-- Notifications Menu -->
              <li ng-show="isUser" class="dropdown user user-menu">
                  <!-- Menu Toggle Button -->
                  <a  ng-click="mostrarModal()" class="dropdown-toggle" data-toggle="dropdown">
                    <!-- The user image in the navbar-->
                    <img src="dist/img/limon.jpg" class="user-image" alt="Parcela">
                    <!-- hidden-xs hides the username on small devices so only the image appears. -->
                    <span class="hidden-xs"><b>{{ dataParcela.alias }}</b></span>
                  </a>
              </li>

              <!-- User Account Menu -->
              <li class="dropdown user user-menu"
                  ng-include="'template/menu/usuario.html'">
              </li>

            </ul>
          </div>
        </nav>
      </header>
      <!-- Left side column. contains the logo and sidebar -->
      <aside class="main-sidebar"
          ng-include="'template/menu/menu.html'">
      </aside>

      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">



        </section>

        <!-- Main content -->
        <section class="content" ng-view>

          <!--
          <ol class="breadcrumb">
            <li><a href=""><i class="fa fa-dashboard"></i> Level</a></li>
            <li class="active">Here</li>
          </ol>
          -->

          <!-- Your Page Content Here -->

        </section><!-- /.content -->
        <div ng-include="'template/parcela/mod_parcela.html'"></div>
      </div><!-- /.content-wrapper -->

      <!-- Main Footer -->
      <footer class="main-footer">
        <!-- To the right -->
        <div class="pull-right hidden-xs">
          {{ config.version }}
        </div>
        <!-- Default to the left -->
        <strong>Copyright &copy; {{ config.anio }}
            <a href="{{ config.web }}" target="blank">Compañía</a>.
        </strong> Derechos reservados.
      </footer>


    </div><!-- ./wrapper -->

    <!-- REQUIRED JS SCRIPTS -->


    <!-- jQuery 2.1.4 -->
    <script src="plugins/jQuery/jQuery-2.1.4.min.js"></script>
      
    <!-- Excel -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.js"></script>
    <script src="https://www.igniteui.com/js/external/FileSaver.js"></script>
    <script src="https://www.igniteui.com/js/external/Blob.js"></script>
    <script type="text/javascript" src="dist/js/infragistics.core.js"></script>
    <script type="text/javascript" src="dist/js/infragistics.ext_core.js"></script>
    <script type="text/javascript" src="dist/js/infragistics.ext_collections.js"></script>
    <script type="text/javascript" src="dist/js/infragistics.ext_text.js"></script>
    <script type="text/javascript" src="dist/js/infragistics.ext_io.js"></script>
    <script type="text/javascript" src="dist/js/infragistics.ext_ui.js"></script>
    <script type="text/javascript" src="dist/js/infragistics.documents.core_core.js"></script>
    <script type="text/javascript" src="dist/js/infragistics.ext_collectionsextended.js"></script>
    <script type="text/javascript" src="dist/js/infragistics.excel_core.js"></script>
    <script type="text/javascript" src="dist/js/infragistics.ext_threading.js"></script>
    <script type="text/javascript" src="dist/js/infragistics.ext_web.js"></script>
    <script type="text/javascript" src="dist/js/infragistics.xml.js"></script>
    <script type="text/javascript" src="dist/js/infragistics.documents.core_openxml.js"></script>
    <script type="text/javascript" src="dist/js/infragistics.excel_serialization_openxml.js"></script>
    <script type="text/javascript" src="dist/js/jquery.tabletojson.js"></script>

    <!-- Bootstrap 3.3.5 -->
    <script src="bootstrap/js/bootstrap.min.js"></script>


    <!-- material design -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-material-design/0.3.0/js/material.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-material-design/0.3.0/js/ripples.min.js"></script>
      
      
    <!--charts js -->
    <script src="dist/js/Chart.js"></script>
    <script src="dist/js/angular-chart.js"></script>
      
      <!--Lodash -->
    <script src="dist/js/lodash.js"></script>
      


      
    <script type="text/javascript" src="dist/js/angular-ui-notification.js"></script>

    <script src="//mgcrea.github.io/angular-strap/dist/angular-strap.js" data-semver="v2.3.8"></script>
    <script src="//mgcrea.github.io/angular-strap/dist/angular-strap.tpl.js" data-semver="v2.3.8"></script>
    <script src="//mgcrea.github.io/angular-strap/docs/angular-strap.docs.tpl.js" data-semver="v2.3.8"></script>
      
    <script src="dist/js/app.min.js"></script>



  </body>
</html>