<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");



	$sql = "SELECT * FROM tipo_etapa" ;

	$respuesta = array(
				'err' => true,
				'tipo_etapas' => Database::get_arreglo( $sql )
			);




echo json_encode( $respuesta );


?>