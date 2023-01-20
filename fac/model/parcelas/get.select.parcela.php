<?php
	session_start();
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");


$respuesta = Database::get_parcelas( 'parcela' );


echo json_encode( $respuesta );


?>