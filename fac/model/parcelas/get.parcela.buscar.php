<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");


$parametro = $_GET['id'];
$id_user = $_SESSION["id_user"];


if(is_numeric($parametro)){

	$sql = "SELECT parcela.*, propiedad.nombre FROM parcela
					INNER JOIN propiedad ON parcela.id_regimen = propiedad.id_regimen
	 				WHERE id_parcela = '$parametro' AND id_productor = '$id_user'";

	$respuesta = array(
				'err' => false,
				'parcela' => Database::get_row( $sql )
			);

}
else {
	$respuesta = array(
				'err' => true
			);
}

echo json_encode( $respuesta );


?>
