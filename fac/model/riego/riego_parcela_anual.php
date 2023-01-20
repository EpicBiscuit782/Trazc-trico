<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;


$id = $request['id_parcela'];
$year = $request['year'];

//print_r($request);
$id_user = $_SESSION["id_user"];


	$sql = "SELECT Date_format(riego.fecha,'%m') AS mes, SUM(detalle_riego.cantidad) AS total
          FROM riego INNER JOIN detalle_riego
          ON riego.id_riego = detalle_riego.id_riego
          INNER JOIN parcela
          ON parcela.id_parcela = detalle_riego.id_parcela
          WHERE riego.id_productor = $id_user AND YEAR(riego.fecha) = '". $year ."' and parcela.id_parcela= '". $id ."'
          GROUP BY 1";

	//print_r($sql);


	$respuesta = array(
				'err' => true,
				'repRiego' => Database::get_arreglo($sql)
			);

	//print_r($sql);


echo json_encode( $respuesta );


?>
