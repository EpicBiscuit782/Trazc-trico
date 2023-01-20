<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;

//print_r($request);


if( isset( $request['id_noticia'] )  ){  // ACTUALIZAR

	$sql = "UPDATE noticia
				SET
					fecha    = '". $request['fecha'] ."',
					titulo    = '". $request['titulo'] ."',
					cuerpo = '". $request['cuerpo'] ."'

			WHERE id_noticia=" . $request['id_noticia'];

	$hecho = Database::ejecutar_idu( $sql );


	if( is_numeric($hecho) OR $hecho === true ){
		$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro actualizado' );
	}else{
		$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
	}



}else{  // INSERT

	$sql = "INSERT INTO noticia(titulo, cuerpo, fecha)
			VALUES ('". $request['titulo'] . "',
				'". $request['cuerpo'] . "',
				'". $request['fecha'] . "')";

	$hecho = Database::ejecutar_idu( $sql );


	if( is_numeric($hecho) OR $hecho === true ){
		$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
	}else{
		$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
	}

}



echo json_encode( $respuesta );



?>
