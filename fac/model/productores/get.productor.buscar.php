<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");


$parametro = $_GET['id'];


if(is_numeric($parametro)){

	$sql = "SELECT id_productor, pdt_nombre_completo, pdt_curp, pdt_rfc, pdt_domicilio_completo, pdt_telefono, pdt_email, pdt_activo
	 				FROM productor where id_productor = '$parametro'";
	//print_r(Database::get_row( $sql ));

	$respuesta = array(
				'err' => false,
				'productor' => Database::get_row( $sql )
			);


}
else {
	$respuesta = array(
				'err' => true
			);
}

echo json_encode( $respuesta );


?>
