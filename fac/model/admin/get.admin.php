<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");


$parametro = $_GET['id'];
//$id_user = $_SESSION["id_user"];

if(is_numeric($parametro)){

	$sql = "SELECT usr_nombre_completo, usr_email FROM usuarios WHERE id_usuario = $parametro";


	$respuesta = array(
				'administrador' => Database::get_row( $sql )
			);


}else{

	$respuesta = array('err' => true );

}
//print_r($respuesta);
echo json_encode( $respuesta );


?>
