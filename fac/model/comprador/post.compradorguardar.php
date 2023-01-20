<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;

$id_user = $_SESSION["id_user"];

$db = DataBase::getInstancia();
$mysqli = $db->getConnection();

if( isset( $request['id_comprador'] )  ){  // ACTUALIZAR

	try {

		$mysqli->begin_transaction();
		
			$sql = "UPDATE comprador
						SET
							cmp_nombre  = '". strtoupper($request['cmp_nombre']) ."',
							rep_legal  = '". strtoupper($request['rep_legal']) ."',
							localizacion  = '". $request['localizacion'] ."',
							telefono  = '". $request['telefono'] ."',
							correo  = '". $request['correo'] ."',
							marcas  = '". $request['marcas'] ."',
							mercado_destino  = '". $request['mercado_destino'] ."',
				            puntos_distribucion  = '". $request['puntos_distribucion'] ."'
		
					WHERE id_comprador =" . $request['id_comprador'];
		
			$hecho = Database::ejecutar_idu( $sql );
		
		
			if( is_numeric($hecho) OR $hecho === true ){
				$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro actualizado' );
				$mysqli->commit();
			}else{
				$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
				$mysqli->rollback();
			}
	} catch (Exception $e) {
		$respuesta = array( 'err'=>true );
		$mysqli->rollback();
	}



}else{  // INSERT
	
	if ($id_user !="" || $id_user != 0) {
	
		try {

		$mysqli->begin_transaction();

			$sql = "INSERT INTO comprador(cmp_nombre, rep_legal, localizacion, telefono, correo, marcas, mercado_destino, puntos_distribucion, id_productor) VALUES
						('". strtoupper($request['cmp_nombre']) . "',
                        '". strtoupper($request['rep_legal']) ."',
                        '". $request['localizacion'] ."',
                        '". $request['telefono'] ."',
                        '". $request['correo'] ."',
                        '". $request['marcas'] ."',
                        '". $request['mercado_destino'] ."',
                        '". $request['puntos_distribucion'] ."',
				        $id_user
						)";
		
			$hecho = Database::ejecutar_idu( $sql );
		
		
			if( is_numeric($hecho) OR $hecho === true ){
				$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
				$mysqli->commit();
			}else{
				$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
				$mysqli->rollback();
			}
			
		} catch (Exception $e) {
			$respuesta = array( 'err'=>true );
			$mysqli->rollback();
		}
				
			
	}else {
		$respuesta = array( 'err'=>true );
	}


}



echo json_encode( $respuesta );



?>