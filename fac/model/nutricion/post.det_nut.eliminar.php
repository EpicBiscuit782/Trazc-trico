<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;


$id_user = $_SESSION['id_user'];
$id_det  = $request['id_det_nutricion'];
$cantidad = $request['cantidad'];
$id_insumo = $request['id_insumo'];
$medida = $request['medida'];



$db = DataBase::getInstancia();
$mysqli = $db->getConnection();


	if ($id_det  !="" || $id_det  != 0) {
	
		try {

		    $mysqli->begin_transaction();

		    $sql = "DELETE FROM detalle_nutricion WHERE id_det_nutricion = $id_det ";
            
            $hecho = Database::ejecutar_idu( $sql );
		
		
			if( is_numeric($hecho) OR $hecho === true ){
				$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro eliminado' );
			}else{
				$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
				$mysqli->rollback();
			}

				$sql2 = "SELECT id_inventario FROM inventario where id_insumo = $id_insumo AND id_productor= $id_user";

				$id_inventario = Database::get_valor_query( $sql2, 'id_inventario' );
            
                if ($medida == "MILILITROS") {
				    $cantidad = $cantidad/1000;
				}
				else if ($medida == "GRAMOS") {
				    $cantidad = $cantidad/1000;
				}

            if ($id_inventario > 0) {

				$sql4 = "UPDATE inventario 
                SET cantidad    =  cantidad + $cantidad 
                WHERE id_inventario=" . $id_inventario;

				$hecho = Database::ejecutar_idu( $sql4 );
				if( is_numeric($hecho) OR $hecho === true ){
				    $respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
				}else{
				    $respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
				    $mysqli->rollback();
				}
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