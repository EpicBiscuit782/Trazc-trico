<?php
//session_start();
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");


//$id_user = $_SESSION['id_user'];


	$sql = "SELECT * FROM tipo_insumo";

	$respuesta = array(
				'err' => true,
				'tipo_insumos' => Database::get_arreglo( $sql )
			);

echo json_encode( $respuesta );


?>
