<?php
//session_start();
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");


$id_user = $_SESSION['id_user'];


	$sql = "SELECT * FROM compra 
            INNER JOIN detalle_compra ON compra.id_compra = detalle_compra.id_compra
            INNER JOIN insumo ON detalle_compra.id_insumo = insumo.id_insumo 
            INNER JOIN tipo_insumo ON insumo.id_tipo_insumo = tipo_insumo.id_tipo_insumo 
            WHERE id_productor = $id_user";

	$respuesta = array(
				'err' => true,
				'insumos' => Database::get_arreglo( $sql )
			);

echo json_encode( $respuesta );


?>
