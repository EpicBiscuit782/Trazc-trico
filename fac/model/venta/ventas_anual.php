<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;


$year = $request['year'];

$id_user = $_SESSION["id_user"];


	$sql = "SELECT Date_format(venta.vt_fecha,'%m') AS mes, SUM(vt_subtotal) AS total
          FROM venta INNER JOIN parcela
					ON venta.id_parcela = parcela.id_parcela
					WHERE parcela.id_productor = $id_user AND YEAR(vt_fecha) = '". $year. "'
          GROUP BY 1";

	//print_r($sql);


	$respuesta = array(
				'err' => true,
				'repVenta' => Database::get_arreglo($sql)
			);

	//print_r($sql);


echo json_encode( $respuesta );


?>
