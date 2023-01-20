<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");



$parametro = $_GET['id'];
$id_user = $_SESSION["id_user"];



if(is_numeric($parametro)){

	$sql = "SELECT analisis_agua.*, parcela.pcl_alias FROM analisis_agua
					INNER JOIN parcela ON analisis_agua.id_parcela = parcela.id_parcela
			    WHERE id_analisis_agua = '$parametro' AND id_productor = '$id_user'";

	$respuesta = array(
				'err' => false,
				'analisis_agua' => Database::get_row( $sql )
			);
}
else{
	$respuesta = array(
				'err' => true,
			);
}

//print_r($sql);
echo json_encode( $respuesta );


?>
