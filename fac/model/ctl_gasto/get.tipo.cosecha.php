<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");



	$act = "COSECHA";

	$sql = "SELECT id_ctl_gasto,ctl_descripcion 
			FROM ctl_gastos 
			INNER JOIN tipo_gasto
			ON ctl_gastos.id_tipo_gasto = tipo_gasto.id_tipo_gasto
			WHERE tipo_gasto.tpgst_act_descripcion='COSECHA'";

	$respuesta = array(
				'err' => true,
				'ctl_gastos' => Database::get_arreglo( $sql )
			);



echo json_encode( $respuesta );


?>