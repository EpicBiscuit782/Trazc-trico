<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$id_user = $_SESSION["id_user"];


if(isset($_SESSION["id_user"])){

	$sql = "SELECT count(*) as parcelas FROM parcela
	 				WHERE id_productor = '$id_user'";

	$respuesta = Database::get_valor_query( $sql, 'parcelas');

}

else {
	$respuesta = array(
				'err' => true
			);
}

echo $respuesta ;


?>
