<?php
include_once("../clases/class.Database.php");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;

$db = Database::getInstancia();
$mysqli = $db->getConnection();

if( isset( $request['id_tipo_etapa'] )  ){  // ACTUALIZAR

	$sql = "UPDATE tipo_etapa 
				SET
					tpeta_act_descripcion  = '". strtoupper($request['tpeta_act_descripcion']) ."'
					 
			WHERE id_tipo_etapa =" . $request['id_tipo_etapa'];

	$hecho = Database::ejecutar_idu( $sql );

	
	if( is_numeric($hecho) OR $hecho === true ){
		$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro actualizado' );
	}else{
		$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
	}



}else{  // INSERT

	$sql = "INSERT INTO tipo_etapa(tpeta_act_descripcion ) VALUES 
				('". strtoupper($request['tpeta_act_descripcion']) . "')";

	$hecho = Database::ejecutar_idu( $sql );

	
	if( is_numeric($hecho) OR $hecho === true ){
		$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
	}else{
		$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
	}

}

echo json_encode($respuesta);

?>