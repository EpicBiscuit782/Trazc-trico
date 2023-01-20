<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");



$parametro = $_GET['id'];
$id_user = $_SESSION["id_user"];

if (is_numeric($parametro)) {

$sql = "SELECT compra.fecha, cantidad, medida, precio, cant_insumos, insumo.ingrediente_act, proveedor.empresa
        FROM compra INNER JOIN detalle_compra
        ON compra.id_compra = detalle_compra.id_compra
        INNER JOIN insumo ON detalle_compra.id_insumo = insumo.id_insumo
        INNER JOIN proveedor ON detalle_compra.id_proveedor = proveedor.id_proveedor
        WHERE compra.id_compra = '$parametro' AND compra.id_productor = '$id_user'";

		//print_r($sql);


	$respuesta = array(
				'err' => false,
				'detalle' => Database::get_arreglo( $sql )
			);
}
else {
  $respuesta = array(
				'err' => true
			);
}

	echo json_encode( $respuesta );

?>
