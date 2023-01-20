<?php
	session_start();
  session_destroy();


?><!DOCTYPE html>
<html ng-app="loginApp" ng-controller="mainCtrl">
  <head><meta http-equiv="Content-Type" content="text/html; charset=euc-jp">
    
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Coeplim | Log in</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">

     <link rel="stylesheet" type="text/css" href="css/style.css">
    <!-- Bootstrap 3.3.5 -->
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <!-- Ionicons -->
    <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">

    <!-- Theme style -->
    <link rel="stylesheet" href="AdminLTE.min.css">

		<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-material-design/0.3.0/css/material-fullpalette.min.css">

    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-material-design/0.3.0/css/ripples.min.css">


	<script src="angular/lib/angular.min.js"></script>
	<script src="angular/app.js"></script>
	<script src="angular/servicios/login_service.js"></script>




    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body class="hold-transition login-page">
    <div class="cover">



    <div class="login-box">
      <div class="login-logo">

        <img class="imagen" src="images/logo.png"><br><br>
        <label class="amarillo">Trace</label>
        <label class="verde">Lemon</label>


      </div><!-- /.login-logo -->


      <div class="login-box-body">

        <!--<p class="login-box-msg">Ingrese su correo</p>-->
				<br>

        <form name="forma" ng-submit=" ingresar( datos ) ">

          <div class="form-group has-feedback">

            <input type="email"
            	   class="form-control"
            	   placeholder="Correo"
            	   name="correo"
            	   required="required"
            	   ng-model="datos.correo"
								 ng-minlength="4"
								 ng-maxlength="80">

            <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
						<div class="">
								<span class="text-danger" ng-show="!forma.$pristine && forma.correo.$error.required">
										<strong>Correo es Requerido!!!</strong>
								</span>
								<span class="text-danger" ng-show="forma.correo.$error.minlength">
        						<strong>Muy Corto!</strong>
        				</span>
                <span class="text-danger" ng-show="forma.correo.$error.email">
                    <strong>Correo Invalido!</strong>
                </span>
      					<span class="text-danger" ng-show="forma.correo.$error.maxlength">
        						<strong>Muy Largo</strong>
        				</span>
					 </div>
          </div>

          <div class="form-group has-feedback">
            <input type="password"
                   class="form-control"
                   placeholder="Contraseña"
                   name="pass"
                   required="required"
            	     ng-model="datos.contrasena"
								   ng-minlength="7"
								   ng-maxlength="80">

            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
						<div class="">
                <span class="text-danger" ng-show="!forma.$pristine && forma.pass.$error.required">
                    <strong>Contraseña es Requerido!!!</strong>
                </span>
                <span class="text-danger" ng-show="forma.pass.$error.minlength">
                    <strong>Muy Corto!</strong>
                </span>
                <span class="text-danger" ng-show="forma.pass.$error.maxlength">
                   <strong>Muy Largo</strong>
                </span>
          </div>
          </div>

					<div class="row">
						<div class="col-md-6 col-md-offset-6 ">
							<a ng-click="mostrarModal()" style="cursor:pointer" class="dropdown-toggle" data-toggle="dropdown">Olvidaste tu contraseña</a>
						</div>
					</div>

					<br>

          <div class="row">
            <div class="col-xs-12">
              <button type="submit"
              		  class="btn btn-success btn-block"
              		  ng-disabled="forma.$invalid || cargando">Ingresar</button>
            </div><!-- /.col -->
          </div>


		<div class="row" ng-show="invalido">
			<div class="col-md-12">
				<br>
				<div class="alert alert-danger" ng-show="error">
					<strong>Verificar!</strong>
					{{ mensaje }}
				</div>
			</div>
		</div>




        </form>


      </div><!-- /.login-box-body -->
    </div><!-- /.login-box -->



	</div>


<div ng-include="'modalLogin.html'"></div>

	<!-- jQuery 2.1.4 -->
	<script src="jQuery-2.1.4.min.js"></script>
	<!-- Bootstrap 3.3.5 -->
	<script src="bootstrap/js/bootstrap.min.js"></script>


	<!-- material design -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-material-design/0.3.0/js/material.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-material-design/0.3.0/js/ripples.min.js"></script>


	<script >
			$.material.init();

	</script>

  </body>
</html>
