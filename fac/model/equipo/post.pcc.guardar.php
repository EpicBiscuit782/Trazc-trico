<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;


if( isset( $request['id_pcc'] )  ){  // ACTUALIZAR


	$sql = "UPDATE pcc
            SET
				etapa    = '".$request['tpeta_act_descripcion']."',
				limite    = '". $request['limites'] ."',
				vigilancia    = '". $request['vigi'] ."',
				medidas    = '". $request['medi'] ."',
				registros    = '". $request['reg'] .",
				etiquetappc    = '". $request['eti'] ."'
			WHERE id_pcc='" . $request['id_pcc'];

	$hecho = Database::ejecutar_idu( $sql );


	if( is_numeric($hecho) OR $hecho === true ){
		$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro actualizado' );
	}else{
		$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
	}



}else{  // INSERT

	$sql = "INSERT INTO pcc(etapa, limite, vigilancia, medidas, registros, etiquetappc)
			VALUES ('". $request['tpeta_act_descripcion'] . "',
				'". $request['limites'] . "',
                '". $request['vigi'] . "',
                '". $request['medi'] . "',
                '". $request['reg'] . "',
                '". $request['eti'] . "')";
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

?>