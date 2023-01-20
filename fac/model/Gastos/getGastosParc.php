<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;


$id = $request['id_parcela'];
$year = $request['year'];

//print_r($request);


	$sql = "SELECT Date_format(gastos.gst_fecha,'%m') AS mes, SUM(dt_precio) AS total
	        FROM gastos INNER JOIN detalle_gasto
          ON gastos.id_gasto = detalle_gasto.id_gasto
          INNER JOIN parcela ON gastos.id_parcela = parcela.id_parcela
          WHERE YEAR(gastos.gst_fecha) = '". $year ."' AND parcela.id_parcela= '". $id ."'AND parcela.id_productor = '".$_SESSION['id_user']."'
          GROUP BY 1";

	$sql3 = "SELECT Date_format(fecha,'%m') AS mes, SUM(costo) AS costo
					 FROM riego INNER JOIN detalle_riego
					 ON riego.id_riego = detalle_riego.id_riego
					 INNER JOIN parcela
           ON detalle_riego.id_parcela = parcela.id_parcela
					 WHERE riego.id_productor = '". $_SESSION['id_user'] . "' AND parcela.id_parcela = '$id' AND YEAR(fecha) = '$year'
					 GROUP BY 1";

	//print_r($sql);


	$respuesta = array(
				'err' => true,
				'repGastos' => Database::get_arreglo($sql),
				'repRiego' => Database::get_arreglo($sql3)
			);

	//print_r($sql);


echo json_encode( $respuesta );


?>
