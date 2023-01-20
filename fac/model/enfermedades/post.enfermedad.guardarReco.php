<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;



	$sql = "INSERT INTO detalle_enfermedad(dosis,intervalo,id_insumo,id_enfermedad) VALUES 
				('". $request['dosis'] . "',
				 '". $request['intervalo'] . "',
				 '". $request['id_insumo'] . "',
				 '". $request['id_enfermedad'] . "')";

	$hecho = Database::ejecutar_idu( $sql );

	
	if( is_numeric($hecho) OR $hecho === true ){
		$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
	}else{
		$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
	}

echo json_encode( $respuesta );

?>