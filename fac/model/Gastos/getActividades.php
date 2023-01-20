<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");


$parametro = $_GET['id'];

if(is_numeric($parametro)){

	$sql = "SELECT ctl_gastos.id_ctl_gasto, ctl_gastos.ctl_descripcion FROM ctl_gastos INNER JOIN tipo_gasto
			ON ctl_gastos.id_tipo_gasto = tipo_gasto.id_tipo_gasto
			WHERE tipo_gasto.id_tipo_gasto = $parametro";

	$respuesta = array(
				'err' => false,
				'tipos' => Database::get_arreglo( $sql )
			);


}
else {
	$respuesta = array(
				'err' => true
			);
}

echo json_encode( $respuesta );


?>
