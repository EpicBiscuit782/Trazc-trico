<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;


if( isset( $request['id_tipo_gasto'] )  ){  // ACTUALIZAR

	$sql = "UPDATE tipo_gasto 
				SET
					tpgst_act_descripcion  = '". strtoupper($request['tpgst_act_descripcion']) ."'
					 
			WHERE id_tipo_gasto =" . $request['id_tipo_gasto'];

	$hecho = Database::ejecutar_idu( $sql );

	
	if( is_numeric($hecho) OR $hecho === true ){
		$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro actualizado' );
	}else{
		$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
	}



}else{  // INSERT

	$sql = "INSERT INTO tipo_gasto(tpgst_act_descripcion ) VALUES 
				('". strtoupper($request['tpgst_act_descripcion']) . "')";

	$hecho = Database::ejecutar_idu( $sql );

	
	if( is_numeric($hecho) OR $hecho === true ){
		$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
	}else{
		$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
	}

}



echo json_encode( $respuesta );



?>