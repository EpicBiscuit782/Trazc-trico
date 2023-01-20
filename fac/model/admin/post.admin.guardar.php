<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;


if( isset( $request['id_usuario'] )  ){  // ACTUALIZAR


	$sql = "UPDATE usuarios
				SET
					usr_nombre_completo    = '". strtoupper($request['usr_nombre_completo']) ."',
					usr_email    = '". $request['usr_email'] ."'
			WHERE id_usuario=" . $request['id_usuario'];

	$hecho = Database::ejecutar_idu( $sql );


	if( is_numeric($hecho) OR $hecho === true ){
		$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro actualizado' );
	}else{
		$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
	}



}else{  // INSERT

	$pass = $request['usr_password'];

	$sql = "INSERT INTO usuarios(usr_nombre_completo, usr_email, usr_password)
			VALUES ('". strtoupper($request['usr_nombre_completo']) . "',
				'". $request['usr_email'] . "',
				AES_ENCRYPT('$pass','GEOVA ES MI PASTOR 23') )";

	print_r($sql);

	$hecho = Database::ejecutar_idu( $sql );


	if( is_numeric($hecho) OR $hecho === true ){
		$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
	}else{
		$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
	}

}



echo json_encode( $respuesta );



?>