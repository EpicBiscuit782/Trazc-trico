<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;



//print_r($request);

if( isset( $request['id_huerto'] )  ){  // ACTUALIZAR

	$sql = "UPDATE huerto
				SET
					tipo_riego  = '". $request['tipo_riego'] ."',
					id_variedad  = '". $request['id_variedad'] ."',
					id_portainjerto  = '". $request['id_portainjerto'] ."',
					id_responsable  = '". $request['id_responsable'] ."',
					id_origen  = '". $request['id_origen'] ."',
					cultivo  = '". $request['cultivo'] ."'
			WHERE id_huerto =" . $request['id_huerto'];

	$hecho = Database::ejecutar_idu( $sql );


	if( is_numeric($hecho) OR $hecho === true ){
		$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro actualizado' );
	}else{
		$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
	}



}else{  // INSERT

	$sql = "INSERT INTO huerto (fecha,id_parcela,tipo_riego,id_variedad,id_portainjerto,id_responsable,id_origen,cultivo) VALUES
				('". $request['fecha'] . "',
				 '". $request['id_parcela'] . "',
				 '". $request['tipo_riego'] . "',
				 '". $request['id_variedad'] . "',
				 '". $request['id_portainjerto'] . "',
				 '". $request['id_responsable'] . "',
				 '". $request['id_origen'] . "',
				'". $request['cultivo'] . "')";

	$hecho = Database::ejecutar_idu( $sql );


	if( is_numeric($hecho) OR $hecho === true ){
		$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
	}else{
		$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
	}


}


echo json_encode( $respuesta );

?>
