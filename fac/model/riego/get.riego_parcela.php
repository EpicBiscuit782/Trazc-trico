<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");


$sql = "SELECT parcela.pcl_alias, SUM(detalle_riego.cantidad) AS cantidad
		FROM riego INNER JOIN detalle_riego ON riego.id_riego = detalle_riego.id_riego
		INNER JOIN parcela ON detalle_riego.id_parcela = parcela.id_parcela
		WHERE parcela.id_productor ='". $_SESSION['id_user'] . "'
		GROUP BY 1;";


	$respuesta = array(
				'err' => true,
				'riego' => Database::get_arreglo( $sql )
			);

	echo json_encode( $respuesta );

?>
