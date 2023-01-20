<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$id_user = $_SESSION["id_user"];


$sql = "SELECT *
        FROM compra 
        INNER JOIN detalle_compra ON compra.id_compra = detalle_compra.id_compra
        INNER JOIN insumo ON detalle_compra.id_insumo = insumo.id_insumo
        INNER JOIN proveedor ON detalle_compra.id_proveedor = proveedor.id_proveedor
        INNER JOIN responsable ON detalle_compra.id_responsable = responsable.id_responsable         
        WHERE compra.id_productor = '$id_user'";


	$respuesta = array(
				'err' => false,
				'detalle' => Database::get_arreglo( $sql )
			);

	echo json_encode( $respuesta );

?>
