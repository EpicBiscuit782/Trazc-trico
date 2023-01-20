<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");



$parametro = $_GET['id'];


if(is_numeric($parametro)){

	$sql = "SELECT insumo.id_insumo, insumo.nombre_com FROM insumo INNER JOIN tipo_insumo
			ON insumo.id_tipo_insumo = tipo_insumo.id_tipo_insumo
			WHERE tipo_insumo.id_tipo_insumo = '$parametro'";

	$respuesta = array(
				'err' => false,
				'categoria' => Database::get_arreglo( $sql )
			);


}
else {
	$respuesta = array(
				'err' => true
			);
}

echo json_encode( $respuesta );


?>
