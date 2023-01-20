<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");



$parametro = $_GET['id'];
$id_user = $_SESSION["id_user"];

if (is_numeric($parametro)) {

$sql = "SELECT detalle_nutricion.id_det_nutricion, detalle_nutricion.id_insumo, cantidad, medida, metodo, cant_planta, insumo.ingrediente_act
        FROM nutricion INNER JOIN detalle_nutricion
        ON nutricion.id_nutricion = detalle_nutricion.id_nutricion
        INNER JOIN insumo
        ON detalle_nutricion.id_insumo = insumo.id_insumo
        INNER JOIN parcela ON nutricion.id_parcela = parcela.id_parcela
        WHERE nutricion.id_nutricion = '$parametro' AND parcela.id_productor = '$id_user'";



	$respuesta = array(
				'err' => false,
				'det' => Database::get_arreglo( $sql )
			);
}
else {
  $respuesta = array(
				'err' => true
			);
}

	echo json_encode( $respuesta );

?>
