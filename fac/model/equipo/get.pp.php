<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");


$parametro = $_GET['id'];

if(is_numeric($parametro)){

	$sql = "SELECT nombre_pp, descriopcion_pp 
	FROM pp WHERE id_pp = $parametro";


	$respuesta = array(
				'peligro' => Database::get_row( $sql )
			);


}else{

	$respuesta = array('err' => true );

}
echo json_encode( $respuesta );

?>
