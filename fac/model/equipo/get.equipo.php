<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");


$parametro = $_GET['id'];

if(is_numeric($parametro)){

	$sql = "SELECT usr_nombre_completo, usr_email, responsabilidades 
	FROM usuarios WHERE id_usuario = $parametro";


	$respuesta = array(
				'miembro' => Database::get_row( $sql )
			);


}else{

	$respuesta = array('err' => true );

}
echo json_encode( $respuesta );

?>
