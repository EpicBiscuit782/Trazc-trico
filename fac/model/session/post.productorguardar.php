<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;


if( isset( $request['id_productor'] )  ){  // ACTUALIZAR

	$sql = "UPDATE productor
				SET
					pdt_nombre_completo    = '". $request['pdt_nombre_completo'] ."',
					pdt_domicilio_completo    = '". $request['pdt_domicilio_completo'] ."',
					pdt_telefono = '". $request['pdt_telefono'] ."',
					pdt_email   = '". $request['pdt_email'] ."',
					pdt_activo      = '". $request['pdt_activo'] ."'

			WHERE id_productor =" . $request['id_productor'];

	$hecho = Database::ejecutar_idu( $sql );


	if( is_numeric($hecho) OR $hecho === true ){
		$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro actualizado' );
	}else{
		$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
	}



}else{  // INSERT

	$sql = "INSERT INTO productor(pdt_nombre_completo, pdt_domicilio_completo, pdt_telefono, pdt_email, pdt_password, pdt_activo) VALUES
				('". $request['pdt_nombre_completo'] . "',
				'". $request['pdt_domicilio_completo'] . "',
				'". $request['pdt_telefono'] . "',
				'". $request['pdt_email'] . "',
				'". password_hash($request['pdt_password'],PASSWORD_BCRYPT) . "',
				'". $request['pdt_activo'] . "')";

	$hecho = Database::ejecutar_idu( $sql );


	if( is_numeric($hecho) OR $hecho === true ){
		$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
	}else{
		$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
	}

}



echo json_encode( $respuesta );



?>
