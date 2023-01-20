<?php

// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;


if( isset( $request['id_pp'] )  ){  // ACTUALIZAR


	$sql = "UPDATE pp
            SET
				nombre_pp    = '".$request['nombre_pp']."',
				descripcion_pp    = '". $request['descripcion_pp'] ."'
			WHERE id_pp='" . $request['id_pp'];

	$hecho = Database::ejecutar_idu( $sql );


	if( is_numeric($hecho) OR $hecho === true ){
		$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro actualizado' );
	}else{
		$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
	}



}else{  // INSERT

	$sql = "INSERT INTO pp( nombre_pp, descripcion_pp)
			VALUES ('". $request['nombre_pp'] . "',
				'". $request['descripcion_pp'] . "')";
				;

	print_r($sql);

	$hecho = Database::ejecutar_idu( $sql );


	if( is_numeric($hecho) OR $hecho === true ){
		$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
	}else{
		$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
	}

}

echo json_encode( $respuesta );

/*/ Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;

$db = Database::getInstancia();
$mysqli = $db->getConnection();

if( isset( $request['id_pp'] )  ){  // ACTUALIZAR


	$sql = "UPDATE pp
            SET
				nombre_pp    = '". strtoupper($request['nombre_pp']) ."',
				descripcion_pp    = '". $request['descripcion_pp'] ."'
			WHERE id_pp='" . $request['id_pp'];

	$hecho = Database::ejecutar_idu( $sql );


	if( is_numeric($hecho) OR $hecho === true ){
		$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro actualizado' );
	}else{
		$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
	}



}else{  // INSERT


	$sql = "INSERT INTO pp(nombre_pp, descripcion_pp)
			VALUES ('". strtoupper($request['nombre_pp']) . "',
				    '". $request['descripcion_pp'] . "')";

	print_r($sql);

	$hecho = Database::ejecutar_idu( $sql );


	if( is_numeric($hecho) OR $hecho === true ){
		$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
	}else{
		$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
	}

}

echo json_encode( $respuesta );*/

?>