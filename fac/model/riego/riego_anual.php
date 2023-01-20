<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;


$year = $request['year'];

//print_r($request);
$id_user = $_SESSION["id_user"];

	$sql = "SELECT Date_format(riego.fecha,'%m') AS mes, SUM(riego.total) AS total
          FROM riego
          WHERE id_productor = $id_user AND  YEAR(riego.fecha) = '". $year ."'
          GROUP BY 1";

	//print_r($sql);


	$respuesta = array(
				'err' => true,
				'repRiego' => Database::get_arreglo($sql)
			);

	//print_r($sql);


echo json_encode( $respuesta );


?>
