<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;


if( isset( $request['id_ctl_gasto'] )  ){  // ACTUALIZAR

	$sql = "UPDATE ctl_gastos
				SET
					ctl_descripcion  = '". strtoupper($request['ctl_descripcion']) ."',
					id_tipo_gasto  = '". $request['id_tipo_gasto'] ."'

			WHERE id_ctl_gasto =" . $request['id_ctl_gasto'];

	$hecho = Database::ejecutar_idu( $sql );


	if( is_numeric($hecho) OR $hecho === true ){
		$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro actualizado' );
	}else{
		$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
	}

}else{  // INSERT

	$sql = "INSERT INTO ctl_gastos(ctl_descripcion,id_tipo_gasto) VALUES
				('". strtoupper($request['ctl_descripcion']) . "',
				'". $request['id_tipo_gasto'] . "')";

	$hecho = Database::ejecutar_idu( $sql );


	if( is_numeric($hecho) OR $hecho === true ){
		$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
	}else{
		$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
	}

}

echo json_encode( $respuesta );



?>
