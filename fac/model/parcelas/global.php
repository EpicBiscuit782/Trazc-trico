<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");


$parametro = $_GET['id'];


if(is_numeric($parametro)){

	$sql = "SELECT id_parcela FROM parcela where id_parcela = $parametro";
	$_SESSION['parcela'] = Database::get_row( $sql );

	//print_r($sql);
}

?>
