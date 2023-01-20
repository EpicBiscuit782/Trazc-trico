<?php

// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");


$sql = "SELECT parcela.pcl_alias, sum(pdc_kilos) as kilos, sum(pdc_rejas) as rejas
		FROM produccion INNER JOIN parcela
		ON produccion.id_parcela = parcela.id_parcela
		INNER JOIN productor ON parcela.id_productor = productor.id_productor
		WHERE productor.id_productor =".$_SESSION['id_user'].
		" GROUP BY 1";

		//print_r($sql);


	$respuesta = array(
				'err' => true,
				'parcelas' => Database::get_arreglo( $sql )
			);

	echo json_encode( $respuesta );

?>
