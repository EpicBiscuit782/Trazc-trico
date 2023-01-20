<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");


$parametro = $_GET['p'];


if(is_numeric($parametro)){

	$sql = "SELECT * FROM clientes where id = $parametro";
	
	$respuesta = array(
				'err' => false,
				'clientes' => Database::get_arreglo( $sql )
			);

}else{

	$respuesta = Database::get_por_nombre( 'clientes', 'nombre', $parametro );

}

echo json_encode( $respuesta );


?>