<?php
    
include_once("../clases/class.Database.php");

	$sql = "SELECT * FROM imagenes";
	$respuesta =  Database::get_arreglo( $sql );

 
	echo json_encode($respuesta);

?>