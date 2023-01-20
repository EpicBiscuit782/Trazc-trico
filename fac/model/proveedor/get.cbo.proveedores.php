<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");


$id_user = $_SESSION["id_user"];

	$sql = "SELECT id_proveedor, empresa FROM proveedor WHERE id_productor = $id_user";

	$respuesta = array(
				'err' => true,
				'proveedor' => Database::get_arreglo( $sql )
			);


echo json_encode( $respuesta );


?>
