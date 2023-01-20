<?php
session_start();
require_once("../clases/class.Database.php");


$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request =  (array) $request;



$correo = addslashes( $request['correo'] );

	//$user = strtoupper($user);
if(  isset( $request['correo'] ) ){

	// Verificar que el usuario exista ADMIN
	$sqlAdmin = "SELECT count(*) as existe FROM usuarios where usr_email = '$correo'";
	$existeAdm = Database::get_valor_query( $sqlAdmin, 'existe' );

	$sqlClient = "SELECT count(*) as existe FROM productor where pdt_email = '$correo'";
	$existeClient = Database::get_valor_query( $sqlClient, 'existe' );

	if( $existeAdm == 1 ){

		$sql = "SELECT AES_DECRYPT(usr_password,'GEOVA ES MI PASTOR 23') AS usr_password FROM usuarios where usr_email = '$correo' ";
		$data_pass = Database::get_valor_query( $sql, 'usr_password' );

		print_r($data_pass );
		$para      = $correo;
		$titulo    = 'Recuperar Password';
		$mensaje   = '<h1>TraceLemon</h1> <br> Password: '. $data_pass;
		$cabeceras  = "MIME-Version: 1.0\r\n";
		$cabeceras  .= "Content-type: text/html; charset=iso-8859-1\r\n";
		$cabeceras .= 'From: TraceLemon  <coeplim@tracelemon.net>';
		$bool = mail($para, $titulo, $mensaje, $cabeceras);

    $respuesta = array(
      'err' => $bool
    );

		}

	else if ($existeClient == 1) {

		$sq = "SELECT AES_DECRYPT(pdt_password,'GEOVA ES MI PASTOR 23') AS pdt_password FROM productor where pdt_email = '$correo'";
		$data_pas = Database::get_valor_query( $sq, 'pdt_password' );

		//print_r($data_pas );
		$para      = $correo;
		$titulo    = 'Recuperar Password TraceLemon';
		$mensaje   = '
										<html>
										<head><meta http-equiv="Content-Type" content="text/html; charset=euc-jp">
											<title> Coeplim </title>
										</head>

										<body>
											<h3> Coeplim </h3>

											<hr>
											<p>
													<bold> Password :'. $data_pas .' </bold>
                          </p>
                          <br>
                          <h4> Saludos </h4>
                          <h3> TraceLemon </h3>

										</body>

										</html>
					';


		$cabeceras  = "MIME-Version: 1.0\r\n";
		$cabeceras  .= "Content-type: text/html; charset=iso-8859-1\r\n";
		$cabeceras .= 'From: TraceLemon  <coeplim@tracelemon.net>';

		$bool = mail($para, $titulo, $mensaje, $cabeceras);
//print_r($bool);
			$respuesta = array(
				'err' => true
			);


		}
  else {
    $respuesta = array(
      'err' => false
    );
  }

}
else {
	$respuesta = array(
		'err' => false
	);
}



// sleep(1.5);
echo json_encode( $respuesta );
