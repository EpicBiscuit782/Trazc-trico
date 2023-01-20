<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");


$parametro = $_GET['id'];
$id_user = $_SESSION["id_user"];

if(is_numeric($parametro)){

	$sql = "SELECT * FROM proveedor where id_proveedor = $parametro AND id_productor = $id_user";

	$respuesta = array(
				'err' => false,
				'proveedor' => Database::get_arreglo( $sql )
			);


}else{

	$respuesta = array('err' => true );

}

echo json_encode( $respuesta );


?>
