<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;


$year = $request['year'];

//print_r($request);


	$sql = "SELECT SUM(pdc_kilos + (pdc_rejas)*28 ) AS kilos, parcela.pcl_municipio
	        FROM produccion	INNER JOIN parcela
          ON produccion.id_parcela = parcela.id_parcela
					WHERE YEAR(produccion.pdc_fecha) = '$year'
          GROUP BY 2";


	$respuesta = array(
				'err' => true,
				'repCosecha' => Database::get_arreglo($sql)
			);

	//print_r($sql);


echo json_encode( $respuesta );


?>
