<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;

$db = DataBase::getInstancia();
$mysqli = $db->getConnection();

try {
	$mysqli->begin_transaction();
			
        $sql = "DELETE FROM gastos WHERE id_gasto = '". $request[0] . "' ";

        $hecho = Database::ejecutar_idu( $sql );
			
        if( is_numeric($hecho) OR $hecho === true ){
            $respuesta = array( 'err'=>false, 'Mensaje'=>'Registros eliminado' );
        }else{
            $respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
            $mysqli->rollback();
        }	
    $mysqli->commit();
			
		
	} catch (Exception $e) {
	$mysqli->rollback();
}


echo json_encode( $respuesta );











?>