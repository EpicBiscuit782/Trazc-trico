<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");



$parametro = $_GET['id'];



if(is_numeric($parametro)){

	$sql = "SELECT * FROM insumo where id_insumo = '$parametro'";

	$respuesta = array(
				'err' => false,
				'insumo' => Database::get_row( $sql )
			);


}
else {
	$respuesta = array(
				'err' => true
			);
}

echo json_encode( $respuesta );


?>
