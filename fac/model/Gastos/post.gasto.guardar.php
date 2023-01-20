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
			
    
        if($request['id_ctl_gasto'] == 11){
                        
            $sql = "INSERT INTO detalle_gasto(dt_precio, id_ctl_gasto, id_gasto, id_tipo_insumo,aplicacion)
					 			VALUES ('". $request['dt_precio'] . "','". $request['id_ctl_gasto'] . "','". $request['id_gasto'] . "','". $request['id_tipo_insumo'] . "',1)";
        }else{
            $sql = "INSERT INTO detalle_gasto(dt_precio, id_ctl_gasto, id_gasto)
					 			VALUES ('". $request['dt_precio'] . "','". $request['id_ctl_gasto'] . "','". $request['id_gasto'] . "')";
        }

        $hecho = Database::ejecutar_idu( $sql );
			
        if( is_numeric($hecho) OR $hecho === true ){
            $respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
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