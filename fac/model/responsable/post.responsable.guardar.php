<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;

//print_r($request);


if( isset( $request['id_responsable'] )  ){  // ACTUALIZAR

	$sql = "UPDATE responsable
				SET
					nombre    = '". strtoupper($request['nombre']) ."',
					direccion    = '". strtoupper($request['direccion']) ."',
					telefono = '". $request['telefono'] ."',
					correo = '". $request['correo'] ."' ,
					puesto = '". strtoupper($request['puesto']) ."'
			WHERE id_responsable =" . $request['id_responsable'];

	$hecho = Database::ejecutar_idu( $sql );


	if( is_numeric($hecho) OR $hecho === true ){
		$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro actualizado' );
	}else{
		$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
	}



}else{  // INSERT
	$parametro = $_SESSION['id_user'];
	
	if ($parametro !="" || $parametro != 0) {

	$sql = "INSERT INTO responsable (nombre, direccion, telefono, correo, puesto, id_productor)
			VALUES ('". strtoupper($request['nombre']) . "',
				'". strtoupper($request['direccion']) . "',
				'". $request['telefono'] . "',
				'". $request['correo'] . "',
				'". strtoupper($request['puesto']) . "',
				'". $parametro . "')";

	$hecho = Database::ejecutar_idu( $sql );


	if( is_numeric($hecho) OR $hecho === true ){
		$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
	}else{
		$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
	}
	
	}else {
		$respuesta = array( 'err'=>true );
	}

}



echo json_encode( $respuesta );



?>