<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$id_user = $_SESSION['id_user'];

	$sql = "SELECT SUM(dt_precio) AS costo, ctl_gastos.ctl_descripcion
		   		FROM gastos 
                INNER JOIN detalle_gasto ON gastos.id_gasto = detalle_gasto.id_gasto
	    		INNER JOIN ctl_gastos ON detalle_gasto.id_ctl_gasto = ctl_gastos.id_ctl_gasto
	    		INNER JOIN parcela ON gastos.id_parcela = parcela.id_parcela
	    		WHERE parcela.id_productor = ".$_SESSION['id_user']. "
	    		GROUP BY 2";

		//print_r($sql);
		$sql3 = "SELECT SUM(costo) AS costo
						 FROM riego INNER JOIN detalle_riego
						 ON riego.id_riego = detalle_riego.id_riego
						 WHERE riego.id_productor = '". $id_user . "' ";

		$sql4 = "SELECT SUM(subtotal) AS subtotal FROM compra WHERE id_productor = $id_user";

	$respuesta = array(
				'err' => true,
				'gastos' => Database::get_arreglo( $sql ),
				'repRiego' => Database::get_row($sql3),
				'repCompra' => Database::get_row($sql4)
			);

	echo json_encode( $respuesta );

?>
