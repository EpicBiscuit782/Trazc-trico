<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");


$parametro = $_GET['id'];


if(is_numeric($parametro)){

	$sql = "SELECT * FROM tipo_gasto where id_tipo_gasto = '$parametro'";

	$respuesta = array(
				'err' => true,
				'tipo_gasto' => Database::get_row( $sql )
			);


}

echo json_encode( $respuesta );


?>
