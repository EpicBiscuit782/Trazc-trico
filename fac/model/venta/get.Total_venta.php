<?php
session_start();
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");


$sql = "SELECT SUM(venta.vt_subtotal) as total
		FROM venta INNER JOIN parcela ON venta.id_parcela = parcela.id_parcela
		WHERE parcela.id_productor =". $_SESSION['id_user'];


	$respuesta = array(
				'err' => true,
				'total' => Database::get_row( $sql )
			);

	echo json_encode( $respuesta );

?>





