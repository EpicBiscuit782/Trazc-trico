<?php
//session_start();
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");


//$id_user = $_SESSION['id_user'];


	$sql = "SELECT * FROM variedad";

	$respuesta = array(
				'err' => true,
				'variedades' => Database::get_arreglo( $sql )
			);

echo json_encode( $respuesta );


?>
