<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");



$parametro = $_GET['id'];
$id_user = $_SESSION["id_user"];


if(is_numeric($parametro)){

	$sql = "SELECT analisis_foliar.*, parcela.pcl_alias FROM analisis_foliar
					INNER JOIN parcela ON analisis_foliar.id_parcela = parcela.id_parcela
					WHERE id_analisis_foliar = '$parametro' AND parcela.id_productor = '$id_user' ";

	$respuesta = array(
				'err' => false,
				'analisis_foliar' => Database::get_row( $sql )
			);

}
else {
	$respuesta = array(
				'err' => true
			);
}

echo json_encode( $respuesta );


?>
