<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

if( isset( $_GET["pag"] ) ){
	$pag = $_GET["pag"];
}else{
	$pag = 1;
}


$respuesta = Database::get_todo_paginado( 'tipo_insumo', $pag );


echo json_encode( $respuesta );


?>