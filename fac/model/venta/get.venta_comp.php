<?php
session_start();
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");


$sql = "SELECT SUM(venta.vt_subtotal) as total, comprador.cmp_nombre
				FROM venta INNER JOIN comprador
				ON venta.id_comprador = comprador.id_comprador
        INNER JOIN parcela ON venta.id_parcela = parcela.id_parcela
				WHERE parcela.id_productor =". $_SESSION['id_user'].
				" GROUP BY 2";


	$respuesta = array(
				'err' => true,
				'venta' => Database::get_arreglo( $sql )
			);

	echo json_encode( $respuesta );

?>
