<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");



$parametro = $_GET['id'];


if(is_numeric($parametro)){

	$sql = "SELECT * FROM portainjerto where id_portainjerto = '$parametro'";

	$respuesta = array(
				'err' => false,
				'portainjerto' => Database::get_row( $sql )
			);


}
else{
	$respuesta = array(
				'err' => true
			);
}

echo json_encode( $respuesta );


?>
