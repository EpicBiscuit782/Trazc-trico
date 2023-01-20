<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");


$parametro = $_GET['id'];


if(is_numeric($parametro)){

	$sql = "SELECT * FROM terreno where id_terreno = $parametro";

	$respuesta = array(
				'err' => true,
				'terreno' => Database::get_arreglo( $sql )
			);


}else{

	$respuesta = Database::get_por_nombre( 'comprador', 'cmp_nombre', $parametro );

}

echo json_encode( $respuesta );


?>