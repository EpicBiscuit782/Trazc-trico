<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;

$id_gasto    = $request[0];

$db = DataBase::getInstancia();
$mysqli = $db->getConnection();


	if ($id_gasto  !="" || $id_gasto  != 0) {
	
		try {

		    $mysqli->begin_transaction();

		    $sql = "DELETE FROM detalle_gasto WHERE id_detalle_gasto = $id_gasto ";
            
            $hecho = Database::ejecutar_idu( $sql );
		
		
			if( is_numeric($hecho) OR $hecho === true ){
				$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro eliminado' );
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


echo json_encode( $respuesta );

?>