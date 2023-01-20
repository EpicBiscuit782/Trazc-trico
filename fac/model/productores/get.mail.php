<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");


$email = $_GET['email'];


$sql2 = "SELECT count(*) as existe FROM productor where pdt_email = '$email'";
$existe = Database::get_valor_query( $sql2, 'existe' );

	//$sql = "SELECT pdt_email FROM productor where pdt_email  = '$parametro'";
	//print_r(Database::get_row( $sql ));
  if($existe == 1)
  {
	$respuesta = array(
				'existe' => false
			);
  }
  else{
    $respuesta = array(
  				'existe' => true
  			);
  }





echo json_encode( $respuesta );


?>
