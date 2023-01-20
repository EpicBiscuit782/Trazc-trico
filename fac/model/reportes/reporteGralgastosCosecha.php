<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;


$inicio = explode('T', $request['inicio']);
$fin = explode('T', $request['fin']);

$id_user = $_SESSION["id_user"];

	$sql = "SELECT ctl_gastos.ctl_descripcion, SUM(detalle_gasto.dt_precio) AS dt_precio
			FROM parcela INNER JOIN gastos
			ON parcela.id_parcela = gastos.id_parcela
			INNER JOIN detalle_gasto
			ON gastos.id_gasto = detalle_gasto.id_gasto
			INNER JOIN ctl_gastos
			ON detalle_gasto.id_ctl_gasto = ctl_gastos.id_ctl_gasto
			INNER JOIN tipo_gasto
			ON ctl_gastos.id_tipo_gasto = tipo_gasto.id_tipo_gasto
			WHERE parcela.id_productor = $id_user AND gastos.gst_fecha BETWEEN '". $inicio[0] ."' AND '".$fin[0] . "'
			GROUP BY 1";

	//print_r($sql);

	$respuesta = array(
				'err' => true,
				'reporte' => Database::get_arreglo($sql)
			);


echo json_encode( $respuesta );


?>
