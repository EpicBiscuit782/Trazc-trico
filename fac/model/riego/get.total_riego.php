<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");


$sql = "SELECT SUM(total) AS total FROM riego
		WHERE id_productor =". $_SESSION['id_user'];


	$respuesta = array(
				'err' => true,
				'total' => Database::get_row( $sql )
			);

	echo json_encode( $respuesta );

?>
