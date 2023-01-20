<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;


if( isset( $request['id_enfermedad'] )  ){  // ACTUALIZAR

	$sql = "UPDATE enfermedad 
				SET
				enfermedad  = '". strtoupper($request['enfermedad']) ."',
				descripcion  = '". strtoupper($request['descripcion']) ."',
				agente  = '". strtoupper($request['agente']) ."',
				sintomas  = '". strtoupper($request['sintomas']) ."',
				manejo  = '". strtoupper($request['manejo']) ."',
				id_tipo_enfermedad  = '". $request['id_tipo_enfermedad'] ."'
					 
			WHERE id_enfermedad =" . $request['id_enfermedad'];

	$hecho = Database::ejecutar_idu( $sql );

	
	if( is_numeric($hecho) OR $hecho === true ){
		$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro actualizado' );
	}else{
		$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
	}



}else{  // INSERT

	print_r($request);

	$sql = "INSERT INTO enfermedad(enfermedad,descripcion,agente,sintomas,manejo,id_tipo_enfermedad) VALUES 
				('". strtoupper($request['enfermedad']) . "',
				 '". strtoupper($request['descripcion']) . "',
				 '". strtoupper($request['agente']) . "',
				 '". strtoupper($request['sintomas']) . "',
				 '". strtoupper($request['manejo']) . "',
				 '". $request['id_tipo_enfermedad'] . "')";

	$hecho = Database::ejecutar_idu( $sql );

	
	if( is_numeric($hecho) OR $hecho === true ){
		$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
	}else{
		$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
	}

}



echo json_encode( $respuesta );



?>