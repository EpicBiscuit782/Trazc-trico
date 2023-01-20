<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");


$sql = "SELECT * FROM parcela where id_productor =". $_SESSION['id_user'];


	$respuesta = array(
				'err' => true,
				'parcelas' => Database::get_arreglo( $sql )
			);

	echo json_encode( $respuesta );

?>
