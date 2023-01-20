<?php
include_once("../clases/class.Database.php");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;

if( isset( $request['id_huerto'] )  ){ 

	$sql = "DELETE FROM huerto
			WHERE id_huerto =" . $request['id_huerto'];

	$hecho = Database::ejecutar_idu( $sql );


	if( is_numeric($hecho) OR $hecho === true ){
		$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro eliminado' );
	}else{
		$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
	}

}

echo json_encode( $respuesta );

?>