<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");



$parametro = $_GET['id'];
$id_user = $_SESSION["id_user"];

if(is_numeric($parametro)){

$sql = "SELECT id_gasto, gst_fecha, gst_subtotal, parcela.pcl_alias
		FROM gastos 
        INNER JOIN parcela ON gastos.id_parcela = parcela.id_parcela
		WHERE id_gasto = '$parametro' AND parcela.id_productor = '$id_user'";

	$respuesta = array(
				'err' => false,
				'gastos' => Database::get_row( $sql )
			);

}
else {
	$respuesta = array(
				'err' => true
			);
}

	echo json_encode( $respuesta );

?>
