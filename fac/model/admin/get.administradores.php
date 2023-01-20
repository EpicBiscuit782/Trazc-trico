<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

if( isset( $_GET["pag"] ) ){
	$pag = $_GET["pag"];
}else{
	$pag = 1;
}


$respuesta = Database::getAdministradores( 'usuarios', $pag );


echo json_encode( $respuesta );


?>
