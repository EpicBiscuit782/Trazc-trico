<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;

//print_r($request);


if( isset( $request['id_insumo'] )  ){  // ACTUALIZAR

	$sql = "UPDATE insumo
				SET
					nombre_com = '". strtoupper($request['nombre_com']) ."',
					ingrediente_act = '". strtoupper($request['ingrediente_act']) ."',
					num_registro = '". $request['num_registro'] ."',
					id_tipo_insumo = '". $request['id_tipo_insumo'] ."'

			WHERE id_insumo=" . $request['id_insumo'];

	$hecho = Database::ejecutar_idu( $sql );


	if( is_numeric($hecho) OR $hecho === true ){
		$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro actualizado' );
	}else{
		$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
	}



}else{  // INSERT

	$sql = "INSERT INTO insumo (nombre_com, ingrediente_act, num_registro, id_tipo_insumo)
			VALUES ('". strtoupper($request['nombre_com']) . "',
					'". strtoupper($request['ingrediente_act']) ."',
					'". $request['num_registro'] ."',
					'". $request['id_tipo_insumo'] . "')";

	$hecho = Database::ejecutar_idu( $sql );


	if( is_numeric($hecho) OR $hecho === true ){
		$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
	}else{
		$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
	}

}



echo json_encode( $respuesta );



?>
