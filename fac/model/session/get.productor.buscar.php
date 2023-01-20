<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");


//$parametro = $_SESSION['id_user'];
//$email = $_SESSION['email'];




$parametro = $_SESSION['id_user'];
$email = $_SESSION["email"];



	$sql2 = "SELECT count(*) as existe FROM usuarios where usr_email = '$email'";
	$existAdmi = Database::get_valor_query( $sql2, 'existe' );

	$sql = "SELECT count(*) as existe FROM productor where pdt_email = '$email'";
	$existUser = Database::get_valor_query( $sql, 'existe' );

//print_r( $_SESSION);

	if ($existUser == 1) {
		$user = "SELECT pdt_nombre_completo, pdt_email FROM productor where pdt_email = '$email'";

		$respuesta = array(
				'err' => true,
				'productor' => Database::get_row( $user ),
				'user' => true
			);
			//print_r($respuesta);
	}
	else if($existAdmi == 1){
		$user = "SELECT usr_nombre_completo, usr_email FROM usuarios where usr_email = '$email'";
		$respuesta = array(
				'err' => true,
				'productor' => Database::get_row( $user ),
				'user' => false
			);
	}
	else{
		$respuesta = array('err' => true,
				'productor' => $existeUser
				);

	}

	//print_r($_SESSION );

echo json_encode( $respuesta );


?>
