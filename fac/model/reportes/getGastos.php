<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$id_user = $_SESSION["id_user"];


$sql = "SELECT detalle_gasto.id_detalle_gasto, gastos.gst_fecha, dt_precio, ctl_gastos.ctl_descripcion, tipo_gasto.tpgst_act_descripcion, parcela.pcl_alias
		FROM parcela 
        INNER JOIN gastos ON parcela.id_parcela = gastos.id_parcela
		INNER JOIN detalle_gasto ON gastos.id_gasto = detalle_gasto.id_gasto
		INNER JOIN ctl_gastos ON detalle_gasto.id_ctl_gasto = ctl_gastos.id_ctl_gasto
		INNER JOIN tipo_gasto ON ctl_gastos.id_tipo_gasto = tipo_gasto.id_tipo_gasto
		WHERE parcela.id_productor = '$id_user';";

	$respuesta = array(
				'err' => false,
				'gastos' => Database::get_arreglo( $sql )
			);

	echo json_encode( $respuesta );

?>
