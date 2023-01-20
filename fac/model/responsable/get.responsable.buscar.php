<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");


$parametro = $_GET['id'];
$id_user = $_SESSION["id_user"];


if(is_numeric($parametro)){

	$sql = "SELECT * FROM responsable where id_responsable = '$parametro' AND id_productor = '$id_user'";

	$respuesta = array(
				'err' => false,
				'responsable' => Database::get_row( $sql )
			);


}
else {
	$respuesta = array(
				'err' => true
			);
}

echo json_encode( $respuesta );


?>
