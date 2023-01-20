<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");



$parametro = $_GET['id'];
$id_user = $_SESSION["id_user"];

if(is_numeric($parametro)){

$sql = "SELECT detalle_gasto.id_detalle_gasto, dt_precio, ctl_gastos.ctl_descripcion, tipo_gasto.tpgst_act_descripcion
		FROM parcela INNER JOIN gastos
		ON parcela.id_parcela = gastos.id_parcela
		INNER JOIN detalle_gasto
		ON gastos.id_gasto = detalle_gasto.id_gasto
		INNER JOIN ctl_gastos
		ON detalle_gasto.id_ctl_gasto = ctl_gastos.id_ctl_gasto
		INNER JOIN tipo_gasto
		ON ctl_gastos.id_tipo_gasto = tipo_gasto.id_tipo_gasto
		WHERE gastos.id_gasto = '$parametro' AND parcela.id_productor = '$id_user';";

	$respuesta = array(
				'err' => false,
				'gastos' => Database::get_arreglo( $sql )
			);
}
else {
	$respuesta = array(
				'err' => true
			);
}
	echo json_encode( $respuesta );

?>
