<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;


$year = $request['year'];
$id_user = $_SESSION["id_user"];
//print_r($request);



	$sql = "SELECT Date_format(pdc_fecha,'%m') AS mes, SUM(pdc_kilos + (pdc_rejas)*28) AS kilos
          FROM produccion INNER JOIN parcela
					ON produccion.id_parcela = parcela.id_parcela
          WHERE YEAR(pdc_fecha) = '". $year ."' AND parcela.id_productor = '". $id_user ."'
          GROUP BY 1";

	//print_r($sql);


	$respuesta = array(
				'err' => true,
				'repCosecha' => Database::get_arreglo($sql)
			);

	//print_r($sql);


echo json_encode( $respuesta );


?>
