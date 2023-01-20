<?php
//session_start();
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");


//$id_user = $_SESSION['id_user'];


	$sql = "SELECT id_productor, pdt_nombre_completo, pdt_curp, pdt_rfc, pdt_domicilio_completo, pdt_telefono, pdt_email, pdt_activo
					FROM productor";

	$respuesta = array(
				'err' => true,
				'productores' => Database::get_arreglo( $sql )
			);

echo json_encode( $respuesta );


?>
