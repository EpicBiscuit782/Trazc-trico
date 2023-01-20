<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;


if( isset( $request['id_portainjerto'] )  ){  // ACTUALIZAR

	$sql = "UPDATE portainjerto
				SET
					nom_portainjerto  = '". strtoupper($request['nom_portainjerto']) ."'

			WHERE id_portainjerto =" . $request['id_portainjerto'];

	$hecho = Database::ejecutar_idu( $sql );


	if( is_numeric($hecho) OR $hecho === true ){
		$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro actualizado' );
	}else{
		$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
	}



}else{  // INSERT

	$sql = "INSERT INTO portainjerto(nom_portainjerto) VALUES
				('". strtoupper($request['nom_portainjerto']) . "')";

	$hecho = Database::ejecutar_idu( $sql );


	if( is_numeric($hecho) OR $hecho === true ){
		$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
	}else{
		$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
	}

}



echo json_encode( $respuesta );



?>
