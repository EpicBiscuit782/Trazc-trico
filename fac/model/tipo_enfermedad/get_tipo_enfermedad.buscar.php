<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");


$parametro = $_GET['id'];
//$id_user = $mysqli->real_escape_string($_SESSION["id_user"]);


if(is_numeric($parametro)){

	$sql = "SELECT * FROM tipo_enfermedad where id_tipo_enfermedad = '$parametro'";

	$respuesta = array(
				'err' => false,
				'tipo_enfermedad' => Database::get_row( $sql )
			);


}
else {
	$respuesta = array(
				'err' => true
			);
}


echo json_encode( $respuesta );


?>
