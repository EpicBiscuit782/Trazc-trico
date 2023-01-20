<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;


$db = DataBase::getInstancia();
$mysqli = $db->getConnection();


	if ($request['id_produccion'] != "" || $request['id_produccion'] != 0) {
	
		try {

		    $mysqli->begin_transaction();

		    $sql = "DELETE FROM produccion WHERE id_produccion = '". $request['id_produccion'] . "' ";
            
            $hecho = Database::ejecutar_idu( $sql );
		
		
			if( is_numeric($hecho) OR $hecho === true ){
				$respuesta = array( 'err'=>false, 'Mensaje'=>'Produccion eliminada' );
			}else{
				$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
				$mysqli->rollback();
			}
            
            if ($request['id_gasto'] != "" || $request['id_gasto'] != 0) {

				 $sql = "DELETE FROM gastos WHERE id_gasto = '". $request['id_gasto'] . "' ";

				$hecho = Database::ejecutar_idu( $sql );

				if( is_numeric($hecho) OR $hecho === true ){
                    $respuesta = array( 'err'=>false, 'Mensaje'=>'Gasto eliminado' );
                }else{
                    $respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
                    $mysqli->rollback();
				}
            }
            else {
				$respuesta = array( 'err'=>true );
				$mysqli->rollback();
            }
            
            $mysqli->commit();
			
		} catch (Exception $e) {
			$respuesta = array( 'err'=>true );
			$mysqli->rollback();
		}
				
			
	}else {
		$respuesta = array( 'err'=>true );
	}


echo json_encode( $respuesta );

?>