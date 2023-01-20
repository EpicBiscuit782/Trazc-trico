<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;


$year = $request['year'];
//print_r($request);

$id_user = $_SESSION["id_user"];


	$sql = "SELECT Date_format(gastos.gst_fecha,'%m') AS mes, ctl_gastos.ctl_descripcion, detalle_gasto.dt_precio
			FROM parcela INNER JOIN gastos
			ON parcela.id_parcela = gastos.id_parcela
			INNER JOIN detalle_gasto
			ON gastos.id_gasto = detalle_gasto.id_gasto
			INNER JOIN ctl_gastos
			ON detalle_gasto.id_ctl_gasto = ctl_gastos.id_ctl_gasto
			INNER JOIN tipo_gasto
			ON ctl_gastos.id_tipo_gasto = tipo_gasto.id_tipo_gasto
			WHERE Date_format(gastos.gst_fecha,'%Y') = '". $year ."' AND parcela.id_productor = '" .$id_user."' AND tipo_gasto.tpgst_act_descripcion = 'COSECHA' ";

	//print_r($sql);

	$respuesta = array(
				'err' => true,
				'reporte' => Database::get_arreglo($sql)
			);

	//print_r($sql);


echo json_encode( $respuesta );


?>
