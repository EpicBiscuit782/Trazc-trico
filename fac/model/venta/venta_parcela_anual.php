<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;


$id = $request['id_parcela'];
$year = $request['year'];

//print_r($request);


	$sql = "SELECT Date_format(venta.vt_fecha,'%m') AS mes, SUM(vt_subtotal) AS total
          FROM parcela INNER JOIN venta
          ON parcela.id_parcela = venta.id_parcela
          WHERE YEAR(vt_fecha) = '". $year ."' and parcela.id_parcela= '". $id ."'
          GROUP BY 1";

	//print_r($sql);


	$respuesta = array(
				'err' => true,
				'repVenta' => Database::get_arreglo($sql)
			);

	//print_r($sql);


echo json_encode( $respuesta );


?>
